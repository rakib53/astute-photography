import React, { useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Context } from "../Context/CreateContext";
import spinner from "../images/spinner.svg";
import "../styles/ServiceDetails.css";
import Star from "./Star";

const ServiceDetails = () => {
  const [service, setService] = useState([]);
  const [reviews, setreviews] = useState([]);
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const { user } = useContext(Context);

  useEffect(() => {
    fetch(`https://astute-photography-server.vercel.app/services`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const matchService = data.filter((service) => {
          return service._id === serviceId;
        });
        setService(matchService);
      });
  }, [serviceId]);

  useEffect(() => {
    fetch("https://astute-photography-server.vercel.app/reviewsPublic")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const matchedReview = data.filter((match) => {
          return match.serviceId === serviceId;
        });
        setreviews(matchedReview);
      });

    document.title = "Service details || astute photography";
  }, [serviceId]);

  const createReview = (event) => {
    event.preventDefault();

    const reviewerName = user?.displayName;
    const reviewerEmail = user?.email;
    const reviewerPhoto = user?.photoURL
      ? user.photoURL
      : "https://i.ibb.co/dgfs1tm/User-font-awesome-svg.png";
    const review = event.target.review.value;
    const serviceId = service[0]._id;
    const serviceTitle = service[0]?.title;
    const rating = event.target.rating.value;
    const porductImage = service[0]?.imageURL;
    const date = new Date().toLocaleString();

    fetch("https://astute-photography-server.vercel.app/reviews", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        reviewerName,
        reviewerEmail,
        reviewerPhoto,
        review,
        serviceId,
        serviceTitle,
        rating,
        porductImage,
        date,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setreviews([data, ...reviews]);
        notify("Successfully added Review!");
        event.target.reset();
      })
      .catch((err) => {
        notifyErr(err.message);
      });
  };

  const handleSignInToReview = () => {
    navigate(from, { replace: true });
  };

  const notify = (text) => toast.success(text);
  const notifyErr = (text) => toast.error(text);

  return (
    <div className="serviceDetailsWrapper">
      <div className="serviceDetailsContentWraper">
        <div className="serviceDetailsContent">
          <PhotoProvider>
            <PhotoView src={service[0]?.imageURL}>
              {!service[0]?.imageURL ? (
                <img src={spinner} alt="spinner" className="spinner" />
              ) : (
                <img
                  className="imageDetails"
                  src={service[0]?.imageURL}
                  alt=""
                />
              )}
            </PhotoView>
          </PhotoProvider>
          <h2 className="serviceTitle">{service[0]?.title}</h2>
          <p className="descriptionDetails">{service[0]?.description}</p>
          <div className="serviceInfo">
            <p>Price: ${service[0]?.ImagePrice}</p>
            <p>Rating: {service[0]?.rating}</p>
          </div>
          <div className="serviceInfo">
            <p>Courtesy : {service[0]?.courtesy}</p>
            <p>Download: {service[0]?.download}</p>
          </div>
        </div>
      </div>

      <div className="reviewWrapper">
        {user && user?.uid ? (
          <form className="reviewerFrom" onSubmit={createReview}>
            <input
              className="nameField"
              type="number"
              max={5}
              placeholder="Rating out of 5"
              name="rating"
            />
            <textarea
              className="reviewFiled"
              name="review"
              placeholder="Write your wish..."
              required
            ></textarea>
            <button className="submitReview bg-black mb-5" type="submit">
              Add Review
            </button>
          </form>
        ) : (
          <h1 className="text-3xl font-medium my-4">
            Please login to add a review{" "}
            <Link
              className="text-orange-800 underline underline-offset-1"
              to={"/signin"}
              onClick={handleSignInToReview}
            >
              Login
            </Link>
          </h1>
        )}

        <div className="starCount">
          <p>Avarage Rating</p>
          <p>Total Review: {reviews.length}</p>
        </div>

        {reviews.length <= 0 ? (
          <h2 className="text-xl text-center bg-red-300 rounded mt-5 py-4">
            No Review Yet
          </h2>
        ) : (
          <>
            {reviews.map((review) => {
              return (
                <div className="review" key={review._id}>
                  <img
                    className="userImage"
                    src={review.reviewerPhoto}
                    alt=""
                  />
                  <div className="reviewInDetails">
                    <div className="reviewTitleRating">
                      <h3 className="reviewService">{review?.serviceTitle}</h3>
                      <p className="rating">
                        {review?.rating ? (
                          <Star star={review.rating}></Star>
                        ) : (
                          "Not Yet"
                        )}
                      </p>
                    </div>
                    <p className="author">Author: {review.reviewerName}</p>
                    <p className="reviewText">{review.review}</p>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>

      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default ServiceDetails;
