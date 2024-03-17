import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvVars } from './config.schema';

@Injectable()
export class ApiConfigService {
  constructor(private configService: ConfigService) {}

  get<T = string | number | boolean>(envVar: EnvVars): T | undefined {
    return this.configService.get<T>(envVar);
  }
}
