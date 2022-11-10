import React, { useEffect, useState } from "react";
import spinner from "../images/spinner.svg";
import "../styles/Services.css";
import Service from "./Service";

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://astute-photography-server.vercel.app/services")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setServices(data);
        setLoading(false);
      });

    document.title = "Services || astute photography";
  }, []);

  return (
    <div className="container">
      {loading ? (
        <img className="spinner" src={spinner} alt="spinner" />
      ) : (
        <div className="servicesWrapper">
          {services.map((service) => {
            return <Service key={service._id} service={service}></Service>;
          })}
        </div>
      )}
    </div>
  );
};

export default Services;
