
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';

const Cart: React.FC = () => {
    const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
    const navigate = useNavigate();

    if (cart.length === 0) {
        return (
            <div>
                <Navbar />
                <div className="container" style={{ textAlign: 'center', padding: '5rem 2rem' }}>
                    <h2 style={{ marginBottom: '1rem' }}>Your Cart is Empty 😔</h2>
                    <p style={{ color: 'var(--text-light)', marginBottom: '2rem' }}>Looks like you haven't added any sweets yet.</p>
                    <Link to="/shop" className="btn btn-primary">Start Shopping</Link>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div>
            <Navbar />
            <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
                <h1 style={{ marginBottom: '2rem' }}>Your Cart</h1>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '3rem' }}>
                    {/* Cart Items */}
                    <div className="card">
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid #eee', textAlign: 'left' }}>
                                    <th style={{ padding: '1rem' }}>Product</th>
                                    <th style={{ padding: '1rem' }}>Price</th>
                                    <th style={{ padding: '1rem' }}>Quantity</th>
                                    <th style={{ padding: '1rem' }}>Total</th>
                                    <th style={{ padding: '1rem' }}></th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.map(item => (
                                    <tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
                                        <td style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                            <img src={item.image} alt={item.name} style={{ width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover' }} />
                                            <span style={{ fontWeight: 'bold' }}>{item.name}</span>
                                        </td>
                                        <td style={{ padding: '1rem' }}>${item.price.toFixed(2)}</td>
                                        <td style={{ padding: '1rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #eee', borderRadius: '50px', padding: '0.2rem', width: 'max-content' }}>
                                                <button className="btn" style={{ padding: '0.3rem' }} onClick={() => updateQuantity(item.id, item.quantity - 1)}><Minus size={14} /></button>
                                                <span style={{ width: '30px', textAlign: 'center', fontSize: '0.9rem' }}>{item.quantity}</span>
                                                <button className="btn" style={{ padding: '0.3rem' }} onClick={() => updateQuantity(item.id, item.quantity + 1)}><Plus size={14} /></button>
                                            </div>
                                        </td>
                                        <td style={{ padding: '1rem', fontWeight: 'bold' }}>${(item.price * item.quantity).toFixed(2)}</td>
                                        <td style={{ padding: '1rem' }}>
                                            <button className="btn" style={{ color: 'red' }} onClick={() => removeFromCart(item.id)}><Trash2 size={18} /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Summary */}
                    <div>
                        <div className="card">
                            <h3 style={{ marginBottom: '1.5rem' }}>Order Summary</h3>
                            <div className="flex justify-between" style={{ marginBottom: '1rem' }}>
                                <span style={{ color: 'var(--text-light)' }}>Subtotal</span>
                                <span>${cartTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between" style={{ marginBottom: '1rem' }}>
                                <span style={{ color: 'var(--text-light)' }}>Shipping</span>
                                <span>Free</span>
                            </div>
                            <div style={{ borderTop: '1px solid #eee', margin: '1rem 0' }}></div>
                            <div className="flex justify-between" style={{ marginBottom: '2rem', fontSize: '1.2rem', fontWeight: 'bold' }}>
                                <span>Total</span>
                                <span style={{ color: 'var(--primary)' }}>${cartTotal.toFixed(2)}</span>
                            </div>
                            <Link to="/checkout" className="btn btn-primary" style={{ width: '100%' }}>
                                Proceed to Checkout <ArrowRight size={18} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Cart;
