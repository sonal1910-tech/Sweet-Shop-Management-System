
import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getSweetImage } from '../utils/imageHelper';
import { Link } from 'react-router-dom';
import { Star, Truck, ShieldCheck, Clock } from 'lucide-react';

interface Sweet {
    id: number;
    name: string;
    category: string;
    price: number;
    quantity: number;
}

const Home: React.FC = () => {
    const [featuredSweets, setFeaturedSweets] = useState<Sweet[]>([]);

    useEffect(() => {
        const fetchSweets = async () => {
            try {
                const data = await api.get('/sweets');
                setFeaturedSweets(data.slice(0, 4)); // Show top 4
            } catch (error) {
                console.error('Failed to fetch sweets', error);
            }
        };
        fetchSweets();
    }, []);

    return (
        <div>
            <Navbar />

            {/* Hero Section */}
            <div style={{
                background: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(https://images.unsplash.com/photo-1559846649-7af7cc04130f?auto=format&fit=crop&q=80&w=1920)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '500px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                color: 'white',
                marginBottom: '4rem'
            }}>
                <div className="container">
                    <h1 className="brand-font" style={{ fontSize: '4rem', marginBottom: '1rem', color: '#FFF' }}>Sweet Delights</h1>
                    <p style={{ fontSize: '1.5rem', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
                        Fresh & Authentic Indian Sweets at Your Doorstep
                    </p>
                    <Link to="/shop" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.2rem', borderRadius: '50px' }}>
                        Order Now
                    </Link>
                </div>
            </div>

            <div className="container">
                {/* Features */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '4rem', textAlign: 'center' }}>
                    <div className="card">
                        <div style={{ color: 'var(--primary)', marginBottom: '1rem' }}><Truck size={40} /></div>
                        <h3>Fast Delivery</h3>
                        <p style={{ color: 'var(--text-light)' }}>Fresh delivery within 24 hours</p>
                    </div>
                    <div className="card">
                        <div style={{ color: 'var(--primary)', marginBottom: '1rem' }}><ShieldCheck size={40} /></div>
                        <h3>Hygienic</h3>
                        <p style={{ color: 'var(--text-light)' }}>Prepared with utmost care</p>
                    </div>
                    <div className="card">
                        <div style={{ color: 'var(--primary)', marginBottom: '1rem' }}><Star size={40} /></div>
                        <h3>Authentic Taste</h3>
                        <p style={{ color: 'var(--text-light)' }}>Traditional recipes</p>
                    </div>
                </div>

                {/* Featured Sweets */}
                <h2 className="text-center" style={{ marginBottom: '2rem', color: 'var(--primary-dark)' }}>Featured Sweets</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
                    {featuredSweets.map(sweet => (
                        <div key={sweet.id} className="card" style={{ padding: '0', overflow: 'hidden' }}>
                            <img src={getSweetImage(sweet.name)} alt={sweet.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                            <div style={{ padding: '1.5rem' }}>
                                <h3>{sweet.name}</h3>
                                <p style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>{sweet.category}</p>
                                <div className="flex justify-between items-center" style={{ marginTop: '1rem' }}>
                                    <span style={{ fontWeight: 'bold', fontSize: '1.2rem', color: 'var(--primary)' }}>${sweet.price.toFixed(2)}</span>
                                    <Link to={`/shop`} className="btn btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.9rem' }}>View</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Reviews */}
                <div style={{ background: 'var(--bg-white)', padding: '4rem 2rem', borderRadius: '16px', marginBottom: '4rem', textAlign: 'center' }}>
                    <h2 style={{ marginBottom: '2rem' }}>Customer Reviews</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                        <div className="card">
                            <p>"The best Gulab Jamuns I've ever had! So soft and fresh."</p>
                            <div style={{ marginTop: '1rem', fontWeight: 'bold' }}>- Rahul S.</div>
                            <div style={{ color: '#FFD700' }}>★★★★★</div>
                        </div>
                        <div className="card">
                            <p>"Excellent packaging and timely delivery. Highly recommended!"</p>
                            <div style={{ marginTop: '1rem', fontWeight: 'bold' }}>- Priya M.</div>
                            <div style={{ color: '#FFD700' }}>★★★★★</div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Home;
