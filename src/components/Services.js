import React, { useEffect, useState } from "react";
import "../styles/Services.css";
import Service from "./Service";

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/services")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setServices(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container">
      {loading ? (
        <h1>Loading...</h1>
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
