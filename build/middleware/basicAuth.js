"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fileHelpers_1 = require("../helpers/fileHelpers");
const USERS_FILE = "./src/storage/users.json";
// Middleware to validate email and password
const basicAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.status(401).json({ message: "Authorization header missing" });
        return;
    }
    // Decode Basic Auth credentials
    const [email, password] = Buffer.from(authHeader.split(' ')[1], 'base64')
        .toString()
        .split(':');
    const users = (0, fileHelpers_1.readData)(USERS_FILE);
    const user = users.find((u) => u.email === email && u.password === password);
    if (!user) {
        res.status(401).json({ message: "Invalid email or password" });
        return;
    }
    req.userId = user.id; // Attach user ID to the request
    next();
};
exports.default = basicAuth;
