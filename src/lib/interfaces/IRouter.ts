import { EHttpMethods } from './../enums/EHttpMethods';
export interface IRoute {
  path: string;
  method: EHttpMethods;
  handlers: Function[];
  escapeAuth?: boolean;
  adminOnly?: boolean;
  role?: string;
}
