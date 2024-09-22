import { RefreshToken } from '@prisma/client';
import { prismaClient } from '../../lib/prismaClient';
import { InvalidRefreshToken } from '../../errors/InvalidRefreshToken';

interface IInput {
  refreshToken: string
}

interface IOutput {
  refreshToken: RefreshToken

}

export class GetRefreshTokenUseCase {
  async execute({ refreshToken: refreshTokenId }: IInput): Promise<IOutput> {
    const refreshToken = await prismaClient.refreshToken.findUnique({
      where: { id: refreshTokenId }
    });

    if (!refreshToken) {
      throw new InvalidRefreshToken();
    }

    return {
      refreshToken
    };
  }
}
