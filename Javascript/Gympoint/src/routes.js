import { Router } from 'express';

import UserController from './app/controllers/UserController';

import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

// Rotas da aplicação
/**
 * description: Route to store an user in application
 */
routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

// Faz com que o middleware só funcione nas rotas que estão após a definição dele
routes.use(authMiddleware);

routes.put('/users', UserController.update);
routes.post('/students', StudentController.store);
routes.put('/students', StudentController.update);
export default routes;
