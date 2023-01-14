import { NextFunction, Request, Response } from 'express';
import { RequestWithUser } from '../../modules/user/interfaces/auth.interface';
export declare const authMiddleware: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
export declare const AdminAuthorization: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const RoleAuthorization: (role: string) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
