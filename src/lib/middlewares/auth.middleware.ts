import { HTTP400Error, HTTP401Error } from '../utils/httpErrors';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import COMMON_ERRORS from '../data/commonErrors';
import { DataStoredInToken, RequestWithUser } from '../../modules/user/interfaces/auth.interface';
import { SECRET_KEY } from '../../config';
import userModel from '../../modules/user/models/users.model';
import { Model } from 'mongoose';

export const AuthMiddleware = (userModel: Model<any>) => async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const Authorization = req.cookies['Authorization'] || (req.header('Authorization') ? req.header('Authorization').split('Bearer ')[1] : null);

    if (Authorization) {
      const secretKey: string = SECRET_KEY;
      const verificationResponse = (await verify(Authorization, secretKey)) as DataStoredInToken;
      const userId = verificationResponse._id;
      const findUser = await userModel.findById(userId);

      if (findUser) {
        req.user = findUser;
        next();
      } else {
        const error = COMMON_ERRORS.INVALID_TOKEN;
        error.message = 'Invalid Token';
        error.description = "The token you provided doesn't match any user";
        next(new HTTP401Error(error));
      }
    } else {
      const error = COMMON_ERRORS.TOKEN_MISSING;
      next(new HTTP400Error(error));
    }
  } catch (e) {
    const error = COMMON_ERRORS.INVALID_TOKEN;
    error.message = 'Invalid Token';
    error.description = e.message;
    next(new HTTP401Error(error));
  }
};

export const AdminAuthorization = async (req: Request, res: Response, next: NextFunction) => {
  if (req.role === 'admin') {
    next();
  } else {
    const error = COMMON_ERRORS.INVALID_ROLE;
    error.message = 'Incorrect Role for Request. Your Role : ' + req.role;
    next(new HTTP401Error(error));
  }
};

export const RoleAuthorization = (role: string) => async (req: Request, res: Response, next: NextFunction) => {
  if (req.role === 'admin' || req.role === role) {
    next();
  } else {
    const error = COMMON_ERRORS.INVALID_ROLE;
    error.message = 'Incorrect Role for Request. Your Role : ' + req.role;
    next(new HTTP401Error(error));
  }
};
