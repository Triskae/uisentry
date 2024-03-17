import { Module } from '@nestjs/common';
import { UnifiService } from './services/unifi.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [HttpModule],
  providers: [UnifiService, ConfigService],
  exports: [UnifiService],
})
export class UnifiModule {}
