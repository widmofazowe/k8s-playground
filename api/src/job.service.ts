import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class JobService {
  private readonly logger = new Logger(JobService.name);

  @Cron('*/5 * * * * *')
  handleCron() {
    this.logger.debug('Called every 5s');
  }
}
