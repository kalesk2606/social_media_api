import { Request, Response, NextFunction } from 'express';
import { readData } from '../helpers/fileHelpers';

const USERS_FILE = "./src/storage/users.json";

// Augment Request interface to include userId
declare global {
    namespace Express {
        interface Request {
            userId?: number;
        }
    }
}

// Middleware to validate email and password
const basicAuth = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.status(401).json({ message: "Authorization header missing" });
        return;
    }

    // Decode Basic Auth credentials
    const [email, password] = Buffer.from(authHeader.split(' ')[1], 'base64')
        .toString()
        .split(':');

    const users = readData<{ id: number; email: string; password: string }[]>(USERS_FILE);

    const user = users.find((u) => u.email === email && u.password === password);
    if (!user) {
         res.status(401).json({ message: "Invalid email or password" });
         return;
    }

    req.userId = user.id; // Attach user ID to the request
    next();
};

export default basicAuth;
