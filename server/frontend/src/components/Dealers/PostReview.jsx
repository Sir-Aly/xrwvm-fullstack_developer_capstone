import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./Dealers.css";
import "../assets/style.css";
import Header from '../Header/Header';

const PostReview = () => {
  const [dealer, setDealer] = useState({});
  const [review, setReview] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [date, setDate] = useState("");
  const [carmodels, setCarmodels] = useState([]);

  // URL construction logic (preserved from your original code)
  let curr_url = window.location.href;
  let root_url = curr_url.substring(0, curr_url.indexOf("postreview"));
  let params = useParams();
  let id = params.id;
  let dealer_url = root_url + `djangoapp/dealer/${id}`;
  let review_url = root_url + `djangoapp/add_review`;
  let carmodels_url = root_url + `djangoapp/get_cars`;

  const postreview = async () => {
    let name = sessionStorage.getItem("firstname") + " " + sessionStorage.getItem("lastname");
    if (name.includes("null")) {
      name = sessionStorage.getItem("username");
    }
    if (!model || review === "" || date === "" || year === "" || model === "") {
      alert("All details are mandatory");
      return;
    }

    let model_split = model.split(" ");
    let make_chosen = model_split[0];
    let model_chosen = model_split[1];

    let jsoninput = JSON.stringify({
      "name": name,
      "dealership": id,
      "review": review,
      "purchase": true,
      "purchase_date": date,
      "car_make": make_chosen,
      "car_model": model_chosen,
      "car_year": year,
    });

    try {
        const res = await fetch(review_url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: jsoninput,
        });
        const json = await res.json();
        if (json.status === 200) {
            window.location.href = window.location.origin + "/dealer/" + id;
        }
    } catch (error) {
        console.error("Error posting review:", error);
    }
  };

  const get_dealer = async () => {
    try {
        const res = await fetch(dealer_url, { method: "GET" });
        const retobj = await res.json();
        if (retobj.status === 200) {
            let dealerobjs = Array.from(retobj.dealer);
            if (dealerobjs.length > 0) setDealer(dealerobjs[0]);
        }
    } catch (error) {
        console.error("Error fetching dealer:", error);
    }
  };

  const get_cars = async () => {
    try {
        const res = await fetch(carmodels_url, { method: "GET" });
        const retobj = await res.json();
        let carmodelsarr = Array.from(retobj.CarModels);
        setCarmodels(carmodelsarr);
    } catch (error) {
        console.error("Error fetching cars:", error);
    }
  };

  useEffect(() => {
    get_dealer();
    get_cars();
  }, []);

  return (
    <div>
      <Header />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow-sm border-0">
              
              {/* Header Section */}
              <div className="card-header bg-white border-bottom-0 pb-0">
                <h2 className="text-primary mt-3 mb-1">{dealer.full_name}</h2>
                <p className="text-muted small">Share your experience with this dealership</p>
              </div>

              {/* Form Body */}
              <div className="card-body">
                
                {/* Review Text Area */}
                <div className="mb-3">
                  <label htmlFor="review" className="form-label fw-bold">Your Review</label>
                  <textarea
                    id="review"
                    className="form-control"
                    placeholder="Write your review here..."
                    rows="5"
                    onChange={(e) => setReview(e.target.value)}
                  ></textarea>
                </div>

                {/* Purchase Date */}
                <div className="mb-3">
                  <label htmlFor="date" className="form-label fw-bold">Purchase Date</label>
                  <input
                    type="date"
                    className="form-control"
                    id="date"
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>

                {/* Car Selection */}
                <div className="mb-3">
                    <label htmlFor="cars" className="form-label fw-bold">Car Model</label>
                    <select
                        name="cars"
                        id="cars"
                        className="form-select form-control"
                        defaultValue=""
                        onChange={(e) => setModel(e.target.value)}
                    >
                        <option value="" disabled hidden>Choose Car Make and Model</option>
                        {carmodels.map((carmodel, index) => (
                            <option key={index} value={carmodel.CarMake + " " + carmodel.CarModel}>
                                {carmodel.CarMake} {carmodel.CarModel}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Car Year */}
                <div className="mb-4">
                  <label htmlFor="year" className="form-label fw-bold">Car Year</label>
                  <input
                    type="number"
                    className="form-control"
                    id="year"
                    placeholder="Ex: 2020"
                    onChange={(e) => setYear(e.target.value)}
                    max={2023}
                    min={2015}
                  />
                </div>

                {/* Submit Button */}
                <div className="d-grid gap-2">
                  <button className="btn btn-primary btn-lg" onClick={postreview}>
                    Post Review
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostReview;