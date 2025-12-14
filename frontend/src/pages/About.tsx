
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const About: React.FC = () => {
    return (
        <div>
            <Navbar />
            <div className="container" style={{ paddingTop: '4rem', paddingBottom: '4rem', textAlign: 'center' }}>
                <h1 className="brand-font" style={{ fontSize: '3rem', color: 'var(--primary)', marginBottom: '2rem' }}>Our Story</h1>
                <div className="card" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'left', lineHeight: '1.8' }}>
                    <p style={{ marginBottom: '1.5rem' }}>
                        Welcome to <strong>Sweet Delights</strong>, where tradition meets taste. Established in 1985, we began as a small family kitchen with a simple mission: to share the authentic flavors of Indian mithai with the world.
                    </p>
                    <p style={{ marginBottom: '1.5rem' }}>
                        Our recipes have been passed down through generations, ensuring that every laddu, burfi, and gulab jamun preserves the rich heritage of our culture. We believe in using only the finest ingredients—pure ghee, fresh milk, and premium nuts—sourced directly from trusted farmers.
                    </p>
                    <p>
                        At Sweet Delights, hygiene and quality are our top priorities. Our state-of-the-art kitchen adheres to the strictest safety standards, so you can indulge in your favorite treats with complete peace of mind.
                    </p>
                </div>

                <div style={{ marginTop: '4rem', display: 'flex', justifyContent: 'center', gap: '4rem', flexWrap: 'wrap' }}>
                    <div>
                        <h2 style={{ fontSize: '3rem', color: 'var(--secondary)', marginBottom: '0.5rem' }}>35+</h2>
                        <p>Years of Tradition</p>
                    </div>
                    <div>
                        <h2 style={{ fontSize: '3rem', color: 'var(--secondary)', marginBottom: '0.5rem' }}>100+</h2>
                        <p>Varieties of Sweets</p>
                    </div>
                    <div>
                        <h2 style={{ fontSize: '3rem', color: 'var(--secondary)', marginBottom: '0.5rem' }}>10k+</h2>
                        <p>Happy Customers</p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default About;
