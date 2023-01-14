import { Router } from 'express';

export interface IErrorResponse {
  status: number;
  statusCode: number;
  error?: string;
  message: string;
  description?: string;
  payload?: any;
}

export interface IModule {
  router: Router;
}
