import { sign } from 'jsonwebtoken';
import { env } from '../config/env';

export function generateAccessToken(accountId: string, roleId: string) {
  const accessToken = sign(
    {
      sub: accountId,
      role: roleId,
    },
    env.jwtSecret,
    {
      expiresIn: '30s'
    }
  );

  return accessToken;
}
