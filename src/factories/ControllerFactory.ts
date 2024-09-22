import { SignUpController } from '../application/controllers/SignUpController';
import { SignInController } from '../application/controllers/SignInController';
import { ListLeadsController } from '../application/controllers/ListLeadsController';
import { RefreshTokenController } from '../application/controllers/RefreshTokenController';
import { UseCaseFactory } from './UseCaseFactory';

export class ControllerFactory {
  static  makeSignUpController() {
    const signUpUseCase = UseCaseFactory.makeSignUpUseCase();

    return new SignUpController(signUpUseCase);
  }

  static makeSignInController() {
    const signInUseCase = UseCaseFactory.makeSignInUseCase();

    return new SignInController(signInUseCase);
  }

  static makeListLeadsController() {
    return new ListLeadsController();
  }

  static makeRefreshTokenController() {
    const createRefreshTokenUseCase = UseCaseFactory.makeCreateRefreshTokenUseCase();
    const getRefreshTokenUseCase = UseCaseFactory.makeGetRefreshTokenUseCase();
    const deleteRefreshTokenUseCase = UseCaseFactory.makeDeleteRefreshTokenUseCase();
    const getAccountUseCase = UseCaseFactory.makeGetAccountUseCase();

    return new RefreshTokenController(
      createRefreshTokenUseCase,
      getRefreshTokenUseCase,
      deleteRefreshTokenUseCase,
      getAccountUseCase,
    );
  }
}
