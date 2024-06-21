import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';

import { FastifyReply } from 'fastify';
import { AuthService } from './auth.service';
import JwtAuthGuard from './guards/jwt-auth.guard';
import LocalAuthGuard from './guards/local-auth.guard';
import { User } from 'src/models/users/user.interface';
import { CurrentUser } from 'src/common/decorators/currentUser.decorator';
import { RecoveryCodeRequest } from './dto/recovery-code.dto';
import { ChangePasswordRequest } from './dto/change-password.dto';
import { ActivateAccountRequest } from './dto/activate-account.dto';
import { ChangeEmailRequest } from './dto/change-email.dto';
import {
  ApiConsumes,
  ApiOkResponse,
  ApiOperation,
  ApiProduces,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({
    summary: 'Log in the user, returns an auth cookie',
    description:
      'user login returns an access token with some user information',
  })
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  async login(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) res: FastifyReply,
  ) {
    const { token, expires } = await this.authService.login(user);

    res.setCookie('jid', token, {
      httpOnly: true,
      sameSite: 'none',
      path: '/',
      expires,
    });
    res.send(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @ApiOperation({
    summary: 'Log out the current user',
    description:
      'Receives the auth cookie with the token it, all tokens for this user will be blacklisted',
  })
  @ApiOkResponse({ description: 'User found and returned.' })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  async logout(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) res: FastifyReply,
  ) {
    await this.authService.logout(user);
    res.setCookie('jid', '', {
      httpOnly: true,
      expires: new Date(),
      path: '/',
      sameSite: 'none',
    });
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Get the current user',
    description:
      'Receives the auth cookie and returns information related to the user',
  })
  @ApiOkResponse({ description: 'User found and returned.' })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  @ApiProduces('application/json')
  async validateUser(@CurrentUser() user: User) {
    return user;
  }

  @Post('recover-password')
  @ApiOperation({
    summary: 'Recover password',
    description:
      'Receives an email, if it belongs to a user a verification code will be generated and waiting to be consumed, it may send an email containing the code',
  })
  async recoverPassword(@Body() request: RecoveryCodeRequest) {
    return await this.authService.recoverPassword(request);
  }

  @Post('recover-email')
  @ApiOperation({
    summary: 'Recover email',
    description:
      'Receives an email, if it belongs to a user a verification code will be generated and waiting to be consumed,  it may send an email containing the code',
  })
  async recoverEmail(@Body() request: RecoveryCodeRequest) {
    return await this.authService.recoverPassword(request);
  }

  @Post('activation-code')
  @ApiOperation({
    summary: 'Recover activation code',
    description:
      'Receives an email, if it belongs to a user a verification code will be generated and waiting to be consumed, it may send an email containing the code',
  })
  async generateActivationCode(@Body() request: RecoveryCodeRequest) {
    return await this.authService.activationCode(request);
  }

  @Post('change-password')
  @ApiOperation({
    summary: 'Change password',
    description:
      'Receives an email, a code and a new password. if it the email and verification belongs to the user, the password will be changed',
  })
  async changePassword(@Body() request: ChangePasswordRequest) {
    return await this.authService.changePassword(request);
  }

  @Post('change-email')
  @ApiOperation({
    summary: 'Change email',
    description:
      'Receives an email, a code and a new email. if it the email and verification belongs to the user, the email will be changed',
  })
  async changeEmail(@Body() request: ChangeEmailRequest) {
    return await this.authService.changeEmail(request);
  }

  @Post('validate-code')
  @ApiOperation({
    summary: 'Validate code',
    description: 'Verify the validation code, if it fails it returns 401 ',
  })
  async validateCode(@Body() request: ActivateAccountRequest) {
    return await this.authService.verifyRecoveryCode(request);
  }

  @Post('activate-account')
  @ApiOperation({
    summary: 'Activate account',
    description:
      'Receives an email and a code. if it the email and verification belongs to the user, the user account will be activated',
  })
  async activateAccount(@Body() request: ActivateAccountRequest) {
    return await this.authService.activateAccount(request);
  }
}
