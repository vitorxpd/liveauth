import { AccountNotFound } from '../errors/AccountNotFound';
import { prismaClient } from '../lib/prismaClient';
import { Account } from '@prisma/client';

interface IInput {
  accountId: string
}

interface IOutput {
  account: Account
}

export class GetAccountUseCase {
  async execute({ accountId }: IInput): Promise<IOutput> {
    const account = await prismaClient.account.findUnique({
      where: { id: accountId }
    });

    if (!account) {
      throw new AccountNotFound();
    }

    return {
      account,
    };
  }
}
