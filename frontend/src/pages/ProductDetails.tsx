
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getSweetImage } from '../utils/imageHelper';
import { useCart } from '../context/CartContext';
import { ShoppingCart, Minus, Plus, ArrowLeft } from 'lucide-react';

interface Sweet {
    id: number;
    name: string;
    category: string;
    price: number;
    quantity: number;
    description?: string; // Add description if API supports, else mock
}

const ProductDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [sweet, setSweet] = useState<Sweet | null>(null);
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchSweet = async () => {
            try {
                // Currently API doesn't have "get one", so we fetch all and find (or update API later)
                // Assuming we might not want to refactor backend right now, I'll fetch all.
                // Optimally: api.get(`/sweets/${id}`)
                const data = await api.get('/sweets');
                const found = data.find((s: Sweet) => s.id === parseInt(id!));
                if (found) setSweet(found);
                else navigate('/shop');
            } catch (error) {
                console.error(error);
            }
        };
        fetchSweet();
    }, [id, navigate]);

    const handleAddToCart = () => {
        if (!sweet) return;
        addToCart({
            id: sweet.id,
            name: sweet.name,
            price: sweet.price,
            quantity: quantity,
            image: getSweetImage(sweet.name)
        });
        alert('Added to cart!');
    };

    if (!sweet) return <div>Loading...</div>;

    return (
        <div>
            <Navbar />
            <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
                <button onClick={() => navigate(-1)} className="btn" style={{ marginBottom: '2rem', paddingLeft: 0 }}>
                    <ArrowLeft size={20} /> Back to Shop
                </button>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
                    <div style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: 'var(--shadow-md)' }}>
                        <img src={getSweetImage(sweet.name)} alt={sweet.name} style={{ width: '100%', height: '500px', objectFit: 'cover' }} />
                    </div>

                    <div>
                        <span className="badge" style={{ marginBottom: '1rem', display: 'inline-block' }}>{sweet.category}</span>
                        <h1 style={{ fontSize: '3rem', margin: '0 0 1rem 0' }}>{sweet.name}</h1>
                        <p style={{ fontSize: '1.5rem', color: 'var(--primary)', fontWeight: 'bold', marginBottom: '2rem' }}>
                            ${sweet.price.toFixed(2)} / piece
                        </p>

                        <p style={{ lineHeight: '1.8', color: 'var(--text-light)', marginBottom: '2rem' }}>
                            Made with premium ingredients and authentic recipes. This {sweet.name} is prepared fresh daily to ensure the highest quality and taste.
                            Perfect for special occasions or a sweet treat for yourself.
                            <br /><br />
                            <strong>Freshness Guarded:</strong> Consumed within 48 hours for best taste.
                        </p>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '2rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', border: '2px solid #eee', borderRadius: '50px', padding: '0.2rem' }}>
                                <button className="btn" onClick={() => setQuantity(Math.max(1, quantity - 1))} disabled={quantity <= 1}><Minus size={18} /></button>
                                <span style={{ width: '40px', textAlign: 'center', fontWeight: 'bold' }}>{quantity}</span>
                                <button className="btn" onClick={() => setQuantity(Math.min(sweet.quantity, quantity + 1))} disabled={quantity >= sweet.quantity}><Plus size={18} /></button>
                            </div>
                            <span style={{ color: sweet.quantity < 10 ? 'red' : 'green' }}>
                                {sweet.quantity} items available
                            </span>
                        </div>

                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button
                                className="btn btn-primary"
                                style={{ flex: 1, padding: '1rem' }}
                                onClick={handleAddToCart}
                                disabled={sweet.quantity === 0}
                            >
                                <ShoppingCart size={20} /> Add to Cart
                            </button>
                            <button className="btn btn-outline" style={{ flex: 1, padding: '1rem' }}>Buy Now</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ProductDetails;
