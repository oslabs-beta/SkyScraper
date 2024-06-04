import type { authController, Jwks } from '../utils/types.js';
import ErrorObject from '../utils/ErrorObject.js';
import { CognitoJwtVerifier } from 'aws-jwt-verify';
import { fromWebToken } from '@aws-sdk/credential-provider-web-identity';
import {
  CognitoIdentityClient,
  GetIdCommand,
  GetCredentialsForIdentityCommand,
} from '@aws-sdk/client-cognito-identity';

const authController: authController = {
  verifyJWT: (req, res, next) => {
    void (async () => {
      try {
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
          throw new ErrorObject('No token provided', 401, 'Unauthorized');
        }

        const decodedJwt = await verifier.verify(token);
        res.locals.unsplitJwt = req.headers.authorization;
        res.locals.jwt = token;
        res.locals.decodedJwt = decodedJwt;
        // {
        //     "sub": "110b75a0-4051-7063-1cdf-d2908161d374",
        //     "cognito:groups": [
        //         "us-east-2_DqdXAFb5I_Auth0IdP"
        //     ],
        //     "iss": "https://cognito-idp.us-east-2.amazonaws.com/us-east-2_DqdXAFb5I",
        //     "version": 2,
        //     "client_id": "3je02pgra9uoqpjb46ckvsba82",
        //     "token_use": "access",
        //     "scope": "phone openid email",
        //     "auth_time": 1717522930,
        //     "exp": 1717526530,
        //     "iat": 1717522930,
        //     "jti": "9865da77-2020-4511-9ea2-d603dbf71f36",
        //     "username": "auth0idp_github|70916466"
        // }

        //   {
        //     "sub": "110b75a0-4051-7063-1cdf-d2908161d374",
        //     "cognito:groups": [
        //         "us-east-2_DqdXAFb5I_Auth0IdP"
        //     ],
        //     "iss": "https://cognito-idp.us-east-2.amazonaws.com/us-east-2_DqdXAFb5I",
        //     "version": 2,
        //     "client_id": "3je02pgra9uoqpjb46ckvsba82",
        //     "token_use": "access",
        //     "scope": "phone openid email",
        //     "auth_time": 1717536861,
        //     "exp": 1717540461,
        //     "iat": 1717536861,
        //     "jti": "d14d342b-f350-4e74-a6ad-2d6fa28aec88",
        //     "username": "auth0idp_github|70916466"
        // }
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
        if (!authHeaders.startsWith('Bearer ')) return res.status(401).json('Unauthorized');

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
        // res.locals.IdentityId = getIdResponse;

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
        // const stsClient = new STSClient({ region: 'us-east-2' });
        // const roleArn = 'arn:aws:iam::654654488672:role/SkyScraperSAMLv1';
        // const command = new AssumeRoleCommand({
        //   RoleArn: roleArn,
        //   RoleSessionName: 'SkyScraperSAMLv1 session',
        // });
        // const { Credentials } = await stsClient.send(command);

        // res.locals.credentials = {
        //   accessKeyID: Credentials?.AccessKeyId,
        //   secretAccessKey: Credentials?.SecretAccessKey,
        //   sessionToken: Credentials?.SessionToken,
        // };

        // next();

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
        res.locals.credentials = {
          accessKeyId: Credentials?.AccessKeyId,
          secretAccessKey: Credentials?.SecretKey,
          sessionToken: Credentials?.SessionToken,
        };
        next();
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
