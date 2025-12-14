
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { CheckCircle } from 'lucide-react';

const OrderConfirmation: React.FC = () => {
    const location = useLocation();
    const { orderId, total, deliveryDate } = location.state || { orderId: '000', total: 0, deliveryDate: 'Soon' };

    return (
        <div>
            <Navbar />
            <div className="container" style={{ textAlign: 'center', padding: '5rem 2rem' }}>
                <div style={{ color: 'green', marginBottom: '1rem' }}><CheckCircle size={80} /></div>
                <h1 style={{ marginBottom: '1rem' }}>Order Placed Successfully!</h1>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-light)', marginBottom: '3rem' }}>
                    Thank you for choosing Sweet Delights. Your authentic sweets are on their way.
                </p>

                <div className="card" style={{ maxWidth: '500px', margin: '0 auto 3rem', textAlign: 'left' }}>
                    <div className="flex justify-between" style={{ marginBottom: '1rem' }}>
                        <span style={{ color: 'var(--text-light)' }}>Order ID:</span>
                        <span style={{ fontWeight: 'bold' }}>#{orderId}</span>
                    </div>
                    <div className="flex justify-between" style={{ marginBottom: '1rem' }}>
                        <span style={{ color: 'var(--text-light)' }}>Amount:</span>
                        <span style={{ fontWeight: 'bold' }}>${total?.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between" style={{ marginBottom: '1rem' }}>
                        <span style={{ color: 'var(--text-light)' }}>Estimated Delivery:</span>
                        <span style={{ fontWeight: 'bold' }}>{deliveryDate || 'Within 24 Hours'}</span>
                    </div>
                </div>

                <Link to="/" className="btn btn-primary">Continue Shopping</Link>
            </div>
            <Footer />
        </div>
    );
};

export default OrderConfirmation;
