import express from 'express';

import { routeAdapter } from './adapters/routeAdapter';
import { middlewareAdapter } from './adapters/middlewareAdapter';
import { ControllerFactory } from '../factories/ControllerFactory';
import { MiddlewareFactory } from '../factories/MiddlewareFactory';

const app = express();

app.use(express.json());

app.post('/sign-up', routeAdapter(ControllerFactory.makeSignUpController()));
app.post('/sign-in', routeAdapter(ControllerFactory.makeSignInController()));
app.post('/refresh-token', routeAdapter(ControllerFactory.makeRefreshTokenController()));

app.get(
  '/leads',
  middlewareAdapter(MiddlewareFactory.makeAuthenticationMiddleware()),
  middlewareAdapter(MiddlewareFactory.makeAuthorizationMiddleware(['leads:read'])),
  routeAdapter(ControllerFactory.makeListLeadsController())
);

app.post(
  '/leads',
  middlewareAdapter(MiddlewareFactory.makeAuthenticationMiddleware()),
  middlewareAdapter(MiddlewareFactory.makeAuthorizationMiddleware(['leads:write'])),
  (req, res) => {
    console.log(req.metadata?.account);

    res.json({ created: true });
  }
);

app.listen(3000, () => {
  console.log('Server started at http://localhost:3000');
});
