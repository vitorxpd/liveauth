import { AuthenticationMiddleware } from '../application/middlewares/AuthenticationMiddleware';
import { AuthorizationMiddleware } from '../application/middlewares/AuthorizationMiddleware';
import { UseCaseFactory } from './UseCaseFactory';

export class MiddlewareFactory {
  static makeAuthenticationMiddleware() {
    return new AuthenticationMiddleware();
  }

  static makeAuthorizationMiddleware(allowedRoles: string[]) {
    return new AuthorizationMiddleware(
      allowedRoles,
      UseCaseFactory.makeGetRolePermissionsUseCase()
    );
  }
}
