import { GetRolePermissionsUseCase } from '../application/useCases/GetRolePermissionsUseCase';
import { SignInUseCase } from '../application/useCases/SignInUseCase';
import { SignUpUseCase } from '../application/useCases/SignUpUseCase';

export class UseCaseFactory {
  static makeSignUpUseCase() {
    const SALT = 10;

    return new SignUpUseCase(SALT);
  }

  static makeSignInUseCase() {
    return new SignInUseCase();
  }

  static makeGetRolePermissionsUseCase() {
    return new GetRolePermissionsUseCase();
  }
}
