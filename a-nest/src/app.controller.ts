import { Controller, Get ,Post} from '@nestjs/common';
import { AppService } from './app.service';
//req , res 에 대해알아요.
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(){
    return this.appService.getHello();
  }
}


