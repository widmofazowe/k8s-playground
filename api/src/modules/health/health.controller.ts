import { Controller, Get } from '@nestjs/common';
import { HealthCheckService, HttpHealthIndicator, HealthCheck, DiskHealthIndicator, MemoryHealthIndicator } from '@nestjs/terminus';

@Controller('/health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private disk: DiskHealthIndicator,
    private memory: MemoryHealthIndicator,
  ) {}

  @Get("/")
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.http.pingCheck('ping-google', 'https://www.google.com'),
      () => this.disk.checkStorage('storage', { path: '/', thresholdPercent: 0.5 }),
      () => this.memory.checkHeap('memory_heap', 512 * 1024 * 1024),
    ]);
  }
}