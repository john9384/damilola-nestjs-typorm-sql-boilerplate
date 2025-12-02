import { Entity, Column, Index } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('auth_tokens')
@Index(['email'], { unique: true })
@Index(['token'], { unique: true })
export class AuthTokenEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 6 })
  token: string;

  @Column({ type: 'timestamp' })
  expiresAt: Date;
}
