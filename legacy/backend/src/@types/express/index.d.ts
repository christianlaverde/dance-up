import { User as CustomUser } from '../../domain/user.ts';

declare global {
  namespace Express {
    interface User extends CustomUser {}
  }
}

export {};