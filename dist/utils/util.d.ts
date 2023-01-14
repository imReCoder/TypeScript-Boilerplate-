import { IRouter } from './../lib/interfaces/IRouter';
import { Router } from 'express';
/**
 * @method isEmpty
 * @param {String | Number | Object} value
 * @returns {Boolean} true & false
 * @description this value is Empty Check
 */
export declare const isEmpty: (value: string | number | object) => boolean;
export declare const applyRoutes: (routes: IRouter[], router: Router, Authorization: Function, RoleAuthorization: Function, AdminAuthorization: Function) => Router;
