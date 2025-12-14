
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Phone, Mail, MapPin } from 'lucide-react';

const Contact: React.FC = () => {
    return (
        <div>
            <Navbar />
            <div className="container" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
                <h1 className="text-center" style={{ marginBottom: '3rem' }}>Get in Touch</h1>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
                    {/* Contact Info */}
                    <div>
                        <div className="card" style={{ marginBottom: '2rem' }}>
                            <div className="flex items-center gap-4" style={{ marginBottom: '1.5rem' }}>
                                <div style={{ background: 'var(--primary)', color: 'white', padding: '1rem', borderRadius: '50%' }}><Phone /></div>
                                <div>
                                    <h3 style={{ margin: 0 }}>Phone</h3>
                                    <p style={{ margin: 0, color: 'var(--text-light)' }}>+91 98765 43210</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4" style={{ marginBottom: '1.5rem' }}>
                                <div style={{ background: 'var(--primary)', color: 'white', padding: '1rem', borderRadius: '50%' }}><Mail /></div>
                                <div>
                                    <h3 style={{ margin: 0 }}>Email</h3>
                                    <p style={{ margin: 0, color: 'var(--text-light)' }}>hello@sweetdelights.com</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div style={{ background: 'var(--primary)', color: 'white', padding: '1rem', borderRadius: '50%' }}><MapPin /></div>
                                <div>
                                    <h3 style={{ margin: 0 }}>Address</h3>
                                    <p style={{ margin: 0, color: 'var(--text-light)' }}>123 Mithai Lane, Food Street, India</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="card">
                        <h2 style={{ marginBottom: '1.5rem' }}>Send us a Message</h2>
                        <form onSubmit={(e) => { e.preventDefault(); alert('Message sent!'); }}>
                            <input className="input" placeholder="Your Name" required />
                            <input className="input" type="email" placeholder="Your Email" required />
                            <textarea className="input" placeholder="Your Message" style={{ height: '150px' }} required></textarea>
                            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Send Message</button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Contact;
