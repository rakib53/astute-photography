import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Star from "../components/Star";
import { Context } from "../Context/CreateContext";
import spinner from "../images/spinner.svg";
import "../styles/MyReview.css";

const MyReview = () => {
  const [review, setReview] = useState([]);
  const { user } = useContext(Context);

  useEffect(() => {
    fetch("https://astute-photography-server.vercel.app/reviews", {
      headers: {
        authorization: `Bearrer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const myReviews = data.filter((review) => {
          return review.reviewerEmail === user?.email;
        });
        setReview(myReviews);
      });

    document.title = "myreview || astute photography";
  }, [user?.email]);

  const handleReviewDelete = (id) => {
    fetch(`https://astute-photography-server.vercel.app/reviews/${id}`, {
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
      {!review ? (
        <img src={spinner} alt="tdsf" />
      ) : (
        <>
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
                        <h3>Service: {review.serviceTitle}</h3>
                        <p className="myRating flex">
                          {review.rating ? (
                            <Star star={review.rating}></Star>
                          ) : (
                            "No rating"
                          )}
                        </p>
                        <p>Rating Created:- {review.date}</p>
                        <p>{review.review}</p>
                      </div>
                    </div>
                    <div className="editAndDelete">
                      <Link to={`/myreviews/${review._id}`}>
                        <button className="editReview">edit</button>
                      </Link>
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
        </>
      )}
    </div>
  );
};

export default MyReview;
