import { Request, Response } from 'express';
import prisma from '../models';

const createPost = async (req: Request, res: Response): Promise<void> => {
    const { title, content } = req.body;
    const { userId } = req.user as { userId: number };

    try {
        const post = await prisma.post.create({
            data: {
                title,
                content,
                authorId: userId,
            },
        });
        res.status(201).json(post);
    } catch (error) {
        res.status(400).json({ error: 'Failed to create post' });
    }
};

const getAllPosts = async (req: Request, res: Response): Promise<void> => {
    const { author } = req.query;

    try {
        const posts = await prisma.post.findMany({
            where: author ? { authorId: parseInt(author as string) } : {},
            include: { author: true },
        });
        res.json(posts);
    } catch (error) {
        res.status(400).json({ error: 'Failed to fetch posts' });
    }
};

export { createPost, getAllPosts, getPost };


const getPost = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.query;

    try {
        const post = await prisma.post.findUnique({
            where: { id: parseInt(id as string) },
            include: { author: true },
        });
        res.json(post);
    } catch (error) {
        res.status(400).json({ error: 'Failed to fetch post' });
    }
}
