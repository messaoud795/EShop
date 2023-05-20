import React from "react";
import ReactStars from "react-rating-stars-component";

const ListReviews = ({ reviews }) => {
  return (
    <div className="reviews w-75">
      <h3>Reviews:</h3>
      <hr />
      {reviews &&
        reviews.map((review) => (
          <div className="review-card my-3" key={review._id}>
            <ReactStars
              count={5}
              value={review.rating}
              size={24}
              activeColor="#ffd700"
              edit={false}
            />
            <p className="review_user">by {review.name}</p>
            <p className="review_comment">{review.comment}</p>

            <hr />
          </div>
        ))}
    </div>
  );
};

export default ListReviews;
