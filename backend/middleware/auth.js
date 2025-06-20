
import pkg from 'jsonwebtoken';
const { verify } = pkg;

const secret = process.env.JWT_SECRET || 'seu_segredo_super_secreto';

export default function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: 'Token not provided' });
    }

    const parts = authHeader.split(' ');

    if (parts.length !== 2) {
        return res.status(401).json({ message: 'Token error' });
    }

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).json({ message: 'Token malformatted' });
    }

    try {
        const decoded = verify(token, secret);
        req.user = {
            id: decoded.userId,
            role: decoded.role
        };
        return next();
    } catch (err) {
        return res.status(401).json({ message: 'Token invalid' });
    }
}


