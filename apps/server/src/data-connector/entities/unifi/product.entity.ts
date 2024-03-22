import { IProduct } from '@unifi-monitor/shared/interfaces';
import { Column, Entity, OneToMany } from 'typeorm';
import { UnifiEntity } from '../base/unifi.entity';
import { Variant } from './variant.entity';

@Entity({ schema: 'unifi' })
export class Product extends UnifiEntity implements IProduct {
  @Column()
  title: string;

  @Column()
  shortTitle: string;

  @Column()
  name: string;

  @Column()
  slug: string;

  @Column()
  collectionSlug: string;

  @Column()
  organizationalCollectionSlug: string;

  @Column()
  shortDescription: string;

  @OneToMany(() => Variant, (variant) => variant.product)
  variants: Variant[];
}
