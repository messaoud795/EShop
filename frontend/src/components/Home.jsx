import React, { Fragment, useEffect, useState } from "react";
import MetaData from "./layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productActions";
import { Product } from "./product/Product";
import { Loader } from "./layout/Loader";
import { useAlert } from "react-alert";
import Pagination from "react-js-pagination";
import { useSearchParams } from "react-router-dom";
import Slider from "rc-slider";
import ReactStars from "react-rating-stars-component";
import "rc-slider/assets/index.css";
import isEqual from "lodash";

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

function Home() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([1, 10000]);
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(0);

  const alert = useAlert();
  const { loading, products, error, productsCount, resPerPage } = useSelector(
    (state) => state.products
  );
  const categories = [
    "Electronics",
    "Cameras",
    "Laptops",
    "Headphones",
    "Food",
    "books",
    "shoes",
    "sport",
    "home",
  ];

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    setKeyword(searchParams.get("keyword"));
    dispatch(getProducts(keyword, currentPage, price, category, rating));
  }, [
    dispatch,
    error,
    alert,
    currentPage,
    searchParams,
    price,
    keyword,
    category,
    rating,
  ]);

  useEffect(() => {
    if (!keyword) setPrice([1, 10000]);
  }, [keyword]);

  const setCurrentPageNo = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div
            className="container-fluid"
            style={{ padding: "0 40px 20px 40px" }}
          >
            <MetaData title={" Buy Best Products online"} />
            <h1 id="products_heading">Latest Products</h1>
            <section id="products" className=" mt-50">
              <div className="row">
                {keyword ? (
                  <Fragment>
                    <div className="col-6 col-md-3 mt-5 mb-5">
                      <div className="px-5">
                        <Range
                          marks={{ 1: `$1`, 10000: `$10000` }}
                          min={1}
                          max={10000}
                          defaultValue={[1, 10000]}
                          tipFormatter={(value) => `$${value}`}
                          tipProps={{ placement: "top", visible: true }}
                          value={price}
                          onChange={(price) => setPrice(price)}
                          draggableTrack={true}
                        />
                        <hr className="my-5" />
                        <div className="mt-5">
                          <h4 className="mb-3">Categories</h4>
                          <ul className="pl-0">
                            {categories.map((category) => (
                              <li
                                key={category}
                                style={{
                                  cursor: "pointer",
                                  listStyleType: "none",
                                }}
                                onClick={() => setCategory(category)}
                              >
                                {category}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <hr className="my-3" />
                        <div className="mt-5">
                          <h4 className="mb-3">Ratings</h4>
                          <ReactStars
                            count={5}
                            value={rating}
                            size={24}
                            activeColor="#ffd700"
                            onChange={(new_rating) => {
                              setRating(new_rating);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <Fragment>
                      {products.length ? (
                        <div className="col-6 col-md-9">
                          <div className="row">
                            {products.map((product) => (
                              <Product
                                key={product._id}
                                product={product}
                                col={4}
                              />
                            ))}
                          </div>
                        </div>
                      ) : (
                        <h1>No product Found</h1>
                      )}
                    </Fragment>
                  </Fragment>
                ) : (
                  products.map((product) => (
                    <Product key={product._id} product={product} col={3} />
                  ))
                )}
              </div>
            </section>
            {resPerPage <= productsCount && (
              <div className="d-flex justify-content-center mt-5">
                <Pagination
                  activePage={currentPage}
                  itemsCountPerPage={resPerPage}
                  totalItemsCount={productsCount}
                  onChange={setCurrentPageNo}
                  nextPageText={"Next"}
                  prevPageText={"Prev"}
                  firstPageText={"First"}
                  lastPageText={"Last"}
                  itemClass="page-item"
                  linkClass="page-link"
                />
              </div>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

const propsCheck = (prevProps, actualProps) => {
  return isEqual(prevProps, actualProps);
};

export default React.memo(Home, propsCheck);
