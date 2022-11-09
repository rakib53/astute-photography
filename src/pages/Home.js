import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import HomeServices from "../components/HomeServices";
import bannerPhoto from "../images/bannerimg.png";
import shape1 from "../images/shape-1.png";
import shape2 from "../images/shape-2.png";
import "../styles/Home.css";

const Home = () => {
  return (
    <div>
      <div className="bannerWrapper">
        <div className="container">
          <div className="banner">
            <div className="bannerContent">
              <h1 className="bannerHeading">
                Photography for all your product needs
              </h1>
              <p className="bannerTextPara">
                Discover my Beautiful Animals Images, and Create Your Great
                Stories Here! Give Your Projects the Quality They Deserve.
              </p>
            </div>
            <div className="bannerImagearea">
              <img src={bannerPhoto} alt="" />
            </div>
          </div>
        </div>

        <img className="shape1" src={shape1} alt="" />
        <img className="shape2" src={shape2} alt="" />
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
