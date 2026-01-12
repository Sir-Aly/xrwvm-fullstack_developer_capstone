import React from 'react';
import "../assets/style.css";
import Header from '../Header/Header';

const About = () => {
  return (
    <div>
      <Header />
      <div className="container mt-5">
        <div className="row align-items-center">
            <div className="col-md-6">
                <h1 className="display-4 fw-bold text-primary mb-4">About Us</h1>
                <p className="lead text-muted">We are on a mission to bring transparency and trust to the car buying process.</p>
                <p>
                    Founded in 2023, DealershipApp connects customers with the best car dealers across the nation. 
                    We believe that buying a car should be exciting, not stressful. That's why we leverage advanced technology 
                    to aggregate inventory and analyze customer sentiment, helping you make informed decisions.
                </p>
                <p>
                    Whether you are looking for a brand new sedan or a reliable pre-owned SUV, our platform provides 
                    the insights you need.
                </p>
            </div>
            <div className="col-md-6">
                <div className="p-5 bg-light rounded-3 shadow-sm text-center">
                    {/* Placeholder for an image */}
                    <h4>Our Team</h4>
                    <p className="text-muted">Driven by passion for cars and code.</p>
                    <div className="d-flex justify-content-center gap-2 mt-4">
                         <div className="bg-secondary rounded-circle" style={{width:"50px", height:"50px"}}></div>
                         <div className="bg-secondary rounded-circle" style={{width:"50px", height:"50px"}}></div>
                         <div className="bg-secondary rounded-circle" style={{width:"50px", height:"50px"}}></div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default About;