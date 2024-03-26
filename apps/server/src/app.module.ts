import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
import { UnifiModule } from './unifi/unifi.module';
import { CoreModule } from './core/core.module';
import { NotificationModule } from './notification/notification.module';
import { DataConnectorModule } from './data-connector/data-connector.module';

@Module({
  imports: [CoreModule, ScheduleModule.forRoot(), DataConnectorModule, UnifiModule, NotificationModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
