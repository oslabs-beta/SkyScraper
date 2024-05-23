import { Request, Response, NextFunction } from 'express';
import ErrorObject from '../utils/ErrorObject.js';
import { requiresAuth } from 'express-openid-connect';

interface loginController {
  isLoggedIn: (req: Request, res: Response, next: NextFunction) => void;
}

const loginController: loginController = {
  isLoggedIn: async (req, res, next) => {
    res.locals.loggedIn = req.oidc.isAuthenticated();
    if (res.locals.loggedIn !== true && res.locals.loggedIn !== false)
      return next(
        new ErrorObject(
          'Error in loginController.isAuthenticated, isAuthenticated did not evaluate to true or false',
          500,
          'Error logging in, please see server Logs',
        ),
      );
    return next();
  },
};

export default loginController;
