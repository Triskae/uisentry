import { RootEntity } from './root.entity';
import { Column, Index } from 'typeorm';

@Index(['unifiId'], { unique: true })
export class UnifiEntity extends RootEntity {
  @Column()
  unifiId: string;
}
