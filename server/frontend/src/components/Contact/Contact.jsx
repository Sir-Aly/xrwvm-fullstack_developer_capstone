import React from 'react';
import "../assets/style.css";
import Header from '../Header/Header';

const Contact = () => {
  return (
    <div>
      <Header />
      <div className="container mt-5">
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card shadow-sm border-0">
                    <div className="card-header bg-white text-center py-4">
                        <h2 className="text-primary fw-bold">Contact Us</h2>
                        <p className="text-muted mb-0">Have questions? We'd love to hear from you.</p>
                    </div>
                    <div className="card-body p-5">
                        <form>
                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <label className="form-label fw-bold">Name</label>
                                    <input type="text" className="form-control" placeholder="Your Name" />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label fw-bold">Email</label>
                                    <input type="email" className="form-control" placeholder="name@example.com" />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label fw-bold">Subject</label>
                                <input type="text" className="form-control" placeholder="How can we help?" />
                            </div>
                            <div className="mb-4">
                                <label className="form-label fw-bold">Message</label>
                                <textarea className="form-control" rows="5" placeholder="Write your message here..."></textarea>
                            </div>
                            <div className="d-grid">
                                <button type="button" className="btn btn-primary btn-lg" onClick={() => alert("Thank you! We will contact you shortly.")}>
                                    Send Message
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="card-footer bg-light text-center py-3">
                        <p className="mb-0 small text-muted">Or email us directly at <a href="mailto:support@dealershipapp.com">support@dealershipapp.com</a></p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;