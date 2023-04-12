import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() { }

  @Get('/whoami')
  whoAmI(): string {
    return "I'm den";
  }
}
