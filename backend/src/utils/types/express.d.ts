import { User } from './user.interface'; 
import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
