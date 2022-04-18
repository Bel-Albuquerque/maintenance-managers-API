import { Model as M, Document } from 'mongoose';
import { Model } from '../interfaces/Model-Interface';

abstract class MongoModel<T> implements Model<T> {
  constructor(public model: M<T & Document>) { }

  create = async (obj: T): Promise<T> => (
    this.model.create({ ...obj }));

  read = async (): Promise<T[]> => (
    this.model.find());

  readOne = async (id: string): Promise<T | null> => (
    this.model.findOne({ _id: id }));

  update = async (id: string, obj: T): Promise<T | null> => {
    await this.model.updateOne(
      { _id: id },
      { $set: { ...obj } },
    );
    const result = await this.readOne(id);
    return result;
  };

  delete = async (id: string): Promise<T | null> => {
    const result = await this.readOne(id);
    await this.model.findOneAndDelete({ _id: id });
    return result;
  };
}

export default MongoModel;
