import { Schema, model as createModel, Document } from 'mongoose';
import { Companie } from '../interfaces/Companie-Interface';
import MongoModel from './Mongo-Model';

interface CompanieDocument extends Companie, Document { }

const companieSchema = new Schema<CompanieDocument>({
  CNPJ: String,
  name: String,
  password: String,
  users: [{ userId: String }],
})

class CompanieModel extends MongoModel<Companie> {
  constructor(model = createModel('Companie', companieSchema)) {
    super(model);
  }
}

export default CompanieModel;