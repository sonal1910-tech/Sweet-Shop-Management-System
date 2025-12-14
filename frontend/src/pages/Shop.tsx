
import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getSweetImage } from '../utils/imageHelper';
import { Link } from 'react-router-dom';
import { Filter, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface Sweet {
    id: number;
    name: string;
    category: string;
    price: number;
    quantity: number;
}

const Shop: React.FC = () => {
    const [sweets, setSweets] = useState<Sweet[]>([]);
    const [filteredSweets, setFilteredSweets] = useState<Sweet[]>([]);
    const [activeCategory, setActiveCategory] = useState('All');
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchSweets = async () => {
            try {
                const data = await api.get('/sweets');
                setSweets(data);
                setFilteredSweets(data);
            } catch (error) {
                console.error('Failed to fetch sweets', error);
            }
        };
        fetchSweets();
    }, []);

    useEffect(() => {
        if (activeCategory === 'All') {
            setFilteredSweets(sweets);
        } else {
            setFilteredSweets(sweets.filter(s => s.category.includes(activeCategory)));
        }
    }, [activeCategory, sweets]);

    const handleAddToCart = (sweet: Sweet) => {
        addToCart({
            id: sweet.id,
            name: sweet.name,
            price: sweet.price,
            quantity: 1,
            image: getSweetImage(sweet.name)
        });
        alert(`${sweet.name} added to cart!`);
    };

    const categories = ['All', 'Milk', 'Candy', 'Dry Fruit', 'Festival'];

    return (
        <div>
            <Navbar />
            <div className="container" style={{ paddingTop: '2rem' }}>
                <h1 className="text-center" style={{ marginBottom: '2rem' }}>Shop Our Delights</h1>

                {/* Filters */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            className={`btn ${activeCategory === cat ? 'btn-primary' : 'btn-outline'}`}
                            onClick={() => setActiveCategory(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
                    {filteredSweets.map(sweet => (
                        <div key={sweet.id} className="card" style={{ padding: '0', overflow: 'hidden' }}>
                            <Link to={`/product/${sweet.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <div style={{ position: 'relative' }}>
                                    <img src={getSweetImage(sweet.name)} alt={sweet.name} style={{ width: '100%', height: '250px', objectFit: 'cover' }} />
                                    {sweet.quantity === 0 && (
                                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(255,255,255,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold' }}>
                                            SOLD OUT
                                        </div>
                                    )}
                                </div>
                                <div style={{ padding: '1.5rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                        <h3 style={{ margin: 0 }}>{sweet.name}</h3>
                                        <span style={{ fontWeight: 'bold', color: 'var(--primary)', fontSize: '1.2rem' }}>${sweet.price.toFixed(2)}</span>
                                    </div>
                                    <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>{sweet.category}</p>

                                    <button
                                        className="btn btn-primary"
                                        style={{ width: '100%' }}
                                        disabled={sweet.quantity === 0}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleAddToCart(sweet);
                                        }}
                                    >
                                        <ShoppingCart size={18} /> Add to Cart
                                    </button>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Shop;
