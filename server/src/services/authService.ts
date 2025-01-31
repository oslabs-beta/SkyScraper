import {
  CognitoIdentityClient,
  GetIdCommand,
  GetCredentialsForIdentityCommand,
} from '@aws-sdk/client-cognito-identity';
import { CognitoJwtVerifier } from 'aws-jwt-verify';
import ErrorObject from '../utils/ErrorObject.js';

export const verifyJWTService = async (token: string | undefined): Promise<void> => {
  if (!token) {
    throw new ErrorObject('No token provided', 401, 'No token provided');
  }

  const verifier = CognitoJwtVerifier.create({
    userPoolId: process.env.USER_POOL_ID ?? '',
    tokenUse: 'access',
    clientId: process.env.CLIENT_ID ?? '',
  });

  await verifier.verify(token);
};

export const getIdentityIDService = async (idToken: string | undefined): Promise<string> => {
  if (!idToken) {
    throw new ErrorObject('No ID Token', 401, 'No ID Token');
  }

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

  if (!getIdResponse.IdentityId) {
    throw new ErrorObject('Failed to retrieve Identity ID', 500, 'Failed to retrieve Identity ID');
  }

  return getIdResponse.IdentityId;
};

interface TemporaryCredentials {
  accessKeyId?: string;
  secretAccessKey?: string;
  sessionToken?: string;
}

export const getTemporaryCredentialsService = async (
  IdentityId: string,
  idToken: string | undefined,
): Promise<TemporaryCredentials> => {
  if (!idToken) {
    throw new ErrorObject('No ID Token', 401, 'No ID Token');
  }

  const cognitoIdentityClient = new CognitoIdentityClient({ region: process.env.REGION ?? '' });

  const command = new GetCredentialsForIdentityCommand({
    IdentityId,
    Logins: {
      [`cognito-idp.${process.env.REGION ?? ''}.amazonaws.com/${process.env.USER_POOL_ID ?? ''}`]:
        idToken,
    },
  });

  const { Credentials } = await cognitoIdentityClient.send(command);

  if (!Credentials) {
    throw new ErrorObject(
      'No credentials returned from Cognito',
      500,
      'No credentials returned from Cognito',
    );
  }

  return {
    accessKeyId: Credentials.AccessKeyId,
    secretAccessKey: Credentials.SecretKey,
    sessionToken: Credentials.SessionToken,
  };
};
