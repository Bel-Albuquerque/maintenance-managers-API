import { Request, Response } from 'express';
import Controller from '../index';
import CompanieService from '../../services/Companie/Companie-Service';
import { Companie } from '../../interfaces/Companie-Interface';
import ControllerErrors from '../../interfaces/errors/Controller-Errors';
import StatusCode from '../../interfaces/Status-Code';
import { RequestWithBody } from '../../interfaces/Controller-Interfaces';
import { ResponseError } from '../../interfaces/errors/Errors-Interface';

const { notFound } = ControllerErrors;

const { 
  OK,
  CREATED,
  NO_CONTENT,
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR } = StatusCode;

export default class CompanieController extends Controller<Companie> {
  private $route: string;

  constructor(
    service = new CompanieService(),
    route = '/companies',
  ) {
    super(service);
    this.$route = route;
  }

  get route() { return this.$route; }

  create = async (
    req: RequestWithBody<Companie>,
    res: Response<Companie | ResponseError>,
  ): Promise<typeof res> => {
    const { body } = req;
    try {
      const companie = await this.service.create(body);
      if(!companie) return res.status(BAD_REQUEST).json()
      if ('error' in companie) {
        const createdErro: ResponseError = companie
        return res.status(BAD_REQUEST).json(createdErro);
      }
      return res.status(CREATED).json(companie);
    } catch (err) {
      console.log(err);
      
      return res.status(BAD_REQUEST).json({ error: this.errors.internal });
    }
  };

  readOne = async (
    req: Request<{ id: string; }>,
    res: Response<Companie | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    try {
      const companie = await this.service.readOne(id);
      return companie
        ? res.status(OK).json(companie)
        : res.status(NOT_FOUND)
          .json(notFound);
    } catch (error) {
      return res.status(BAD_REQUEST)
        .json(notFound);
    }
  };

  update = async (
    req: RequestWithBody<Companie>,
    res: Response<Companie | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    const { body } = req;
    try {
      const result = await this.service.update(id, body);
      if (!result) {
        return res.status(NOT_FOUND)
          .json(notFound);
      }
      return res.status(OK).json(result);
    } catch (err) {
      return res.status(BAD_REQUEST)
        .json(notFound);
    }
  };

  delete = async (
    req: Request<{ id: string; }>,
    res: Response<Companie | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    try {
      const result = await this.service.delete(id);
      return result
        ? res.status(NO_CONTENT).json(result)
        : res.status(NOT_FOUND).json({ error: this.errors.notFound });
    } catch (error) {
      return res.status(INTERNAL_SERVER_ERROR)
        .json({ error: this.errors.internal });
    }
  };
}