import { Controller, Post, Res, UseGuards } from '@nestjs/common';

import { Response } from 'express';
import { AuthService } from './auth.service';
import JwtAuthGuard from './guards/jwt-auth.guard';
import LocalAuthGuard from './guards/local-auth.guard';
import { User } from 'src/models/users/user.interface';
import { CurrentUser } from 'src/common/decorators/currentUser.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) res: Response,
  ) {
    console.log('user', user);
    await this.authService.login(user, res);
    res.send(user);
  }

  @Post('me')
  @UseGuards(JwtAuthGuard)
  async validateUser(@CurrentUser() user: User) {
    return user;
  }
}
