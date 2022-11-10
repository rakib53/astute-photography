import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import HomeServices from "../components/HomeServices";
import photo1 from "../images/01.jpg";
import photo2 from "../images/02.jpg";
import bannerPhoto from "../images/bannerimg.png";
import brightImage from "../images/bright.png";
import cam from "../images/cam.png";
import myStory from "../images/mystory.jpg";
import shape1 from "../images/shape-1.png";
import shape2 from "../images/shape-2.png";
import spareImg from "../images/sqare.png";
import "../styles/Home.css";

const Home = () => {
  useEffect(() => {
    document.title = "home || astute photography";
  }, []);
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

      <section>
        <h2 className="servicesTitle">Create Your Masterpiece</h2>
        <div className="container">
          <div className="grid md:grid-cols-2 gap-5 mb-5">
            <div className="p-5">
              <img className="rounded" src={photo1} alt="" />
            </div>

            <div className="p-5">
              <img className="rounded" src={photo2} alt="" />
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <h2 className="servicesTitle">What I Do</h2>
          <div className="grid md:grid-cols-3 gap-5 my-20">
            <div className="flex flex-col justify-center items-center  p-4 rounded-lg">
              <img src={cam} alt="" className="camImg rounded-lg my-4" />
              <h3 className="text-2xl font-medium my-4">Photo Sessions</h3>
              <p className="text-center mb-5">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                ullamcorper elementum felis in bibendum. Proin vitae turpis
                ipsum.
              </p>
              <p className="">READ MORE</p>
            </div>

            <div className="flex flex-col justify-center items-center  p-4 rounded-lg">
              <img
                src={brightImage}
                alt=""
                className="camImg rounded-lg my-4"
              />
              <h3 className="text-2xl font-medium my-4">Occasions</h3>
              <p className="text-center mb-5">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                ullamcorper elementum felis in bibendum. Proin vitae turpis
                ipsum.
              </p>
              <p>READ MORE</p>
            </div>

            <div className="flex flex-col justify-center items-center  p-4 rounded-lg">
              <img src={spareImg} alt="" className="camImg rounded-lg my-6" />
              <h3 className="text-2xl font-medium my-3">Coverage</h3>
              <p className="text-center mb-3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                ullamcorper elementum felis in bibendum. Proin vitae turpis
                ipsum.
              </p>
              <p>READ MORE</p>
            </div>
          </div>
        </div>
      </section>

      <section className="myStr">
        <div className="grid md:grid-cols-2 items-center mb-28">
          <img src={myStory} alt="" className="w-full" />
          <div className="md:pl-20 my-10">
            <h2 className="text-center md:text-left text-5xl font-semibold mb-4 ">
              My Story
            </h2>
            <p className=" text-center md:text-left text-xl mb-3 font-medium">
              Creative Photography
            </p>
            <p className="text-center md:text-left leading-7 pr-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
              eget lectus eu ex ornare porta euismod a libero. Phasellus
              vehicula placerat enim at egestas. Aliquam suscipit felis in massa
              hendrerit tristique. In augue diam, pellentesque nec pulvinar in,
              sagittis ac nulla. Sed eu lectus vitae justo vehicula viverra.
              Aenean vel urna vitae massa consequat blandit. Quisque sodales
              sapien vitae malesuada ultricies. Curabitur pretium ipsum non nunc
              facilisis semper.
            </p>
            <Link
              to={"/services"}
              className="flex justify-center mx-auto md:mx-0 md:text-left text-center my-5 text-white rounded bg-slate-900 py-3 w-3/12"
            >
              view more
            </Link>
          </div>
        </div>
      </section>

      <Footer></Footer>
    </div>
  );
};

export default Home;
