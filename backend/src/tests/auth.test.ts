import request from 'supertest';
import app from '../app';
import db from '../db';

import { initDb } from '../db';

describe('Auth Endpoints', () => {
    beforeAll(() => {
        initDb();
        // Clean up users table
        db.prepare('DELETE FROM users').run();
    });

    afterAll(() => {
        db.prepare('DELETE FROM users').run();
    });

    describe('POST /api/auth/register', () => {
        it('should register a new user', async () => {
            const res = await request(app)
                .post('/api/auth/register')
                .send({
                    username: 'testuser',
                    password: 'password123'
                });

            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty('id');
            expect(res.body).toHaveProperty('username', 'testuser');
        });

        it('should fail with missing fields', async () => {
            const res = await request(app)
                .post('/api/auth/register')
                .send({
                    username: 'testuser2'
                });
            expect(res.status).toBe(400);
        });

        it('should fail if username already exists', async () => {
            // Create user first
            await request(app)
                .post('/api/auth/register')
                .send({
                    username: 'duplicateuser',
                    password: 'password123'
                });

            const res = await request(app)
                .post('/api/auth/register')
                .send({
                    username: 'duplicateuser',
                    password: 'newpassword'
                });

            expect(res.status).toBe(409);
        });
    });

    describe('POST /api/auth/login', () => {
        beforeAll(async () => {
            await request(app)
                .post('/api/auth/register')
                .send({
                    username: 'loginuser',
                    password: 'loginpass'
                });
        });

        it('should login with correct credentials', async () => {
            const res = await request(app)
                .post('/api/auth/login')
                .send({
                    username: 'loginuser',
                    password: 'loginpass'
                });

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('token');
        });

        it('should fail with incorrect password', async () => {
            const res = await request(app)
                .post('/api/auth/login')
                .send({
                    username: 'loginuser',
                    password: 'wrongpass'
                });

            expect(res.status).toBe(401);
        });

        it('should fail with non-existent user', async () => {
            const res = await request(app)
                .post('/api/auth/login')
                .send({
                    username: 'ghostuser',
                    password: 'loginpass'
                });

            expect(res.status).toBe(401);
        });
    });
});
