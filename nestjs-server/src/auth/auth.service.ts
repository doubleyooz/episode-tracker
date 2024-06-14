import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { User } from 'src/models/users/user.interface';
import { RecoveryCodeRequest } from './dto/recovery-code.dto';
import { UserService } from 'src/models/users/user.service';
import { SendGridClient } from 'src/common/email/sendgrid-client';
import { MailDataRequired } from '@sendgrid/mail';
import { ChangePasswordRequest } from './dto/change-password.dto';
import { ActivateAccountRequest } from './dto/activate-account.dto';
import { ChangeEmailRequest } from './dto/change-email.dto';

export interface TokenPayload {
  userId: number;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly sendGridClient: SendGridClient,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: User, res: Response) {
    const tokenPayload: TokenPayload = {
      userId: user.id,
    };

    const expires = new Date();

    expires.setSeconds(
      expires.getSeconds() + this.configService.get('JWT_EXPIRATION'),
    );

    const token = this.jwtService.sign(tokenPayload);

    res.cookie('jid', token, {
      httpOnly: true,
      expires,
    });
  }

  async recoverPassword(request: RecoveryCodeRequest) {
    await this.userService.generateRecoveryCode(request.email);

    if (request.skipEmail) return { message: 'Recovery code sent' };
    const mail: MailDataRequired = {
      to: request.email,
      from: this.configService.get<string>('SMTP_SENDER'), // verified sender email
      subject: 'Test email',
      content: [{ type: 'text/plain', value: 'Test body' }],
    };
    return {
      result: await this.sendGridClient.send(mail),
      message: 'Recovery code sent',
    };
  }

  async activationCode(request: RecoveryCodeRequest) {
    await this.userService.generateRecoveryCode(request.email);

    if (request.skipEmail) return { message: 'Activation code sent' };
    const mail: MailDataRequired = {
      to: request.email,
      from: this.configService.get<string>('SMTP_SENDER'), // verified sender email
      subject: 'Test email',
      content: [{ type: 'text/plain', value: 'Test body' }],
    };
    return {
      result: await this.sendGridClient.send(mail),
      message: 'Activation code sent',
    };
  }

  async changePassword(request: ChangePasswordRequest) {
    // if it doesn't find it throws an exception
    await this.userService.verifyRecoveryCode(request.email, request.code);

    const { result } = await this.userService.updatePassword(
      request.email,
      request.password,
    );

    return { result, message: 'Password updated' };
  }

  async changeEmail(request: ChangeEmailRequest) {
    // if it doesn't find it throws an exception
    await this.userService.verifyRecoveryCode(request.email, request.code);

    const { result } = await this.userService.updateEmail(
      request.email,
      request.newEmail,
    );

    return { result, message: 'Email updated' };
  }

  async verifyRecoveryCode(request: ActivateAccountRequest) {
    return await this.userService.verifyRecoveryCode(
      request.email,
      request.code,
    );
  }

  async activateAccount(request: ActivateAccountRequest) {
    // if it doesn't find it throws an exception
    await this.userService.verifyRecoveryCode(request.email, request.code);

    const { result } = await this.userService.activateAccount(request.email);

    return { result, message: 'Account activated.' };
  }

  logout(res: Response) {
    res.cookie('jid', '', {
      httpOnly: true,
      expires: new Date(),
    });
  }
}
