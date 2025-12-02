import { Entity, Column, Index } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('users')
@Index(['email'], { unique: true })
export class UserEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;
}
