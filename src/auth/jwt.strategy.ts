import { PassportStrategy } from '@nestjs/passport';
import { passportJwtSecret } from 'jwks-rsa';
import { ExtractJwt, Strategy } from 'passport-jwt';
import {
  AWS_COGNITO_AUTHORITY,
  USER_POOL_WEB_CLIENT_ID,
} from 'src/common/constants';

console.log('AWS_COGNITO_AUTHORITY: ', AWS_COGNITO_AUTHORITY);

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${AWS_COGNITO_AUTHORITY}/.well-known/jwks.json`,
      }),

      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: USER_POOL_WEB_CLIENT_ID,
      issuer: AWS_COGNITO_AUTHORITY,
      algorithms: ['RS256'],
    });
  }

  public async validate(payload: any) {
    return !!payload.sub;
  }
}
