
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import { api } from '../services/api';

const Checkout: React.FC = () => {
    const { cart, cartTotal, clearCart } = useCart();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
        date: '',
        payment: 'cod'
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePlaceOrder = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Iterate and purchase each item
            // Note: In real app, we'd have a bulk order endpoint /orders
            // Here we simulate by calling purchase endpoint for each
            for (const item of cart) {
                await api.post(`/sweets/${item.id}/purchase`, { quantity: item.quantity });
            }

            clearCart();
            navigate('/order-confirmation', {
                state: {
                    orderId: Math.floor(Math.random() * 100000),
                    total: cartTotal,
                    deliveryDate: formData.date
                }
            });
        } catch (error) {
            alert('Failed to place order. Please try again.');
        }
    };

    if (cart.length === 0) return null; // Should redirect

    return (
        <div>
            <Navbar />
            <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
                <h1 className="text-center" style={{ marginBottom: '2rem' }}>Checkout</h1>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '3rem' }}>
                    <div className="card">
                        <h3 style={{ marginBottom: '1.5rem' }}>Shipping Details</h3>
                        <form id="checkout-form" onSubmit={handlePlaceOrder}>
                            <div className="flex gap-4">
                                <div style={{ flex: 1 }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Full Name</label>
                                    <input className="input" name="name" required value={formData.name} onChange={handleChange} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Phone Number</label>
                                    <input className="input" name="phone" required value={formData.phone} onChange={handleChange} type="tel" />
                                </div>
                            </div>

                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Delivery Address</label>
                            <textarea className="input" name="address" required value={formData.address} onChange={handleChange} style={{ height: '100px', resize: 'vertical' }}></textarea>

                            <div className="flex gap-4">
                                <div style={{ flex: 1 }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Preferred Delivery Date</label>
                                    <input className="input" name="date" required value={formData.date} onChange={handleChange} type="date" />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Payment Method</label>
                                    <select className="input" name="payment" value={formData.payment} onChange={handleChange}>
                                        <option value="cod">Cash on Delivery</option>
                                        <option value="upi">UPI</option>
                                        <option value="card">Credit/Debit Card</option>
                                    </select>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className="card" style={{ height: 'max-content' }}>
                        <h3 style={{ marginBottom: '1.5rem' }}>Order Summary</h3>
                        {cart.map(item => (
                            <div key={item.id} className="flex justify-between" style={{ marginBottom: '0.8rem', fontSize: '0.9rem' }}>
                                <span>{item.quantity} x {item.name}</span>
                                <span>${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                        <div style={{ borderTop: '1px solid #eee', margin: '1rem 0' }}></div>
                        <div className="flex justify-between" style={{ marginBottom: '1.5rem', fontSize: '1.2rem', fontWeight: 'bold' }}>
                            <span>Total</span>
                            <span style={{ color: 'var(--primary)' }}>${cartTotal.toFixed(2)}</span>
                        </div>

                        <button type="submit" form="checkout-form" className="btn btn-primary" style={{ width: '100%' }}>
                            Place Order (${cartTotal.toFixed(2)})
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Checkout;
