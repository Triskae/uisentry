import { IBaseEntity } from './base/base-entity-interface';
import { IVariant } from './variant.interface';

export interface IGalleryItem extends IBaseEntity {
  unifiId: string;
  mimeType: string;
  url: string;
  height: number;
  width: number;
  variantId: number;
  variant: IVariant;
}
