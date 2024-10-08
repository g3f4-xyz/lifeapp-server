import { Request } from 'express';
import * as jwt from 'express-jwt';
import * as jwksRsa from 'jwks-rsa';

if (!process.env.AUTH0_DOMAIN || !process.env.AUTH0_API_IDENTIFIER) {
  throw 'Make sure you have AUTH0_DOMAIN, and AUTH0_API_IDENTIFIER in your .env file';
}

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
  }),
  audience: process.env.AUTH0_API_IDENTIFIER,
  issuer: [`https://${process.env.AUTH0_DOMAIN}/`],
  algorithms: ['RS256'],
});

export interface AuthORequest extends Request {
  user: Auth0User;
}

interface Auth0User {
  sub: string;
}

export default checkJwt;
