import { UserPayload } from '../middlewares/authMiddleware';  // Adjust the path if necessary

declare global {
    namespace Express {
        interface Request {
            user?: UserPayload;
        }
    }
}