import { User as CustomUser } from '../../entities/user.ts';

declare global {
  namespace Express {
    interface User extends CustomUser {}
  }
}

export {};