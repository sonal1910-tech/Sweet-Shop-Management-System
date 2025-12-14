import db from '../db';

export interface Sweet {
    id?: number;
    name: string;
    category: string;
    price: number;
    quantity: number;
}

export const SweetModel = {
    create: (sweet: Sweet) => {
        const stmt = db.prepare('INSERT INTO sweets (name, category, price, quantity) VALUES (?, ?, ?, ?)');
        const info = stmt.run(sweet.name, sweet.category, sweet.price, sweet.quantity);
        return { ...sweet, id: info.lastInsertRowid as number };
    },

    findAll: () => {
        const stmt = db.prepare('SELECT * FROM sweets');
        return stmt.all() as Sweet[];
    },

    findById: (id: number) => {
        const stmt = db.prepare('SELECT * FROM sweets WHERE id = ?');
        return stmt.get(id) as Sweet | undefined;
    },

    search: (query: string) => {
        const stmt = db.prepare('SELECT * FROM sweets WHERE name LIKE ? OR category LIKE ?');
        return stmt.all(`%${query}%`, `%${query}%`) as Sweet[];
    },

    update: (id: number, sweet: Partial<Sweet>) => {
        // Dynamic update
        const fields = [];
        const values = [];
        for (const [key, value] of Object.entries(sweet)) {
            if (key !== 'id') {
                fields.push(`${key} = ?`);
                values.push(value);
            }
        }
        values.push(id);
        const stmt = db.prepare(`UPDATE sweets SET ${fields.join(', ')} WHERE id = ?`);
        stmt.run(...values);
        return SweetModel.findById(id);
    },

    updateQuantity: (id: number, amount: number) => {
        // Amount can be positive (restock) or negative (purchase)
        // Check if purchase is valid
        if (amount < 0) {
            const stmt = db.prepare('UPDATE sweets SET quantity = quantity + ? WHERE id = ? AND quantity >= ABS(?)');
            const info = stmt.run(amount, id, amount);
            if (info.changes === 0) return null; // Failed (not found or insufficient)
        } else {
            // Restock
            const stmt = db.prepare('UPDATE sweets SET quantity = quantity + ? WHERE id = ?');
            const info = stmt.run(amount, id);
            if (info.changes === 0) return null;
        }
        return SweetModel.findById(id);
    },

    delete: (id: number) => {
        const stmt = db.prepare('DELETE FROM sweets WHERE id = ?');
        stmt.run(id);
    }
};
