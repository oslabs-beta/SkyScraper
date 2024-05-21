import express, { Request, Response } from 'express';
import { auth } from 'express-openid-connect';
import loginController from '../controllers/loginController.js';

const router = express.Router();

interface config {
  authRequired: boolean;
  auth0Logout: boolean;
  baseURL: string | undefined;
  clientID: string | undefined;
  issuerBaseURL: string | undefined;
  secret: string | undefined;
}

const config: config = {
  authRequired: process.env.AUTH_REQUIRED === 'true',
  auth0Logout: process.env.AUTH0_LOGOUT === 'true',
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
  secret: process.env.AUTH0_SECRET,
};
//the auth router attaches /login /logout and /callback routes to the base URL
router.use(auth(config));

router.get('/JWT', loginController.isLoggedIn, (req: Request, res: Response) => {
  res.status(200).send(res.locals.instances);
});

export default router;
