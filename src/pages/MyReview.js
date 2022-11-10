import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../Context/CreateContext";
import "../styles/MyReview.css";

const MyReview = () => {
  const [review, setReview] = useState([]);
  const [onEdit, setOnEdit] = useState([]);
  const inputEl = useRef();
  const { user } = useContext(Context);

  useEffect(() => {
    fetch("http://localhost:5000/reviews", {
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

  const handleEdit = (id) => {
    // inputEl.current.focus();
    // setOnEdit(!onEdit);

    const matchReview = review.filter((editReview) => {
      return editReview._id === id;
    });
    setOnEdit(matchReview);
  };

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
                    {/* <textarea
                      className={
                        onEdit ? "activeEditField" : "disableEditFiled"
                      }
                      name="reviews"
                      ref={inputEl}
                      disabled={!onEdit ? true : false}
                      defaultValue={review.review}
                    ></textarea> */}
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

      {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, unde! */}

      {/* The button to open modal */}

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-3">
            Congratulations random Internet user!
          </h3>
          <textarea
            className="border-2 w-full"
            type="text"
            ref={inputEl}
            defaultValue={onEdit[0]?.review}
          />
          <div className="modal-action">
            <label htmlFor="my-modal" className="btn">
              update
            </label>
          </div>
        </div>
      </div>

      {/* Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus, nesciunt. */}
    </div>
  );
};

export default MyReview;
