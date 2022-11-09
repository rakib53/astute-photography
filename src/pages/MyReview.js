import React, { useContext, useEffect, useState } from "react";
import { Context } from "../Context/CreateContext";
import "../styles/MyReview.css";

const MyReview = () => {
  const [review, setReview] = useState([]);
  const { user } = useContext(Context);

  useEffect(() => {
    fetch("http://localhost:5000/reviews")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const myReviews = data.filter((review) => {
          return review.reviewerEmail === user?.email;
        });
        setReview(myReviews);
      });
  }, [user?.email]);

  const handleReviewDelete = (id) => {
    fetch(`http://localhost:5000/reviews/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const remainingReview = review.filter((rev) => {
          return rev._id !== id;
        });
        setReview(remainingReview);
      });
  };

  console.log(review);

  return (
    <div className="myReviewWrapper">
      {review.length <= 0 ? (
        <h2 className="noReviewText">No Review Were Found!</h2>
      ) : (
        <>
          {review.map((review) => {
            return (
              <div className="myReview" key={review._id}>
                <div className="myReviewPhotoWrapper">
                  <img
                    className="myReviewPhoto"
                    src={review.porductImage ? review.porductImage : null}
                    alt=""
                  />
                  <div className="reviewInfos">
                    <h3>{review.serviceTitle}</h3>
                    <p>{review.reviewerName}</p>
                    <p>{review.review}</p>
                  </div>
                </div>
                <div className="editAndDelete">
                  <button className="editReview">edit</button>
                  <button
                    onClick={() => handleReviewDelete(review._id)}
                    className="deleteReview"
                  >
                    delete
                  </button>
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default MyReview;
