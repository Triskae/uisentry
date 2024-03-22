import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import {
  Availability,
  IVariant,
  Region,
} from '@unifi-monitor/shared/interfaces';
import { UnifiEntity } from '../base/unifi.entity';
import { Product } from './product.entity';
import { GalleryItem } from './gallery-item.entity';

@Entity({ schema: 'unifi' })
export class Variant extends UnifiEntity implements IVariant {
  @Column()
  sku: string;

  @Column()
  title: string;

  @Column({ type: 'enum', enum: Availability })
  status: Availability;

  @Column()
  price: number;

  @Column()
  currency: string;

  @Column()
  stock: number;

  @Column({ type: 'enum', enum: Region })
  region: Region;

  @Column()
  productId: number;

  @ManyToOne(() => Product, (product) => product.variants)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @OneToMany(() => GalleryItem, (item) => item.variant)
  gallery: GalleryItem[];
}
