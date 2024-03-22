import { RootEntity } from './root.entity';
import { Column, Index, Unique } from 'typeorm';

@Index(['unifiId'], { unique: true })
export class UnifiEntity extends RootEntity {
  @Column()
  unifiId: string;
}
