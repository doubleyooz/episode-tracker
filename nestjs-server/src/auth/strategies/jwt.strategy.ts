import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { TokenPayload } from '../auth.service';
import { UserService } from '../../models/users/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: any) => {
          return request?.cookies['jid'];
        },
      ]),
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(token: TokenPayload) {
    try {
      return await this.usersService.findOneById(token.userId);
    } catch (err) {
      console.log(err);
      throw new UnauthorizedException();
    }
  }
}
