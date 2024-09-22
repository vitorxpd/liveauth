
import { RefreshToken } from '@prisma/client';
import { prismaClient } from '../../lib/prismaClient';

interface IInput {
  accountId: string
}

interface IOutput {
  refreshToken: RefreshToken
}

export class CreateRefreshTokenUseCase {
  async execute({ accountId }: IInput): Promise<IOutput> {

    const expiresAt = new Date();
    const EXP_TIME_IN_DAYS = 10;
    expiresAt.setDate(expiresAt.getDate() + EXP_TIME_IN_DAYS);

    const refreshToken = await prismaClient.refreshToken.create({
      data: {
        accountId,
        expiresAt,
      }
    });

    return {
      refreshToken
    };
  }
}
