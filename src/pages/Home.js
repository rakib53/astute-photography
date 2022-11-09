import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import HomeServices from "../components/HomeServices";
import "../styles/Home.css";

const Home = () => {
  return (
    <div>
      <div className="banner">
        <div className="bannerContent">
          <h1>
            Discover my Beautiful Animals Images, and Create Your Great Stories
            Here! Give Your Projects the Quality They Deserve.
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
            possimus repudiandae architecto modi porro sed quisquam non quaerat
            ea totam distinctio sapiente recusandae, quibusdam blanditiis
            officia tenetur dicta nostrum quas!
          </p>
        </div>
      </div>
      <section className="serviceWrapperOnHomePage">
        <div className="container">
          <h2 className="servicesTitle">My Services</h2>
          <HomeServices></HomeServices>
          <Link className="seeAllService" to={"/services"}>
            See all services
          </Link>
        </div>
      </section>

      <Footer></Footer>
    </div>
  );
};

export default Home;
