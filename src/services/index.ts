import { ZodError } from 'zod';
import { Model } from '../interfaces/Model-Interface';

export interface ServiceError {
  error: ZodError | string;
}

abstract class Service<T> {
  constructor(public model: Model<T>) { }

  public async create(obj: T): Promise<T | null | ServiceError> {
    return this.model.create(obj);
  }

  public async read(): Promise<T[]> {
    return this.model.read();
  }

  public async readOne(id: string): Promise<T | null | ServiceError> {
    return this.model.readOne(id);
  }

  public async update(id: string, obj: T): Promise<T | null> {
    return this.model.update(id, obj);
  }

  public async delete(id: string): Promise<T | null | ServiceError> {
    return this.model.delete(id);
  }
}

export default Service;