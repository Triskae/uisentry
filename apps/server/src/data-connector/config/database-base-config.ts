import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import path from 'path';
import { DataSourceOptions } from 'typeorm';
import * as process from 'process';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export function databaseBaseConfig(): DataSourceOptions {
  const useJs = path.basename(__filename).endsWith('.js');
  return {
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: +process.env.DATABASE_PORT!,
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    entities: useJs
      ? ['dist/**/*.entity.js']
      : ['apps/server/src/**/*.entity.ts'],
    synchronize: false,
    migrationsRun: true,
    migrationsTableName: 'ext_migration',
    migrations: useJs
      ? ['dist/apps/server/data-connector/migrations/**/*.js']
      : ['apps/server/src/data-connector/migrations/**/*.ts'],
    installExtensions: true,
    namingStrategy: new SnakeNamingStrategy(),
  };
}

export function dbTOConfig(): TypeOrmModuleOptions {
  return {
    ...databaseBaseConfig(),
    keepConnectionAlive: true,
  };
}
