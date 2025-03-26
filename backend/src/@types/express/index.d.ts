import { User as CustomUser } from '../../models/User.entity.ts';

declare global {
  namespace Express {
    interface User extends CustomUser {}
  }
}

export {};