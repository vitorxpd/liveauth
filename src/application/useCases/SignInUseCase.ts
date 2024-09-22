import { compare } from 'bcryptjs';
import { prismaClient } from '../lib/prismaClient';
import { InvalidCredentials } from '../errors/InvalidCredentials';
import { CreateRefreshTokenUseCase } from './RefreshTokenUseCase';
import { generateAccessToken } from '../lib/utils';

interface IInput {
  email: string
  password: string
}

interface IOutput {
  accessToken: string
  refreshToken: string
}

export class SignInUseCase {
  constructor(private readonly createRefreshTokenUseCase: CreateRefreshTokenUseCase) {}

  async execute({ email, password }: IInput): Promise<IOutput> {
    const account = await prismaClient.account.findUnique({
      where: { email }
    });

    if (!account) {
      throw new InvalidCredentials();
    }

    const isPasswordValid = await compare(password, account.password);

    if (!isPasswordValid) {
      throw new InvalidCredentials();
    }

    const accessToken = generateAccessToken(account.id, account.roleId);

    const { refreshToken } = await this.createRefreshTokenUseCase.execute({ accountId: account.id });

    return {
      accessToken,
      refreshToken: refreshToken.id
    };
  }
}
