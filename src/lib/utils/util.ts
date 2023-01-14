import { IRoute } from './../interfaces/IRouter';
import { AdminAuthorization } from '../middlewares/auth.middleware';
import { Router } from 'express';

/**
 * @method isEmpty
 * @param {String | Number | Object} value
 * @returns {Boolean} true & false
 * @description this value is Empty Check
 */
export const isEmpty = (value: string | number | object): boolean => {
  if (value === null) {
    return true;
  } else if (typeof value !== 'number' && value === '') {
    return true;
  } else if (typeof value === 'undefined' || value === undefined) {
    return true;
  } else if (value !== null && typeof value === 'object' && !Object.keys(value).length) {
    return true;
  } else {
    return false;
  }
};

export const applyRoutes = (router: Router, routes: IRoute[], Authorization: Function, RoleAuthorization: Function, AdminAuthorization: Function) => {
  for (const route of routes) {
    const { method, path, escapeAuth, handlers, adminOnly, role } = route;
    if (escapeAuth) {
      (router as any)[method](path, handlers);
    } else if (role) {
      (router as any)[method](path, [Authorization, RoleAuthorization(role), ...handlers]);
    } else if (adminOnly) {
      (router as any)[method](path, [Authorization, AdminAuthorization, ...handlers]);
    } else {
      (router as any)[method](path, [Authorization, ...handlers]);
    }
  }
  return router;
};

export const addPathToRoutes = (path: string, routes: IRoute[]) => {
  return routes.map((route: IRoute) => ({
    ...route,
    path: path + route.path,
  }));
};
