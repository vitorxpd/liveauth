import { AuthorizationMiddleware } from '../application/middlewares/AuthorizationMiddleware';
import {makeGetRolePermissionsUseCase } from './makeGetRolePermissionsUseCase';

export function makeAuthorizationMiddleware(allowedRoles: string[]) {
  return new AuthorizationMiddleware(
    allowedRoles,
    makeGetRolePermissionsUseCase()
  );
}
