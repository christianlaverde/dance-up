import { User as AppUser } from '../../models/User.entity.ts';

declare global {
  namespace Express {
    interface User extends CustomUser {}
  }
}

export {};