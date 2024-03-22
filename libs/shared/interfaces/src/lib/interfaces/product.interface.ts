import { IBaseEntity } from './base/base-entity-interface';
import { IVariant } from './variant.interface';

export interface IProduct extends IBaseEntity {
  unifiId: string;
  title: string;
  shortTitle: string;
  name: string;
  slug: string;
  collectionSlug: string;
  organizationalCollectionSlug: string;
  shortDescription: string;
  variants: IVariant[];
}
