import { Request } from 'express';
import * as jwt from 'express-jwt';
import * as jwksRsa from 'jwks-rsa';
import { User } from '../db/interfaces';

if (!process.env.AUTH0_DOMAIN || !process.env.AUTH0_AUDIENCE) {
  throw 'Make sure you have AUTH0_DOMAIN, and AUTH0_AUDIENCE in your .env file';
}

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
  }),
  audience: process.env.AUTH0_AUDIENCE,
  issuer: [`https://${process.env.AUTH0_DOMAIN}/`],
  algorithms: ['RS256'],
});

export interface AuthORequest extends Request {
  user: Auth0User;
}

interface Auth0User {
  sub: string;
}

export function userFromAuth0Request(req: AuthORequest): User {
  const auth0User = req.user;

  return {
    id: auth0User.sub,
  };
}

export default checkJwt;
