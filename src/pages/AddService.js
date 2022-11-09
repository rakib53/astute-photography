import React from "react";
import "../styles/AddService.css";

const AddService = () => {
  const handleService = (event) => {
    event.preventDefault();

    const serviceTitle = event.target.title.value;
    const serviceDesc = event.target.description.value;
    const imageURL = event.target.image.value;
    const courtesy = event.target.courtesy.value;
    const servicePrice = event.target.price.value;
    const serviceCategory = event.target.category.value;

    fetch("http://localhost:5000/services", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        title: serviceTitle,
        description: serviceDesc,
        imageURL: imageURL,
        courtesy: courtesy,
        download: "3422",
        rating: "5",
        category: serviceCategory,
        ImagePrice: servicePrice,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        alert("Service added Successfully");
      });
  };
  return (
    <div className="addServicesWrapper">
      <div className="addservice">
        <h1 className="addServiceTitle">Add a Service</h1>
        <form onSubmit={handleService}>
          <input
            className="serviceFiled"
            type="text"
            name="title"
            placeholder="Add Service Title"
            required
          />
          <input
            className="serviceFiled"
            type="text"
            name="courtesy"
            placeholder="Courtesy"
            required
          />
          <input
            className="serviceFiled"
            type="text"
            name="price"
            placeholder="price"
            required
          />
          <input
            className="serviceFiled"
            type="text"
            name="image"
            placeholder="Image URL"
            required
          />

          <input
            className="serviceFiled"
            type="text"
            name="category"
            placeholder="Service Category"
            required
          />

          <textarea
            className="serviceFiled serviceDesc"
            name="description"
            id=""
            placeholder="Add Service Description"
            required
          ></textarea>
          <div className="addServiceBtnWrapper">
            <button className="submitReview">Add Service</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddService;
