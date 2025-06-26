import { PrismaClient } from '@prisma/client';
import { hash, compare } from 'bcryptjs';
import pkg from 'jsonwebtoken';

const { sign, verify } = pkg;

const prisma = new PrismaClient();
const secret = process.env.JWT_SECRET || 'seu_segredo_super_secreto';

const login = async (email, password) => {
    const user = await prisma.user.findUnique({
        where: { email }
    });

    if (!user) {
        throw new Error('Usuário não registrado. Por favor, registre-se primeiro.');
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
        throw new Error('Invalid credentials');
    }

    const token = sign(
        { userId: user.id, role: user.role },
        secret,
        { expiresIn: '7d' }
    );

    const data = {
        id: user.id,
        Name: user.name,
        email: user.email,
        role: user.role,
        expires: user.role === 'ADMIN' ? '30d' : '7d' // Example of different expiration based on role
    };
    return { token, data };
};

const register = async (name, email, password) => {
    const hashedPassword = await hash(password, 10);

    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            role: 'VENDOR' // Default role for new users
        }
    });

    
    const token = sign(
        { userId: user.id, role: user.role },
        secret,
        { expiresIn: '7d' }
    );

    const data = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
    };

    return { token, data};
};

const verifyToken = (token) => {
    return verify(token, secret);
};

export default {
    login,
    register,
    verifyToken
};