
import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import Navbar from '../components/Navbar';
import { Trash2, Edit, Plus } from 'lucide-react';

interface Sweet {
    id: number;
    name: string;
    category: string;
    price: number;
    quantity: number;
}

const Admin: React.FC = () => {
    const [sweets, setSweets] = useState<Sweet[]>([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingSweet, setEditingSweet] = useState<Sweet | null>(null);
    const [formData, setFormData] = useState({ name: '', category: '', price: '', quantity: '' });

    useEffect(() => {
        fetchSweets();
    }, []);

    const fetchSweets = async () => {
        try {
            const data = await api.get('/sweets');
            setSweets(data);
        } catch (error) {
            console.error('Failed to fetch sweets', error);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this sweet?')) return;
        try {
            await api.delete(`/sweets/${id}`);
            setSweets(prev => prev.filter(s => s.id !== id));
        } catch (error) {
            alert('Failed to delete sweet');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const payload = {
                ...formData,
                price: parseFloat(formData.price),
                quantity: parseInt(formData.quantity)
            };

            if (editingSweet) {
                await api.put(`/sweets/${editingSweet.id}`, payload);
            } else {
                await api.post('/sweets', payload);
            }
            setIsFormOpen(false);
            setEditingSweet(null);
            setFormData({ name: '', category: '', price: '', quantity: '' });
            fetchSweets();
        } catch (error) {
            alert('Failed to save sweet');
        }
    };

    const openEdit = (sweet: Sweet) => {
        setEditingSweet(sweet);
        setFormData({
            name: sweet.name,
            category: sweet.category,
            price: sweet.price.toString(),
            quantity: sweet.quantity.toString()
        });
        setIsFormOpen(true);
    };

    const handleRestock = async (id: number) => {
        const qty = prompt('Enter quantity to add:');
        if (!qty) return;
        try {
            await api.post(`/sweets/${id}/restock`, { quantity: parseInt(qty) });
            fetchSweets();
        } catch (error) {
            alert('Restock failed');
        }
    };

    return (
        <div>
            <Navbar />
            <div className="container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h1>Admin Dashboard</h1>
                    <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} onClick={() => { setEditingSweet(null); setFormData({ name: '', category: '', price: '', quantity: '' }); setIsFormOpen(true); }}>
                        <Plus size={20} /> Add Sweet
                    </button>
                </div>

                {isFormOpen && (
                    <div style={{ background: 'rgba(0,0,0,0.5)', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
                        <div className="card" style={{ width: '400px', position: 'relative' }}>
                            <h2>{editingSweet ? 'Edit Sweet' : 'New Sweet'}</h2>
                            <form onSubmit={handleSubmit}>
                                <input className="input" placeholder="Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
                                <input className="input" placeholder="Category" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} required />
                                <input className="input" type="number" step="0.01" placeholder="Price" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} required />
                                <input className="input" type="number" placeholder="Quantity" value={formData.quantity} onChange={e => setFormData({ ...formData, quantity: e.target.value })} required />
                                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                    <button type="button" className="btn" onClick={() => setIsFormOpen(false)} style={{ flex: 1, background: '#ccc' }}>Cancel</button>
                                    <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Save</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                <div className="card" style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
                        <thead>
                            <tr style={{ background: '#f9f9f9', textAlign: 'left' }}>
                                <th style={{ padding: '1rem' }}>ID</th>
                                <th style={{ padding: '1rem' }}>Name</th>
                                <th style={{ padding: '1rem' }}>Category</th>
                                <th style={{ padding: '1rem' }}>Price</th>
                                <th style={{ padding: '1rem' }}>Qty</th>
                                <th style={{ padding: '1rem' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sweets.map(sweet => (
                                <tr key={sweet.id} style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '1rem' }}>{sweet.id}</td>
                                    <td style={{ padding: '1rem', fontWeight: 'bold' }}>{sweet.name}</td>
                                    <td style={{ padding: '1rem' }}>{sweet.category}</td>
                                    <td style={{ padding: '1rem' }}>${sweet.price.toFixed(2)}</td>
                                    <td style={{ padding: '1rem' }}>
                                        {sweet.quantity}
                                        <button className="btn" style={{ marginLeft: '0.5rem', fontSize: '0.8rem', padding: '0.2rem 0.5rem', background: 'var(--accent)' }} onClick={() => handleRestock(sweet.id)}>+</button>
                                    </td>
                                    <td style={{ padding: '1rem', display: 'flex', gap: '0.5rem' }}>
                                        <button className="btn" style={{ background: 'var(--secondary)', color: 'white', padding: '0.4rem' }} onClick={() => openEdit(sweet)}>
                                            <Edit size={16} />
                                        </button>
                                        <button className="btn" style={{ background: 'var(--primary)', color: 'white', padding: '0.4rem' }} onClick={() => handleDelete(sweet.id)}>
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Admin;
