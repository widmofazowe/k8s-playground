import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JobService } from './job.service';
import { ScheduleModule } from '@nestjs/schedule';
import { HealthModule } from './modules/health/health.module';

@Module({
  imports: [ScheduleModule.forRoot(), HealthModule],
  controllers: [AppController],
  providers: [AppService, JobService],
})
export class AppModule { }
