import { addPathToRoutes } from './../../../lib/utils/util';
import { IRoute } from './../../../lib/interfaces/IRouter';
import { Router } from 'express';
import { AuthMiddleware } from '../../../lib/middlewares/auth.middleware';
import validationMiddleware from '../../../lib/middlewares/validation.middleware';
import AuthController from '../controllers/auth.controller';
import { CreateUserDto } from '../dtos/users.dto';
import { Routes } from '../interfaces/routes.interface';
import { EHttpMethods } from '../../../lib/enums/EHttpMethods';

const path = '/auth';

const routes: IRoute[] = [
  {
    path: '/signup',
    method: EHttpMethods.POST,
    handlers: [validationMiddleware(CreateUserDto, 'body'), AuthController.signUp],
  },
  {
    path: '/login',
    method: EHttpMethods.POST,
    handlers: [validationMiddleware(CreateUserDto, 'body'), AuthController.logIn],
  },
  {
    path: '/logout',
    method: EHttpMethods.POST,
    handlers: [AuthController.logOut],
  },
];

export default addPathToRoutes(path, routes);
