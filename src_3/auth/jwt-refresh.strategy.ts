import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/users/users.service';
import { Request } from 'express';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    // private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.refresh_token;
        },
      ]),
    //   secretOrKey: configService.get('JWT_ACCESS_TOKEN_SECRET'),
      secretOrKey: '2582',
      passReqToCallback: true
    });
  }

  async validate(req, payload: any) {
    const refreshToken = req.cookies?.refresh_token;
    return await this.usersService.getUserIfRefreshTokenMatches(
        refreshToken,
        payload.id,
    );
  }
}