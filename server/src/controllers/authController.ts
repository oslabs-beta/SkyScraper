import type { authController, Jwks } from '../utils/types.js';
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
        const userPoolID = 'us-east-2_DqdXAFb5I';
        const tokenUse = 'access';
        const clientId = '3je02pgra9uoqpjb46ckvsba82';
        const verifier = CognitoJwtVerifier.create({
          userPoolId: userPoolID,
          tokenUse: tokenUse,
          clientId: clientId,
        });

        res.locals.test = 'verifyJWT';
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
          throw new ErrorObject('No token provided', 401, 'Unauthorized');
        }

        const decodedJwt = await verifier.verify(token);

        res.locals.test = decodedJwt;

        // const publicKey = await fetchPublicKey();
        // res.locals.test = publicKey;
        // res.locals.jwt = req.headers.authorization;
        // res.locals.test = res.locals.jwt;
        // res.locals.decodedJwt = jwt.verify(res.locals.jwt as string, publicKey, {
        // algorithms: ['RS256'],
        // });
        // res.locals.test = res.locals.jwt;
        // res.locals.test = res.locals.decodedJWT;
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
        const JTW = authHeaders.split('')[1];

        const cognitoIdentityClient = new CognitoIdentityClient({ region: process.env.REGION });
        const getIdResponse = await cognitoIdentityClient.send(
          new GetIdCommand({
            AccountId: process.env.ACCOUNT_ID,
            IdentityPoolId: process.env.IDENTITY_POOL_ID,
          }),
        );
        res.locals.identityID = getIdResponse.IdentityId;

        next();
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
    });
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

        // const identityID = res.locals.identityID;
        // const cognitoIdentityClient = new CognitoIdentityClient({region: process.env.REGION});
        // const input = {
        //   identityID: identityID,
        //   Logins: {
        //     // The key should match the provider name you used when setting up the identity pool
        //     // The value is the token you received during authentication
        //     [`cognito-idp.us-east-2.amazonaws.com/us-east-2_DqdXAFb5I`]: req.user.token,
        //   }
        // }
        //   const command = new GetCredentialsForIdentityCommand(input);
        //   const { Credentials } = await cognitoIdentityClient.send(command);
        //   res.locals.credentials = {
        //     accessKeyId: Credentials.AccessKeyId,
        //     secretAccessKey: Credentials.SecretAccessKey,
        //     sessionToken: Credentials.SessionToken,
        //   };
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
    }); // () ???
  },
};

async function fetchPublicKey(): Promise<string> {
  try {
    const response = await fetch(
      'https://cognito-idp.us-east-2.amazonaws.com/us-east-2_DqdXAFb5I/.well-known/jwks.json',
    );
    const jwks: Jwks = (await response.json()) as Jwks;
    return jwks.keys[0].n;
  } catch (err) {
    if (err instanceof Error) {
      throw new ErrorObject(
        `Error in try catch for fetchPublicKey middleware: ${err.message}`,
        500,
        'Error in try catch for fetchPublicKey middleware',
      );
    } else {
      throw new ErrorObject('the error', 500, 'the error');
    }
  }
}

export default authController;
