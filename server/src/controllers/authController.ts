import {
  CognitoIdentityClient,
  GetIdCommand,
  GetCredentialsForIdentityCommand,
} from '@aws-sdk/client-cognito-identity';
import type { authController } from '../utils/types.js';
import { CognitoJwtVerifier } from 'aws-jwt-verify';
import ErrorObject from '../utils/ErrorObject.js';

const authController: authController = {
  verifyJWT: (req, res, next) => {
    void (async () => {
      try {
        const tokenUse = 'access';

        const verifier = CognitoJwtVerifier.create({
          userPoolId: process.env.USER_POOL_ID ?? '',
          tokenUse: tokenUse,
          clientId: process.env.CLIENT_ID ?? '',
        });

        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
          throw new ErrorObject('No token provided', 401, 'No token provided');
        }

        await verifier.verify(token);

        next();
        return;
      } catch (err) {
        if (err instanceof Error) {
          next(
            new ErrorObject(
              `Error in verifyJWT middleware: ${err.message}`,
              500,
              'Error in verifyJWT middleware',
            ),
          );
        } else {
          next(new ErrorObject('the error', 500, 'the error'));
        }
      }
    })();
  },

  getIdentityID: (req, res, next) => {
    void (async () => {
      try {
        const authHeaders: string = req.headers.authorization ?? '';
        if (!authHeaders.startsWith('Bearer ')) return res.status(401).json('No Access Token');

        const idToken = req.headers['id-token'] as string | undefined;
        if (!idToken) return res.status(401).json('No ID Token');

        const cognitoIdentityClient = new CognitoIdentityClient({
          region: process.env.REGION ?? '',
        });

        const getIdResponse = await cognitoIdentityClient.send(
          new GetIdCommand({
            IdentityPoolId: process.env.IDENTITY_POOL_ID ?? '',
            Logins: {
              [`cognito-idp.${process.env.REGION ?? ''}.amazonaws.com/${process.env.USER_POOL_ID ?? ''}`]:
                idToken,
            },
          }),
        );

        res.locals.IdentityId = getIdResponse.IdentityId;

        next();
        return;
      } catch (err) {
        if (err instanceof Error) {
          throw new ErrorObject(
            `Error in getIdentityID middleware: ${err.message}`,
            500,
            'Error in getIdentityID middleware',
          );
        } else {
          throw new ErrorObject('the error', 500, 'the error');
        }
      }
    })();
  },

  getTemporaryCredentials: (req, res, next) => {
    void (async () => {
      try {
        const IdentityId = res.locals.IdentityId as string;
        const idToken = req.headers['id-token'] as string | undefined;

        if (!idToken) return res.status(401).json('No ID Token');

        const cognitoIdentityClient = new CognitoIdentityClient({ region: process.env.REGION });
        const input = {
          IdentityId: IdentityId,
          Logins: {
            // The key should match the provider name you used when setting up the identity pool
            // The value is the id token you received during authentication (NOT the access token)
            [`cognito-idp.${process.env.REGION ?? ''}.amazonaws.com/${process.env.USER_POOL_ID ?? ''}`]:
              idToken,
          },
        };

        const command = new GetCredentialsForIdentityCommand(input);
        const { Credentials } = await cognitoIdentityClient.send(command);

        if (!Credentials) {
          throw new Error('No credentials returned from Cognito');
        }

        res.locals.credentials = {
          accessKeyId: Credentials?.AccessKeyId,
          secretAccessKey: Credentials?.SecretKey,
          sessionToken: Credentials?.SessionToken,
        };

        next();
        return;
      } catch (err) {
        if (err instanceof Error) {
          throw new ErrorObject(
            `Error in getTemporaryCredentials middleware: ${err.message}`,
            500,
            'Error in getTemporaryCredentials middleware',
          );
        } else {
          throw new ErrorObject('the error', 500, 'the error');
        }
      }
    })();
  },
};

export default authController;
