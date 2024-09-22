import { GetAccountUseCase } from '../application/useCases/GetAccountUseCase';
import { GetRolePermissionsUseCase } from '../application/useCases/GetRolePermissionsUseCase';
import { CreateRefreshTokenUseCase, GetRefreshTokenUseCase, DeleteRefreshTokenUseCase } from '../application/useCases/RefreshTokenUseCase';
import { SignInUseCase } from '../application/useCases/SignInUseCase';
import { SignUpUseCase } from '../application/useCases/SignUpUseCase';

export class UseCaseFactory {
  static makeCreateRefreshTokenUseCase() {
    return new CreateRefreshTokenUseCase();
  }

  static makeGetRefreshTokenUseCase() {
    return new GetRefreshTokenUseCase();
  }

  static makeDeleteRefreshTokenUseCase() {
    return new DeleteRefreshTokenUseCase();
  }

  static makeGetAccountUseCase() {
    return new GetAccountUseCase();
  }

  static makeSignUpUseCase() {
    const SALT = 10;

    return new SignUpUseCase(SALT);
  }

  static makeSignInUseCase() {
    return new SignInUseCase(this.makeCreateRefreshTokenUseCase());
  }

  static makeGetRolePermissionsUseCase() {
    return new GetRolePermissionsUseCase();
  }
}
