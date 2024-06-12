import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseInterceptors(ResponseInterceptor)
  getHello(): { message: string } {
    return {
      message: this.appService.getHello(),
    };
  }
}
