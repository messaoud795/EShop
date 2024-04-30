import React from "react";
import { Link, useNavigate } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import "./product.css";

export const Product = ({ product, col }) => {
  const navigate = useNavigate();

  return (
    <div className={`col-sm-12 col-md-6 col-lg-${col} my-3 `}>
      <div
        className="card p-3 rounded product"
        onClick={() => navigate({ pathname: `/product/${product._id}` })}
      >
        <img
          className="card-img-top mx-auto"
          src={product.images.length > 0 && product.images[0].url}
          alt="product-img"
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{product.name}</h5>
          <div>
            <ReactStars
              count={5}
              value={product.ratings}
              size={24}
              activeColor="#ffd700"
              edit={false}
            />
            <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>
          </div>
          <p className="card-text">${product.price}</p>
          <Link
            to={`/product/${product._id}`}
            id="view_btn"
            className="btn btn-block"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};
