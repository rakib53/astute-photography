import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../Context/CreateContext";
import "../styles/ServiceDetails.css";
import Star from "./Star";

const ServiceDetails = () => {
  const [service, setService] = useState([]);
  const [reviews, setreviews] = useState([]);
  const { serviceId } = useParams();

  const { user } = useContext(Context);

  useEffect(() => {
    fetch(`http://localhost:5000/services`)
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
    fetch("http://localhost:5000/reviews")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const matchedReview = data.filter((match) => {
          return match.serviceId === serviceId;
        });
        setreviews(matchedReview);
      });
  }, [serviceId]);

  const createReview = (event) => {
    event.preventDefault();

    const reviewerName = user?.displayName;
    const reviewerEmail = user?.email;
    const reviewerPhoto = user?.photoURL
      ? user.photoURL
      : "https://i.ibb.co/r0dzFm6/user1.jpg";
    const review = event.target.review.value;
    const serviceId = service[0]._id;
    const serviceTitle = service[0]?.title;
    const rating = event.target.rating.value;
    const porductImage = service[0]?.imageURL;

    fetch("http://localhost:5000/reviews", {
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
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setreviews([data, ...reviews]);
        event.target.reset();
      });
  };

  return (
    <div className="serviceDetailsWrapper">
      <div className="serviceDetailsContentWraper">
        <div className="serviceDetailsContent">
          <img className="imageDetails" src={service[0]?.imageURL} alt="" />
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
            <button className="submitReview" type="submit">
              Add Review
            </button>
          </form>
        ) : (
          <h1>
            Please login to add a review <Link to={"/signin"}>Login</Link>
          </h1>
        )}

        <div className="starCount">
          <p>Avarage Rating</p>
          <p>Total Review: {reviews.length}</p>
        </div>
        {reviews.map((review) => {
          return (
            <div className="review" key={review._id}>
              <img className="userImage" src={review.reviewerPhoto} alt="" />
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
                <p className="reviewText">{review.review}</p>
                <p className="author">Author: {review.reviewerName}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ServiceDetails;
