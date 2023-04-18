import { Controller, Get, Param } from '@nestjs/common';

const buildTime = new Date();

@Controller("/")
export class AppController {
  constructor() { }

  @Get('/whoami')
  whoAmI() {
    return "api";
  }

  @Get('/buildtime')
  buildTime() {
    return buildTime.toISOString();
  }

  @Get('/api/:path*')
  api(@Param('path') path: string) {
    return {
      api: true,
      path,
    };
  }
}
