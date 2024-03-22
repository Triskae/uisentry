import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { databaseBaseConfig, dbTOConfig } from './config/database-base-config';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { Variant } from './entities/unifi/variant.entity';
import { Product } from './entities/unifi/product.entity';
import { GalleryItem } from './entities/unifi/gallery-item.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory() {
        return dbTOConfig();
      },
      async dataSourceFactory(options) {
        if (!options) {
          throw new Error('Invalid options passed');
        }

        return addTransactionalDataSource(new DataSource(databaseBaseConfig()));
      },
    }),
    TypeOrmModule.forFeature([Variant, Product, GalleryItem]),
  ],
})
export class DataConnectorModule {}
