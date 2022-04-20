import { Companie, CompanieInterface as CompanieSchema, CompanieAuthorization } from '../../interfaces/Companie-Interface';
import Service, { ServiceError } from '../index';
import CompanieModel from '../../models/Companie/Companie-Model';
import { generateToken } from '../../utils-validations/tokenValidation';
import { ZodError } from 'zod';

async function checkIfExists(param: any, model: any) {
  const exist = await model.readOne(param)
  return exist ? true : false;
}

function createReturn(obj:Companie, autho: CompanieAuthorization['Authorization']): CompanieAuthorization {
  const companieAndTolken = {
    CNPJ: obj.CNPJ,
    name: obj.name,
    password: obj.password,
    users: obj.users || [],
    Authorization: autho,
  };
  return companieAndTolken;
}

function errorZodValidation (error: ZodError) {
  return { error:`${error.issues[0].path[0]} - ${error.issues[0].message}` }
}

class CompanieService extends Service<Companie> {
  constructor(model = new CompanieModel()) {
    super(model);
  }

  create = async (obj: Companie): Promise<Companie | ServiceError | CompanieAuthorization> => {
    const parsed = CompanieSchema.safeParse(obj);
    if (!parsed.success) {
      return errorZodValidation(parsed.error);
    }
    const { CNPJ } = obj;
    if (await checkIfExists(CNPJ, this.model)) return { error: 'Empresa já cadastrada.' } as ServiceError
    const Authorization = generateToken({ CNPJ })
    const created = await this.model.create(obj)

    return createReturn(created, Authorization);
  };


}

export default CompanieService;