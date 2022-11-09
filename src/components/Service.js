import React from "react";
import { Link } from "react-router-dom";
import "../styles/Service.css";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

const Service = ({ service }) => {
  return (
    <div className="service">
      <PhotoProvider>
        <PhotoView src={service.imageURL}>
          <img className="serviceImage" src={service.imageURL} alt="" />
        </PhotoView>
      </PhotoProvider>

      <p className="title">{service.title}</p>
      <p className="description">
        {service.description.length >= 100
          ? service.description.slice(0, 100)
          : service.description}
        ...<Link to={`/serviceDetails/${service._id}`}>See more</Link>
      </p>
      <p>Price: ${service.ImagePrice}</p>
      <div className="serviceInfo">
        <p>Courtesy : {service.courtesy}</p>
        <p>Download: {service.download}</p>
      </div>
      <Link className="seeDetails" to={`/serviceDetails/${service._id}`}>
        See Details
      </Link>
    </div>
  );
};

export default Service;
