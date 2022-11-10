import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import spinner from "../images/spinner.svg";

const EditReview = () => {
  const [matchEdit, setMatchEdit] = useState([]);
  const { id } = useParams();

  console.log(id);

  const handleEditSubmit = (event) => {
    event.preventDefault();

    const editedReview = event.target.editreview.value;
    const editedRating = event.target.editrating.value;

    fetch(`https://astute-photography-server.vercel.app/reviews/${id}`, {
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

  useEffect(() => {
    fetch(`https://astute-photography-server.vercel.app/reviews`, {
      headers: {
        authorization: `Bearrer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const matchEdit = data.filter((edit) => {
          return edit._id === id;
        });

        setMatchEdit(matchEdit);
      });

    document.title = "edit review || astute photography";
  }, [id]);

  const notify = (text) => toast(text);
  const notifyErr = (text) => toast.error(text);

  return (
    <div className="editReviewWrapper">
      <Toaster position="top-right" reverseOrder={false} />

      {matchEdit.length <= 0 ? (
        <img src={spinner} alt="" className="spinner" />
      ) : (
        <>
          <form className="reviewerFrom" onSubmit={handleEditSubmit}>
            <input
              className="nameField"
              type="number"
              max={5}
              placeholder="Rating out of 5"
              name="editrating"
              defaultValue={matchEdit[0]?.rating}
            />
            <textarea
              className="reviewFiled"
              name="editreview"
              placeholder="Write your wish..."
              defaultValue={matchEdit[0]?.review}
              required
            ></textarea>
            <div className="flex justify-center">
              <button
                className="submitReview text-white bg-slate-900"
                type="submit"
              >
                Update Review
              </button>
            </div>
          </form>
        </>
      )}

      <Link
        className="flex justify-center bg-slate-400 my-5 py-3"
        to={"/myreviews"}
      >
        See My Review
      </Link>
    </div>
  );
};

export default EditReview;
