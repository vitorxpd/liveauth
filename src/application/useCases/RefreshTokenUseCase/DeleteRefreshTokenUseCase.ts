import { prismaClient } from '../../lib/prismaClient';

interface IInput {
  refreshToken: string
}

export class DeleteRefreshTokenUseCase {
  async execute({ refreshToken }: IInput) {

    await prismaClient.refreshToken.delete({
      where: { id: refreshToken },
    });
  }
}
