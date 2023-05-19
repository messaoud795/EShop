import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  deletReview,
  getReviews,
} from "../../actions/productActions";
import { Loader } from "../layout/Loader";
import MetaData from "../layout/MetaData";
import { MDBDataTable } from "mdbreact";
import Sidebar from "./Sidebar";
import { useAlert } from "react-alert";
import {
  CLEAR_ERRORS,
  DELETE_REVIEW_RESET,
} from "../../constants/productConstants";

const ProductReviews = () => {
  const dispatch = useDispatch();
  const { loading, error, reviews } = useSelector((state) => state.reviews);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.review
  );
  const alert = useAlert();
  const [productId, setProductId] = useState("");

  useEffect(() => {
    if (productId !== "") dispatch(getReviews(productId));
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      alert.error(error);
      dispatch(CLEAR_ERRORS());
    }
    if (isDeleted) {
      alert.success("Review Deleted Successfully");
      dispatch({ type: DELETE_REVIEW_RESET });
      dispatch(getReviews(productId));
    }
  }, [error, dispatch, alert, productId, isDeleted, deleteError]);

  const deleteReviewHandler = (id, productId) => {
    dispatch(deletReview(id, productId));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(getReviews(productId));
  };
  const setReviews = () => {
    const data = {
      columns: [
        { label: "Id", field: "id", sort: "asc" },
        { label: "Rating", field: "rating", sort: "asc" },
        { label: "Comment", field: "comment", sort: "asc" },
        { label: "User", field: "user", sort: "asc" },
        { label: "Actions", field: "actions" },
      ],
      rows: [],
    };

    reviews.forEach((review) => {
      data.rows.push({
        id: review._id,
        rating: review.rating,
        comment: review.comment,
        user: review.name,

        actions: (
          <button
            className="btn btn danger py-1 px-2 ml-2"
            onClick={() => {
              deleteReviewHandler(review._id, productId);
            }}
          >
            <i className="fa fa-trash"></i>
          </button>
        ),
      });
    });

    return data;
  };
  return (
    <Fragment>
      <MetaData title={"Product reviews"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10 py-5">
          {loading ? (
            <Loader />
          ) : (
            <>
              <div className="row justify-content-center mt-5">
                <div className="col-5">
                  <form onSubmit={submitHandler}>
                    <div className="form-group">
                      <label htmlFor="product_id">Enter Product ID</label>
                      <input
                        type="text"
                        id="product_id"
                        className="form-control"
                        value={productId}
                        onChange={(e) => setProductId(e.target.value)}
                      />
                    </div>

                    <button
                      id="search_button"
                      type="submit"
                      className="btn btn-primary btn-block py-2"
                    >
                      SEARCH
                    </button>
                  </form>
                </div>
              </div>

              {reviews.length > 0 ? (
                <MDBDataTable
                  data={setReviews()}
                  className="px-3"
                  bordered
                  striped
                  hover
                  noBottomColumns
                />
              ) : (
                <p className="mt-5 text-center">
                  No reviews for selected product
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ProductReviews;
