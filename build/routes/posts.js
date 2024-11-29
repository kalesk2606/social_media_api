"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fileHelpers_1 = require("../helpers/fileHelpers");
const basicAuth_1 = __importDefault(require("../middleware/basicAuth"));
const router = express_1.default.Router();
const POSTS_FILE = "./src/storage/posts.json";
// Create a new post
router.post('/', basicAuth_1.default, (req, res) => {
    const { content } = req.body;
    const posts = (0, fileHelpers_1.readData)(POSTS_FILE);
    const newPost = {
        id: posts.length + 1,
        userId: req.userId,
        content,
        likes: [],
    };
    posts.push(newPost);
    (0, fileHelpers_1.writeData)(POSTS_FILE, posts);
    res.status(201).json(newPost);
});
// Like a post
router.post('/:id/like', basicAuth_1.default, (req, res) => {
    const { id } = req.params;
    const posts = (0, fileHelpers_1.readData)(POSTS_FILE);
    const post = posts.find((p) => p.id === parseInt(id));
    if (!post) {
        return res.status(404).json({ message: "Post not found" });
    }
    if (post.likes.includes(req.userId)) {
        post.likes = post.likes.filter((uid) => uid !== req.userId);
    }
    else {
        post.likes.push(req.userId);
    }
    (0, fileHelpers_1.writeData)(POSTS_FILE, posts);
    res.json(post);
});
exports.default = router;
