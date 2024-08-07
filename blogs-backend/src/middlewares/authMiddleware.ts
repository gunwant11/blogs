import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
    userId: number;
}

const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        res.status(401).json({ error: 'Access denied' });
        return;
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET as string) as UserPayload;
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ error: 'Invalid token' });
    }
};

export default authMiddleware;
export type { UserPayload };
