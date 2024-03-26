import { DataSource } from 'typeorm';
import { databaseBaseConfig } from './database-base-config';

const databaseConfig: DataSource = new DataSource({
  ...databaseBaseConfig()
});

export default databaseConfig;
