import React, { useState, useEffect } from 'react';
import "./Dealers.css";
import "../assets/style.css";
import Header from '../Header/Header';

const Dealers = () => {
  const [dealersList, setDealersList] = useState([]);
  const [originalDealers, setOriginalDealers] = useState([]); // Keep backup for filtering
  const [states, setStates] = useState([]);
  
  const get_dealers = async () => {
    try {
      const res = await fetch("/djangoapp/get_dealers", { method: "GET" });
      const retobj = await res.json();
      if (retobj.status === 200) {
        let all_dealers = Array.from(retobj.dealers);
        setDealersList(all_dealers);
        setOriginalDealers(all_dealers);
        
        // Extract unique states for the dropdown
        let uniqueStates = [...new Set(all_dealers.map(item => item.state))];
        setStates(uniqueStates);
      }
    } catch (error) {
      console.error("Could not fetch dealers", error);
    }
  };

  useEffect(() => {
    get_dealers();
  }, []);

  const filterDealers = (state) => {
    if (state === "All") {
      setDealersList(originalDealers);
    } else {
      let filtered = originalDealers.filter(dealer => dealer.state === state);
      setDealersList(filtered);
    }
  };

  let isLoggedIn = sessionStorage.getItem("username") != null;

  return (
    <div style={{backgroundColor: "#f8f9fa", minHeight: "100vh"}}>
      <Header />
      <div className="container mt-5">
        
        {/* Title and Filter Section */}
        <div className="row align-items-center mb-4">
            <div className="col-md-8">
                <h2 className="text-primary fw-bold">Find a Dealership</h2>
                <p className="text-muted">Browse our network of premium dealers.</p>
            </div>
            <div className="col-md-4 text-end">
                <select className="form-select shadow-sm" onChange={(e) => filterDealers(e.target.value)}>
                    <option value="All">All States</option>
                    {states.map((state, index) => (
                        <option key={index} value={state}>{state}</option>
                    ))}
                </select>
            </div>
        </div>

        {/* Dealers Table Card */}
        <div className="card border-0 shadow-sm">
            <div className="card-body p-0">
                <div className="table-responsive">
                    <table className="table table-striped table-hover mb-0 align-middle">
                      <thead className="table-dark">
                        <tr>
                          <th scope="col" className="ps-4">ID</th>
                          <th scope="col">Dealer Name</th>
                          <th scope="col">City</th>
                          <th scope="col">Address</th>
                          <th scope="col">Zip</th>
                          <th scope="col">State</th>
                          {isLoggedIn && <th scope="col" className="text-end pe-4">Action</th>}
                        </tr>
                      </thead>
                      <tbody>
                        {dealersList.length === 0 ? (
                            <tr><td colSpan="7" className="text-center p-4">No dealers found in this state.</td></tr>
                        ) : (
                            dealersList.map(dealer => (
                              <tr key={dealer.id}>
                                <td className="ps-4 fw-bold text-muted">{dealer.id}</td>
                                <td>
                                    <a href={`/dealer/${dealer.id}`} className="text-decoration-none fw-bold text-primary">
                                        {dealer.full_name}
                                    </a>
                                </td>
                                <td>{dealer.city}</td>
                                <td>{dealer.address}</td>
                                <td>{dealer.zip}</td>
                                <td><span className="badge bg-secondary">{dealer.state}</span></td>
                                {isLoggedIn && (
                                  <td className="text-end pe-4">
                                    <a href={`/postreview/${dealer.id}`} className="btn btn-sm btn-outline-primary">
                                        Write Review
                                    </a>
                                  </td>
                                )}
                              </tr>
                            ))
                        )}
                      </tbody>
                    </table>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Dealers;