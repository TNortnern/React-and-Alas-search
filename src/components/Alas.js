import React, { useState, useEffect } from "react";
import axios from "axios";
import alasql from "alasql";
import "./Alas.scss";

const Alas = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [term, setTerm] = useState("");
  const [searched, setSearched] = useState(products);
  const searchData = e => {
    if (!term) {
      setSearched(products);
    }
    // e.preventDefault();
    const res = alasql(
      `SELECT name, image, description from ? WHERE name LIKE "%${term}%"`,
      [products]
    );
    // console.log(res);
    setSearched(res);
  };

  useEffect(() => {
        axios
          .get("http://trayvonnorthern.com/apitest/public/api/products")
          .then(res => {
            setProducts(res.data);
            setLoading(false);
            setSearched(products);
          })
          .catch(err => {
            console.log(err);
          });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);
  return (
    <>
      <h1 className="d-flex justify-content-center">Search App</h1>
      {!loading ? (
        <form className="form-inline my-2 my-lg-0 d-flex justify-content-center">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            onChange={e => {
              setTerm(e.target.value);
              searchData();
            }}
            value={term}
          />
          <button
            className="btn btn-outline-secondary my-2 my-sm-0"
            type="submit"
            onClick={searchData}
          >
            Search
          </button>
        </form>
      ) : null}
      {loading ? (
        <div className="d-flex justify-content-center spinner__container">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : null}
      <div className="products">
        {searched.map((item, index) => (
          <div key={index} className="card products__card">
            <img src={item.image} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">{item.name}</h5>
              <p className="card-text">{item.description}</p>
              <a href="test.com" className="btn btn-primary">
                Go somewhere
              </a>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Alas;
