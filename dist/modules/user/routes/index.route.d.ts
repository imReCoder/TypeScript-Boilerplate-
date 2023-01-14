import { Routes } from './../interfaces/routes.interface';
import IndexController from '../controllers/index.controller';
declare class IndexRoute implements Routes {
    path: string;
    router: import("express-serve-static-core").Router;
    indexController: IndexController;
    private routes;
    constructor();
    private initializeRoutes;
}
export default IndexRoute;
