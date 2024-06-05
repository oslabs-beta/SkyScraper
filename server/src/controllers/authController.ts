import type { authController } from '../utils/types.js';
import ErrorObject from '../utils/ErrorObject.js';
import { CognitoJwtVerifier } from 'aws-jwt-verify';
import {
  CognitoIdentityClient,
  GetIdCommand,
  GetCredentialsForIdentityCommand,
} from '@aws-sdk/client-cognito-identity';

const authController: authController = {
  verifyJWT: (req, res, next) => {
    void (async () => {
      try {
        console.log(req.headers);
        const userPoolID = 'us-east-2_DqdXAFb5I';
        const tokenUse = 'access';
        const clientId = '3je02pgra9uoqpjb46ckvsba82';
        const verifier = CognitoJwtVerifier.create({
          userPoolId: userPoolID,
          tokenUse: tokenUse,
          clientId: clientId,
        });

        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
          throw new ErrorObject('No token provided', 401, 'No token provided');
        }

        const payload = await verifier.verify(token);

        req.user = payload;

        next();
        return;
      } catch (err) {
        if (err instanceof Error) {
          next(
            new ErrorObject(
              `Error in try catch for verifyJWT middleware: ${err.message}`,
              500,
              'Error in try catch for verifyJWT middleware',
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

        const cognitoIdentityClient = new CognitoIdentityClient({ region: process.env.REGION });
        const getIdResponse = await cognitoIdentityClient.send(
          new GetIdCommand({
            IdentityPoolId: 'us-east-2:87178101-c07a-4702-bf51-586d0904963e',
            Logins: {
              'cognito-idp.us-east-2.amazonaws.com/us-east-2_DqdXAFb5I': idToken,
            },
          }),
        );
        res.locals.IdentityId = getIdResponse.IdentityId;

        next();
        return;
      } catch (err) {
        if (err instanceof Error) {
          throw new ErrorObject(
            `Error in try catch for getIdentityID middleware: ${err.message}`,
            500,
            'Error in try catch for getIdentityID middleware',
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
        const identityPoolID = res.locals.IdentityId as string;
        const idToken = req.headers['id-token'] as string | undefined;
        if (!idToken) return res.status(401).json('No ID Token');

        const cognitoIdentityClient = new CognitoIdentityClient({ region: process.env.REGION });
        const input = {
          IdentityId: identityPoolID,
          Logins: {
            // The key should match the provider name you used when setting up the identity pool
            // The value is the id token you received during authentication (NOT the access token)
            [`cognito-idp.us-east-2.amazonaws.com/us-east-2_DqdXAFb5I`]: idToken,
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
            `Error in try catch for getTemporaryCredentials middleware: ${err.message}`,
            500,
            'Error in try catch for getTemporaryCredentials middleware',
          );
        } else {
          throw new ErrorObject('the error', 500, 'the error');
        }
      }
    })();
  },
};

export default authController;
