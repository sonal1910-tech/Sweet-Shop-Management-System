
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { ShoppingBag, LogOut, User, Menu, X, ShoppingCart } from 'lucide-react';

const Navbar: React.FC = () => {
    const { user, logout, isAdmin } = useAuth();
    const { cartCount } = useCart();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav style={{
            background: 'var(--bg-white)',
            padding: '1rem 0',
            boxShadow: 'var(--shadow-sm)',
            position: 'sticky',
            top: 0,
            zIndex: 1000
        }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ background: 'var(--primary)', padding: '6px', borderRadius: '50%', color: 'white', display: 'flex' }}>
                        <ShoppingBag size={20} />
                    </div>
                    <div>
                        <span className="brand-font" style={{ fontSize: '1.8rem', color: 'var(--primary)', lineHeight: 1 }}>Sweet Delights</span>
                    </div>
                </Link>

                {/* Mobile Menu Toggle */}
                <button
                    className="btn"
                    style={{ background: 'transparent', padding: '0.5rem', display: 'none' }}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X /> : <Menu />}
                </button>

                {/* Desktop Links */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                    <Link to="/" style={{ textDecoration: 'none', color: 'var(--text-dark)', fontWeight: 500 }}>Home</Link>
                    <Link to="/shop" style={{ textDecoration: 'none', color: 'var(--text-dark)', fontWeight: 500 }}>Shop</Link>
                    <Link to="/about" style={{ textDecoration: 'none', color: 'var(--text-dark)', fontWeight: 500 }}>About</Link>
                    <Link to="/contact" style={{ textDecoration: 'none', color: 'var(--text-dark)', fontWeight: 500 }}>Contact</Link>

                    <div style={{ width: '1px', height: '24px', background: '#eee' }}></div>

                    {user ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <span style={{ fontSize: '0.9rem', color: 'var(--text-light)' }}>Hi, {user.username}</span>
                            {isAdmin && (
                                <Link to="/admin" className="btn btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>
                                    Admin
                                </Link>
                            )}
                            <button onClick={handleLogout} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-light)' }}>
                                <LogOut size={20} />
                            </button>
                        </div>
                    ) : (
                        <Link to="/login" className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>Login</Link>
                    )}

                    <Link to="/cart" style={{ position: 'relative', color: 'var(--text-dark)', display: 'flex', alignItems: 'center' }}>
                        <ShoppingCart size={24} />
                        {cartCount > 0 && (
                            <span className="badge" style={{ position: 'absolute', top: '-8px', right: '-10px' }}>
                                {cartCount}
                            </span>
                        )}
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
