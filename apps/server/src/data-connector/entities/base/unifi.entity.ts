import { RootEntity } from './root.entity';
import { Column, Index, Unique } from 'typeorm';

@Unique(['unifi_id'])
export class UnifiEntity extends RootEntity {
  @Index('unifi_idx')
  @Column({ unique: true })
  unifiId: string;
}
