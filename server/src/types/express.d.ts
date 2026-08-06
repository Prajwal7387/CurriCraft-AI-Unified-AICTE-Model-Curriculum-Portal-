import { IUser } from '../models/User.model';
import { IRole } from '../models/Role.model';

/**
 * Extend Express Request to include authenticated user.
 */
declare global {
  namespace Express {
    interface Request {
      user?: IUser & { role: IRole };
      sessionId?: string;
    }
  }
}

export {};
