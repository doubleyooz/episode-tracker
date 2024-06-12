import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';

import { Response } from 'express';
import { AuthService } from './auth.service';
import JwtAuthGuard from './guards/jwt-auth.guard';
import LocalAuthGuard from './guards/local-auth.guard';
import { User } from 'src/models/users/user.interface';
import { CurrentUser } from 'src/common/decorators/currentUser.decorator';
import { RecoverPasswordRequest } from './dto/recover-password.dto';
import { ChangePasswordRequest } from './dto/change-password.dto';
import { ActivateAccountRequest } from './dto/activate-account.dto';

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

  @Post('recover-password')
  async recoverPassword(@Body() request: RecoverPasswordRequest) {
    return await this.authService.recoverPassword(request);
  }

  @Post('change-password')
  async changePassword(@Body() request: ChangePasswordRequest) {
    return await this.authService.changePassword(request);
  }

  @Post('activation-code')
  async generateActivationCode(@Body() request: RecoverPasswordRequest) {
    return await this.authService.activationCode(request);
  }

  @Post('activate-account')
  async activateAccount(@Body() request: ActivateAccountRequest) {
    return await this.authService.activateAccount(request);
  }
}
