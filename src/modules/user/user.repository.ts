import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '../../database/base.repository';
import { UserEntity } from '../../database/entities';

@Injectable()
export class UserRepository extends BaseRepository<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    repository: Repository<UserEntity>,
  ) {
    super(repository);
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    return await this.repository.findOne({ where: { email } });
  }

  async createUser(data: {
    name: string;
    email: string;
    password: string;
  }): Promise<UserEntity> {
    return await this.create(data);
  }

  async updateUser(
    id: string,
    data: Partial<UserEntity>,
  ): Promise<UserEntity | null> {
    return await this.update(id, data);
  }

  async deleteUser(id: string): Promise<boolean> {
    return await this.delete(id);
  }

  // These methods are inherited from BaseRepository but explicitly declared for interface compliance
  async findById(id: string): Promise<UserEntity | null> {
    return await super.findById(id);
  }

  async findAll(): Promise<UserEntity[]> {
    return await super.findAll();
  }
}
