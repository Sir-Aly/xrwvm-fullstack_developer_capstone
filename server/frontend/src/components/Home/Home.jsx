import React from 'react';
import "../assets/style.css";
import Header from '../Header/Header';

const Home = () => {
  return (
    <div>
      <Header />
      {/* Hero Section */}
      <div className="container-fluid p-0">
        <div className="position-relative bg-dark text-white text-center" style={{height: "500px", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column"}}>
            {/* Background Image Placeholder or Color */}
            <div style={{position: "absolute", top:0, left:0, width:"100%", height:"100%", background: "linear-gradient(45deg, #0d6efd, #0dcaf0)", opacity: 0.8, zIndex: -1}}></div>
            
            <h1 className="display-3 fw-bold">Find Your Dream Car Today</h1>
            <p className="lead mb-4">The most trusted network of dealerships in the country.</p>
            <a href="/dealers" className="btn btn-light btn-lg fw-bold px-5 text-primary">View Dealerships</a>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mt-5 mb-5">
        <div className="row text-center">
            <div className="col-md-4 mb-4">
                <div className="card h-100 border-0 shadow-sm p-4">
                    <h3 className="text-primary mb-3">🔍 Transparent Reviews</h3>
                    <p className="text-muted">Read real reviews from verified buyers. Our AI-powered sentiment analysis ensures you get the honest picture.</p>
                </div>
            </div>
            <div className="col-md-4 mb-4">
                <div className="card h-100 border-0 shadow-sm p-4">
                    <h3 className="text-primary mb-3">🏢 Verified Dealers</h3>
                    <p className="text-muted">We partner with top-rated dealerships across every state to bring you the best inventory.</p>
                </div>
            </div>
            <div className="col-md-4 mb-4">
                <div className="card h-100 border-0 shadow-sm p-4">
                    <h3 className="text-primary mb-3">🛡️ Secure & Safe</h3>
                    <p className="text-muted">Your data is protected. Join thousands of users who trust us for their automotive journey.</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Home;