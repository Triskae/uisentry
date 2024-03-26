import { Global, Module } from '@nestjs/common';
import { envVarsSchema } from './config/config.schema';
import { ConfigModule } from '@nestjs/config';
import { ApiConfigService } from './config/api-config.service';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: process.env.NODE_ENV !== 'TEST',
      validationSchema: envVarsSchema
    })
  ],
  providers: [ApiConfigService],
  exports: [ApiConfigService]
})
export class CoreModule {}
