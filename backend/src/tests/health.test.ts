import request from 'supertest';
import app from '../app';


describe('Health Check', () => {
    it('should return 200 OK', async () => {
        const res = await request(app).get('/');
        expect(res.status).toBe(200);
        expect(res.body).toEqual({ message: 'Sweet Shop API' });
    });
});
