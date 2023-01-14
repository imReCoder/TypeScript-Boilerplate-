import { IRoute } from '../../lib/interfaces/IRouter';
import { Router } from 'express';
import authRoute from './routes/auth.route';
import usersRoute from './routes/users.route';
import { applyRoutes } from '../../lib/utils/util';
import { AdminAuthorization, AuthMiddleware, RoleAuthorization } from '../../lib/middlewares/auth.middleware';
import userModel from './models/users.model';

export class UserModule {
  public router = Router();
  private routes: IRoute[];
  constructor() {
    this.routes = [...usersRoute, ...authRoute];
    this.initializeRoutes();
  }

  private initializeRoutes() {
    applyRoutes(this.router, this.routes, AuthMiddleware(userModel), RoleAuthorization, AdminAuthorization);
  }
}

export default new UserModule();
