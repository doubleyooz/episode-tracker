import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';

import { Response } from 'express';
import { AuthService } from './auth.service';
import JwtAuthGuard from './guards/jwt-auth.guard';
import LocalAuthGuard from './guards/local-auth.guard';
import { User } from 'src/models/users/user.interface';
import { CurrentUser } from 'src/common/decorators/currentUser.decorator';
import { RecoveryCodeRequest } from './dto/recovery-code.dto';
import { ChangePasswordRequest } from './dto/change-password.dto';
import { ActivateAccountRequest } from './dto/activate-account.dto';
import { ChangeEmailRequest } from './dto/change-email.dto';

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

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async validateUser(@CurrentUser() user: User) {
    return user;
  }

  @Post('recover-password')
  async recoverPassword(@Body() request: RecoveryCodeRequest) {
    return await this.authService.recoverPassword(request);
  }

  @Post('recover-email')
  async recoverEmail(@Body() request: RecoveryCodeRequest) {
    return await this.authService.recoverPassword(request);
  }

  @Post('activation-code')
  async generateActivationCode(@Body() request: RecoveryCodeRequest) {
    return await this.authService.activationCode(request);
  }

  @Post('change-password')
  async changePassword(@Body() request: ChangePasswordRequest) {
    return await this.authService.changePassword(request);
  }

  @Post('change-email')
  async changeEmail(@Body() request: ChangeEmailRequest) {
    return await this.authService.changeEmail(request);
  }

  @Post('validate-code')
  async validateCode(@Body() request: ActivateAccountRequest) {
    return await this.authService.verifyRecoveryCode(request);
  }

  @Post('activate-account')
  async activateAccount(@Body() request: ActivateAccountRequest) {
    return await this.authService.activateAccount(request);
  }
}
