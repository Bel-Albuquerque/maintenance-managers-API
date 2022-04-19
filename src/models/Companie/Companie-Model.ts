import { Schema, model as createModel, Document } from 'mongoose';
import { Companie } from '../../interfaces/Companie-Interface';
import MongoModel from '../Mongo-Model';

interface CompanieDocument extends Companie, Document { }

const companieSchema = new Schema<CompanieDocument>({
  CNPJ: String,
  name: String,
  password: String,
  users: [{ userId: String }],
}, {
  versionKey: false })

class CompanieModel extends MongoModel<Companie> {
  constructor(model = createModel('Companie', companieSchema)) {
    super(model);
  }

  read = async (): Promise<Companie[]> => (
    this.model.find({}, { _id: false }));

  readOne = async (param: string): Promise<Companie | null> => (
  this.model.findOne({ CNPJ: param }, { _id: false }));

  update = async (param: string, obj: Companie): Promise<Companie | null> => {
    await this.model.updateOne(
      { CNPJ: param },
      { $set: { ...obj } },
    );
    const result = await this.readOne(param);
    return result;
  };

  delete = async (param: string): Promise<Companie | null> => {
    const result = await this.readOne(param);
    await this.model.findOneAndDelete({ CNPJ: param });
    return result;
  };

}

export default CompanieModel;