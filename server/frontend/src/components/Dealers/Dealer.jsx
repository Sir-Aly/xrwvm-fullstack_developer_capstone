import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "../assets/style.css";
import Header from '../Header/Header';
import reviewIcon from "../assets/reviewicon.png";

const Dealer = () => {
  const [dealer, setDealer] = useState({});
  const [reviews, setReviews] = useState([]);
  const [unreviewed, setUnreviewed] = useState(false);
  const [postReview, setPostReview] = useState(<></>);

  let curr_url = window.location.href;
  let root_url = curr_url.substring(0, curr_url.indexOf("dealer"));
  let params = useParams();
  let id = params.id;
  let dealer_url = root_url + `djangoapp/dealer/${id}`;
  let reviews_url = root_url + `djangoapp/reviews/dealer/${id}`;
  let post_review_url = root_url + `postreview/${id}`;

  const get_dealer = async () => {
    const res = await fetch(dealer_url, { method: "GET" });
    const retobj = await res.json();
    if (retobj.status === 200) {
      let dealerobjs = Array.from(retobj.dealer);
      if (dealerobjs.length > 0) setDealer(dealerobjs[0]);
    }
  };

  const get_reviews = async () => {
    const res = await fetch(reviews_url, { method: "GET" });
    const retobj = await res.json();
    if (retobj.status === 200) {
      if (retobj.reviews.length > 0) {
        setReviews(retobj.reviews);
      } else {
        setUnreviewed(true);
      }
    }
  };

  const sentimentColor = (sentiment) => {
      if (!sentiment) return "secondary";
      switch(sentiment.toLowerCase()) {
          case "positive": return "success";
          case "negative": return "danger";
          default: return "secondary"; // Neutral or other
      }
  };

  useEffect(() => {
    get_dealer();
    get_reviews();
    if (sessionStorage.getItem("username")) {
      setPostReview(
        <a href={post_review_url} className="btn btn-primary btn-lg mt-3">
            <img src={reviewIcon} style={{width:'20px', marginRight:'10px'}} alt="icon"/>
            Write a Review
        </a>
      );
    }
  }, []);

  return (
    <div style={{backgroundColor: "#f8f9fa", minHeight: "100vh"}}>
      <Header />
      <div className="container mt-5">
        {/* Dealer Info Card */}
        <div className="card shadow-sm border-0 mb-5">
            <div className="card-body">
                <h1 className="display-6 text-primary fw-bold">{dealer.full_name}</h1>
                <p className="text-muted mb-0">{dealer.address}, {dealer.city}, {dealer.state}, {dealer.zip}</p>
                {postReview}
            </div>
        </div>

        {/* Reviews Section */}
        <h3 className="mb-4">Customer Reviews</h3>
        
        <div className="row">
            {reviews.length === 0 && unreviewed === false ? (
              <div className="col-12"><p>Loading Reviews...</p></div>
            ) : unreviewed === true ? (
              <div className="col-12"><p>No reviews yet! Be the first to write one.</p></div>
            ) : (
              reviews.map((review, index) => (
                <div className="col-md-4 mb-4" key={index}>
                    <div className="card h-100 shadow-sm border-0">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <h5 className="card-title mb-0">{review.car_make} {review.car_model}</h5>
                                <span className={`badge bg-${sentimentColor(review.sentiment)}`}>
                                    {review.sentiment}
                                </span>
                            </div>
                            <h6 className="card-subtitle mb-2 text-muted">{review.car_year}</h6>
                            <p className="card-text mt-3">"{review.review}"</p>
                        </div>
                        <div className="card-footer bg-white border-top-0 text-end">
                            <small className="text-muted">- {review.name}</small>
                        </div>
                    </div>
                </div>
              ))
            )}
        </div>
      </div>
    </div>
  );
};

export default Dealer;