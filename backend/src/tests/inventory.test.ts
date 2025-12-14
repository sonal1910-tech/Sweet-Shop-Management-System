import request from 'supertest';
import app from '../app';
import db, { initDb } from '../db';
import { UserModel } from '../models/userModel';
import { SweetModel } from '../models/sweetModel';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'secret';

describe('Inventory Endpoints', () => {
    let adminToken: string;
    let userToken: string;
    let sweetId: number;

    beforeAll(async () => {
        initDb();
        db.prepare('DELETE FROM users').run();
        db.prepare('DELETE FROM sweets').run();

        // Create Admin & User
        const admin = await UserModel.create({ username: 'admin', password: 'password', role: 'admin' });
        adminToken = jwt.sign({ id: admin.id, username: admin.username, role: admin.role }, SECRET_KEY);

        const user = await UserModel.create({ username: 'user', password: 'password', role: 'user' });
        userToken = jwt.sign({ id: user.id, username: user.username, role: user.role }, SECRET_KEY);

        // Create Sweet
        const sweet = SweetModel.create({ name: 'Lollipop', category: 'Candy', price: 0.5, quantity: 10 });
        sweetId = sweet.id as number;
    });

    afterAll(() => {
        db.prepare('DELETE FROM sweets').run();
        db.prepare('DELETE FROM users').run();
    });

    describe('POST /api/sweets/:id/purchase', () => {
        it('should purchase a sweet and decrease quantity', async () => {
            const res = await request(app)
                .post(`/api/sweets/${sweetId}/purchase`)
                .set('Authorization', `Bearer ${userToken}`)
                .send({ quantity: 2 });

            expect(res.status).toBe(200);
            expect(res.body.quantity).toBe(8);

            const updatedSweet = SweetModel.findById(sweetId);
            expect(updatedSweet?.quantity).toBe(8);
        });

        it('should fail if insufficient quantity', async () => {
            const res = await request(app)
                .post(`/api/sweets/${sweetId}/purchase`)
                .set('Authorization', `Bearer ${userToken}`)
                .send({ quantity: 100 });

            expect(res.status).toBe(400); // Or 409 conflict
            expect(res.body.error).toMatch(/insufficient/i);
        });
    });

    describe('POST /api/sweets/:id/restock', () => {
        it('should restock a sweet as admin', async () => {
            const res = await request(app)
                .post(`/api/sweets/${sweetId}/restock`)
                .set('Authorization', `Bearer ${adminToken}`)
                .send({ quantity: 10 });

            expect(res.status).toBe(200);
            expect(res.body.quantity).toBe(18); // 8 + 10
        });

        it('should deny restock for non-admin', async () => {
            const res = await request(app)
                .post(`/api/sweets/${sweetId}/restock`)
                .set('Authorization', `Bearer ${userToken}`)
                .send({ quantity: 5 });

            expect(res.status).toBe(403);
        });
    });
});
