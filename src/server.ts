import CustomRouter from './routes/Custom-Router';
import App from './app';
import { Companie } from './interfaces/Companie-Interface';
import CompanieController from './controllers/Companie/Companie-Controller';


const server = new App();

const companieController = new CompanieController()
// const motorcycleController = new MotorcycleController();

const companieRouter = new CustomRouter<Companie>();
// const motorcycleRouter = new CustomRouter<Motorcycle>();

companieRouter.addRoute(companieController);
// motorcycleRouter.addRoute(motorcycleController);

server.addRouter(companieRouter.router);
// server.addRouter(motorcycleRouter.router);

export default server;
