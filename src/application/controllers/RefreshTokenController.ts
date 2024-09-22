import { z, ZodError } from 'zod';
import { IController, IResponse } from '../interfaces/IController';
import { IRequest } from '../interfaces/IRequest';
import { CreateRefreshTokenUseCase, GetRefreshTokenUseCase, DeleteRefreshTokenUseCase } from '../useCases/RefreshTokenUseCase';
import { GetAccountUseCase } from '../useCases/GetAccountUseCase';
import { AccountNotFound } from '../errors/AccountNotFound';
import { InvalidRefreshToken } from '../errors/InvalidRefreshToken';
import { generateAccessToken } from '../lib/utils';

const schema = z.object({
  refreshToken: z.string().uuid(),
});

export class RefreshTokenController implements IController {
  constructor(
    private readonly createRefreshTokenUseCase: CreateRefreshTokenUseCase,
    private readonly getRefreshTokenUseCase: GetRefreshTokenUseCase,
    private readonly deleteRefreshTokenUseCase: DeleteRefreshTokenUseCase,
    private readonly getAccountUseCase: GetAccountUseCase,
  ) {}

  async handle({ body }: IRequest): Promise<IResponse> {
    try {
      const { refreshToken: refreshTokenId } = schema.parse(body);

      const { refreshToken } = await this.getRefreshTokenUseCase.execute({
        refreshToken: refreshTokenId
      });

      if (!refreshToken) {
        throw new InvalidRefreshToken();
      }

      if (Date.now() > refreshToken.expiresAt.getTime()) {
        await this.deleteRefreshTokenUseCase.execute({ refreshToken: refreshToken.id });

        return {
          statusCode: 401,
          body: {
            error: 'Expired refresh token.'
          }
        };
      }

      const [{ account }, { refreshToken: newRefreshToken }] = await Promise.all([
        this.getAccountUseCase.execute({ accountId: refreshToken.accountId }),
        this.createRefreshTokenUseCase.execute({
          accountId: refreshToken.accountId,
        }),
        this.deleteRefreshTokenUseCase.execute({ refreshToken: refreshToken.id }),
      ]);

      const accessToken = generateAccessToken(account.id, account.roleId);

      return {
        statusCode: 200,
        body: {
          accessToken,
          refreshToken: newRefreshToken.id,
        }
      };
    } catch (error) {
      if (error instanceof ZodError) {
        return {
          statusCode: 400,
          body: error.issues,
        };
      }

      if (error instanceof InvalidRefreshToken) {
        return {
          statusCode: 401,
          body: {
            error: 'Invalid refresh token.',
          }
        };
      }

      if (error instanceof AccountNotFound) {
        return {
          statusCode: 401,
          body: {
            error: 'Account not found.',
          }
        };
      }

      throw error;
    }
  }
}
