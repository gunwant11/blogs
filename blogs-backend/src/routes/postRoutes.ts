import { Router } from 'express';
import { createPost, getAllPosts, getPost } from '../controllers/postController';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

router.post('/post', authMiddleware, createPost);
router.get('/post', getPost);
router.get('/posts', getAllPosts);

export default router;
