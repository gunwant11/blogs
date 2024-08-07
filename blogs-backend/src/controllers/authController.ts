import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../models';
const signup = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    try {
        const user = await prisma.user.create({
            data: {
                email,
                passwordHash,
            },
        });
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: 'User registration failed' });
    }
};

const login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            res.status(400).json({ error: 'Invalid credentials' });
            return;
        }

        const isMatch = await bcrypt.compare(password, user.passwordHash);

        if (!isMatch) {
            res.status(400).json({ error: 'Invalid credentials' });
            return;
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, {
            expiresIn: '1h',
        });

        res.json({ user: { id: user.id, email: user.email }, token });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: 'Login failed' });
    }
};

export { signup, login };
