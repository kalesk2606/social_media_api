"use strict";
// import express, { Request, Response } from 'express';
// import { readData, writeData } from '../helpers/fileHelpers';
Object.defineProperty(exports, "__esModule", { value: true });
// const router = express.Router();
// const USERS_FILE = "./src/storage/users.json";
// // Types
// interface User {
//     id: number;
//     email: string;
//     password: string;
// }
// // Register a new user
// router.post('/register', (req: Request, res: Response): any => {
//     const { email, password } = req.body;
//     const users: User[] = readData<User[]>(USERS_FILE);
//     if (users.find((user) => user.email === email)) {
//         return res.status(400).json({ message: "Email already exists" });
//     }
//     const newUser: User = { id: users.length + 1, email, password };
//     users.push(newUser);
//     writeData(USERS_FILE, users);
//     res.status(201).json({ message: "User registered successfully" });
// });
// export default router;
const express_1 = require("express");
const router = (0, express_1.Router)();
// Define routes
router.post("/register", (req, res) => {
    res.send("User registered");
});
router.post("/login", (req, res) => {
    res.send("User logged in");
});
// Export the router
exports.default = router;
