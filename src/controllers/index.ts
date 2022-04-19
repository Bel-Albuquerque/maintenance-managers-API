import { Request, Response } from 'express';
import Service from '../services';
import ControllerErrors from '../interfaces/errors/Controller-Errors';
import StatusCode from '../interfaces/Status-Code';
import { RequestWithBody } from '../interfaces/Controller-Interfaces';
import { ResponseError } from '../interfaces/errors/Errors-Interface';

abstract class Controller<T> {
  abstract route: string;

  protected errors = ControllerErrors;

  protected status = StatusCode;

  constructor(public service: Service<T>) { }

  abstract create(
    req: RequestWithBody<T>,
    res: Response<T | ResponseError>,
  ): Promise<typeof res>;

  read = async (
    _req: Request,
    res: Response<T[] | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const docs = await this.service.read();
      return res.status(this.status.OK).json(docs);
    } catch (err) {
      return res.status(this.status.INTERNAL_SERVER_ERROR)
        .json({ error: this.errors.internal });
    }
  };

  abstract readOne(
    req: Request<{ id: string; }>,
    res: Response<T | ResponseError>
  ): Promise<typeof res>;

  abstract update(
    req: RequestWithBody<T>,
    res: Response<T | ResponseError>,
  ): Promise<typeof res>;

  abstract delete(
    req: Request<{ id: string; }>,
    res: Response<T | ResponseError>
  ): Promise<typeof res>;
}
export default Controller;
