import express from 'express';

import { makeSignUpController } from '../factories/makeSignUpController';
import { makeSignInController } from '../factories/makeSignInController';
import { makeListLeadsController } from '../factories/makeListLeadsController';
import { makeAuthenticationMiddleware } from '../factories/makeAuthenticationMiddleware';
import { makeAuthorizationMiddleware } from '../factories/makeAuthorizationMiddleware';
import { routeAdapter } from './adapters/routeAdapter';
import { middlewareAdapter } from './adapters/middlewareAdapter';

const app = express();

app.use(express.json());

app.post('/sign-up', routeAdapter(makeSignUpController()));
app.post('/sign-in', routeAdapter(makeSignInController()));

app.get(
  '/leads',
  middlewareAdapter(makeAuthenticationMiddleware()),
  middlewareAdapter(makeAuthorizationMiddleware(['leads:read'])),
  routeAdapter(makeListLeadsController())
);

app.post(
  '/leads',
  middlewareAdapter(makeAuthenticationMiddleware()),
  middlewareAdapter(makeAuthorizationMiddleware(['leads:write'])),
  (req, res) => {
    console.log(req.metadata?.account);

    res.json({ created: true });
  }
);

app.listen(3000, () => {
  console.log('Server started at http://localhost:3000');
});
