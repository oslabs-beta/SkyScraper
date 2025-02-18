import { Request, Response, NextFunction } from 'express';
import {
  verifyJWTService,
  getIdentityIDService,
  getTemporaryCredentialsService,
} from '../services/auth.service.js';
import ErrorObject from '../utils/ErrorObject.js';

const authController = {
  verifyJWT: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      await verifyJWTService(token);
      next();
    } catch (err) {
      next(
        err instanceof Error
          ? new ErrorObject(
              `Error in verifyJWT middleware: ${err.message}`,
              500,
              'Error in verifyJWT middleware',
            )
          : new ErrorObject('the error', 500, 'the error'),
      );
    }
  },

  getIdentityID: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const authHeaders: string = req.headers.authorization ?? '';
      if (!authHeaders.startsWith('Bearer ')) {
        res.status(401).json('No Access Token');
        return;
      }

      const idToken = req.headers['id-token'] as string | undefined;
      const identityId = await getIdentityIDService(idToken);

      res.locals.IdentityId = identityId;
      next();
    } catch (err) {
      next(
        err instanceof Error
          ? new ErrorObject(
              `Error in getIdentityID middleware: ${err.message}`,
              500,
              'Error in getIdentityID middleware',
            )
          : new ErrorObject('the error', 500, 'the error'),
      );
    }
  },

  getTemporaryCredentials: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const identityId = res.locals.IdentityId as string;
      const idToken = req.headers['id-token'] as string | undefined;
      const credentials = await getTemporaryCredentialsService(identityId, idToken);

      res.locals.credentials = credentials;
      next();
    } catch (err) {
      next(
        err instanceof Error
          ? new ErrorObject(
              `Error in getTemporaryCredentials middleware: ${err.message}`,
              500,
              'Error in getTemporaryCredentials middleware',
            )
          : new ErrorObject('the error', 500, 'the error'),
      );
    }
  },
};

export default authController;
