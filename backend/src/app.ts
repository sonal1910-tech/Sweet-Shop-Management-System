import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth';
import sweetRoutes from './routes/sweets';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/sweets', sweetRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'Sweet Shop API' });
});

export default app;
