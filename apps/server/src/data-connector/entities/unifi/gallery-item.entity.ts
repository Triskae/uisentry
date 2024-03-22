import { IGalleryItem } from '@unifi-monitor/shared/interfaces';
import { UnifiEntity } from '../base/unifi.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Variant } from './variant.entity';

@Entity({ schema: 'unifi' })
export class GalleryItem extends UnifiEntity implements IGalleryItem {
  @Column()
  mimeType: string;

  @Column()
  url: string;

  @Column({ type: 'smallint' })
  height: number;

  @Column({ type: 'smallint' })
  width: number;

  @Column()
  variantId: number;

  @ManyToOne(() => Variant, (variant) => variant.gallery)
  @JoinColumn({ name: 'variant_id' })
  variant: Variant;
}
