import { SignUpController } from '../application/controllers/SignUpController';
import { SignInController } from '../application/controllers/SignInController';
import { ListLeadsController } from '../application/controllers/ListLeadsController';
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
}
