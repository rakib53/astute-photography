import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useParams } from "react-router-dom";

const EditReview = () => {
  const { id } = useParams();

  const handleEditSubmit = (event) => {
    event.preventDefault();

    const editedReview = event.target.editreview.value;
    const editedRating = event.target.editrating.value;

    fetch(`http://localhost:5000/reviews/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ review: editedReview, rating: editedRating }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.modifiedCount > 0) {
          notify("SuccessFully Edited");
        } else {
          notifyErr("Something went wrong!");
        }
      });
  };

  const notify = (text) => toast(text);
  const notifyErr = (text) => toast.error(text);

  return (
    <div className="editReviewWrapper">
      <Toaster position="top-right" reverseOrder={false} />
      <form className="reviewerFrom" onSubmit={handleEditSubmit}>
        <input
          className="nameField"
          type="number"
          max={5}
          placeholder="Rating out of 5"
          name="editrating"
        />
        <textarea
          className="reviewFiled"
          name="editreview"
          placeholder="Write your wish..."
          required
        ></textarea>
        <div className="flex justify-center">
          <button className="submitReview text-slate-900" type="submit">
            Add Review
          </button>
        </div>
      </form>
      <Link to={"/myreviews"}>See My Review</Link>
    </div>
  );
};

export default EditReview;
