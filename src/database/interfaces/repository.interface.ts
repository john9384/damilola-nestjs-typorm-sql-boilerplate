import { FindOptionsWhere, DeepPartial } from 'typeorm';

export interface IRepository<T> {
  create(data: DeepPartial<T>): Promise<T>;
  findById(id: string | number): Promise<T | null>;
  findOne(filter: FindOptionsWhere<T>): Promise<T | null>;
  findAll(filter?: FindOptionsWhere<T>): Promise<T[]>;
  update(id: string | number, data: DeepPartial<T>): Promise<T | null>;
  delete(id: string | number): Promise<boolean>;
}
