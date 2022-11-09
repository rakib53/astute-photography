import React, { useEffect, useState } from "react";
import Service from "./Service";

const HomeServices = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/servicesLimit")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setServices(data);
      });
  }, []);

  return (
    <div className="servicesWrapper">
      {services.map((service) => {
        return <Service key={service._id} service={service}></Service>;
      })}
    </div>
  );
};

export default HomeServices;
