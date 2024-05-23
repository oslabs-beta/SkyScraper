import express, { Request, Response } from 'express';
import { auth, requiresAuth } from 'express-openid-connect';
import loginController from '../controllers/authController';

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
  authRequired: process.env.AUTH0_REQUIRED === 'true',
  auth0Logout: process.env.AUTH0_LOGOUT === 'true',
  secret: process.env.AUTH0_SECRET,
  baseURL: process.env.AUTH0_BASE_URL,
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
};
//the auth router attaches /login /logout and /callback routes to the base URL
console.log('ts config:\n', config);
console.log(process.env);
router.use(auth(config));

router.get('/', loginController.isLoggedIn, (req: Request, res: Response) => {
  res.status(200).send(res.locals.instances);
});

router.get('/profile', requiresAuth(), (req: Request, res: Response) => {
  res.json(req.oidc.user);
});

export default router;
