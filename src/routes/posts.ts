import express, { Request, Response } from 'express';
import { readData, writeData } from '../helpers/fileHelpers';
import basicAuth from '../middleware/basicAuth';

const router = express.Router();
const POSTS_FILE = "./src/storage/posts.json";

// Types
interface Post {
    id: number;
    userId: number;
    content: string;
    likes: number[];
}

// Create a new post
router.post('/', basicAuth, (req: Request, res: Response) => {
    const { content } = req.body;
    const posts: Post[] = readData<Post[]>(POSTS_FILE);

    const newPost: Post = {
        id: posts.length + 1,
        userId: req.userId!,
        content,
        likes: [],
    };

    posts.push(newPost);
    writeData(POSTS_FILE, posts);

    res.status(201).json(newPost);
});

// Like a post
router.post('/:id/like', basicAuth, (req: Request, res: Response): any => {
    const { id } = req.params;
    const posts: Post[] = readData<Post[]>(POSTS_FILE);

    const post = posts.find((p) => p.id === parseInt(id));
    if (!post) {
        return res.status(404).json({ message: "Post not found" });
    }

    if (post.likes.includes(req.userId!)) {
        post.likes = post.likes.filter((uid) => uid !== req.userId);
    } else {
        post.likes.push(req.userId!);
    }

    writeData(POSTS_FILE, posts);
    res.json(post);
});

export default router;
