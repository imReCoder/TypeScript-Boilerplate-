import { Router } from 'express';
import { EHttpMethods } from '../../../lib/enums/EHttpMethods';
import { IRoute } from '../../../lib/interfaces/IRouter';
import validationMiddleware from '../../../lib/middlewares/validation.middleware';
import { addPathToRoutes } from '../../../lib/utils/util';
import UsersController from '../controllers/users.controller';
import { CreateUserDto } from '../dtos/users.dto';
import { Routes } from '../interfaces/routes.interface';

// @controller

const path = '/user';

const userRoutes: IRoute[] = [
  {
    path: '/',
    method: EHttpMethods.GET,
    handlers: [UsersController.getUsers],
  },
  {
    path: '/:id',
    method: EHttpMethods.GET,
    handlers: [UsersController.getUserById],
  },
  {
    path: '/',
    method: EHttpMethods.POST,
    handlers: [validationMiddleware(CreateUserDto, 'body'), UsersController.createUser],
  },
  {
    path: '/:id',
    method: EHttpMethods.PUT,
    handlers: [validationMiddleware(CreateUserDto, 'body', true), UsersController.updateUser],
  },
  {
    path: '/:id',
    method: EHttpMethods.DELETE,
    handlers: [UsersController.deleteUser],
  },
];

// apply path to each route and export
export default addPathToRoutes(path, userRoutes);
