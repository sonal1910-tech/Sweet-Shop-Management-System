
import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer style={{ background: 'var(--bg-white)', padding: '3rem 0', marginTop: 'auto', borderTop: '1px solid #eee' }}>
            <div className="container" style={{ textAlign: 'center' }}>
                <h2 className="brand-font" style={{ color: 'var(--primary)', marginBottom: '1rem' }}>Sweet Delights</h2>
                <p style={{ color: 'var(--text-light)', marginBottom: '2rem' }}>Fresh & Authentic Indian Sweets at Your Doorstep</p>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                    <a href="#" style={{ color: 'var(--text-dark)', textDecoration: 'none' }}>Home</a>
                    <a href="#" style={{ color: 'var(--text-dark)', textDecoration: 'none' }}>Shop</a>
                    <a href="#" style={{ color: 'var(--text-dark)', textDecoration: 'none' }}>About Us</a>
                    <a href="#" style={{ color: 'var(--text-dark)', textDecoration: 'none' }}>Contact</a>
                </div>

                <p style={{ color: '#999', fontSize: '0.9rem' }}>
                    © {new Date().getFullYear()} Sweet Delights. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
