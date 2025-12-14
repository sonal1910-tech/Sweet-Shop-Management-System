import { Request, Response } from 'express';
import { SweetModel } from '../models/sweetModel';

export const addSweet = (req: Request, res: Response) => {
    try {
        const { name, category, price, quantity } = req.body;
        if (!name || !category || !price || quantity === undefined) {
            res.status(400).json({ error: 'Missing fields' });
            return;
        }
        const sweet = SweetModel.create({ name, category, price, quantity });
        res.status(201).json(sweet);
    } catch (error) {
        res.status(500).json({ error: 'Internal error' });
    }
};

export const getSweets = (req: Request, res: Response) => {
    try {
        const sweets = SweetModel.findAll();
        res.json(sweets);
    } catch (error) {
        res.status(500).json({ error: 'Internal error' });
    }
};

export const searchSweets = (req: Request, res: Response) => {
    try {
        const { q } = req.query;
        if (!q || typeof q !== 'string') {
            return getSweets(req, res);
        }
        const sweets = SweetModel.search(q);
        res.json(sweets);
    } catch (error) {
        res.status(500).json({ error: 'Internal error' });
    }
};

export const updateSweet = (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const sweet = SweetModel.update(id, req.body);
        if (!sweet) {
            res.status(404).json({ error: 'Sweet not found' });
            return;
        }
        res.json(sweet);
    } catch (error) {
        res.status(500).json({ error: 'Internal error' });
    }
};

export const deleteSweet = (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        SweetModel.delete(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Internal error' });
    }
};

export const purchaseSweet = (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const { quantity = 1 } = req.body; // Default 1

        const updated = SweetModel.updateQuantity(id, -Math.abs(quantity));
        if (!updated) {
            res.status(400).json({ error: 'Insufficient quantity or invalid sweet' });
            return;
        }
        res.json(updated);
    } catch (error) {
        res.status(500).json({ error: 'Internal error' });
    }
};

export const restockSweet = (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const { quantity } = req.body;
        if (!quantity || quantity <= 0) {
            res.status(400).json({ error: 'Invalid quantity' });
            return;
        }

        const updated = SweetModel.updateQuantity(id, quantity);
        if (!updated) {
            res.status(404).json({ error: 'Sweet not found' });
            return;
        }
        res.json(updated);
    } catch (error) {
        res.status(500).json({ error: 'Internal error' });
    }
};
