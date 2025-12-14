import db from '../db';
import bcrypt from 'bcrypt';

export interface User {
    id?: number;
    username: string;
    password?: string;
    role?: string;
}

export const UserModel = {
    create: async (user: User) => {
        const hashedPassword = await bcrypt.hash(user.password!, 10);
        const stmt = db.prepare('INSERT INTO users (username, password, role) VALUES (?, ?, ?)');
        const info = stmt.run(user.username, hashedPassword, user.role || 'user');
        return { id: info.lastInsertRowid, username: user.username, role: user.role || 'user' };
    },

    findByUsername: (username: string) => {
        const stmt = db.prepare('SELECT * FROM users WHERE username = ?');
        return stmt.get(username) as User | undefined;
    }
};
