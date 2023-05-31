import { User } from "../entities/User";
import { TPDetails } from "../types";

declare global {
  namespace Express {
    interface Request {
      validated: User | TPDetails;
      decoded: User;
    }
  }
}
