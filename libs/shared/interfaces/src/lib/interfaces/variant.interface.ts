import { IBaseEntity } from './base/base-entity-interface';
import { IGalleryItem } from './gallery-item.interface';
import { Region } from '../enums/store.enum';
import { Availability } from '../enums/availability.enum';

export interface IVariant extends IBaseEntity {
  productId: number;
  unifiId: string;
  sku: string;
  title: string;
  status: Availability;
  price: number;
  currency: string;
  stock: number;
  region: Region;
  gallery: IGalleryItem[];
}
