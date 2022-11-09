import React from "react";
import { AiOutlineGoogle } from "react-icons/ai";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <div className="footerWrapper">
      <div className="container">
        <div className="footerContentWrapper">
          <div className="footerLogo">
            <h1 className="footer_logo">
              <img className="logoImg" src={logo} alt="" />
            </h1>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
            asperiores cum sint!
          </div>

          <div className="navigation">
            <h2>Nagivation</h2>
            <ul>
              <li>
                <Link>Blog</Link>
              </li>
              <li>
                <Link>Services</Link>
              </li>
              <li>
                <Link>My review</Link>
              </li>
              <li>
                <Link>Add Service</Link>
              </li>
            </ul>
          </div>

          <div className="info">
            <h2>Information</h2>
            <ul>
              <li>+123456789</li>
              <li>rakibdev53@gmail.com</li>
              <li>890, Jessore, Bangladesh</li>
            </ul>
          </div>

          <div className="support">
            <h2>Support time</h2>
            <ul>
              <li>Mon - Thu 9:00- 21:00</li>
              <li>Fri - Thu 8:00- 21:00</li>
              <li>Mon - Sat 9:30- 15:00</li>
            </ul>
          </div>
        </div>

        <div className="copyrightArea">
          <p className="copyrightText">
            Copyright &copy; All Right Reserve || Block is made by Rakib Hossen
          </p>
        </div>

        <div className="social-login">
          <FaFacebookF className="icon" />
          <AiOutlineGoogle className="icon" />
          <FaLinkedinIn className="icon" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
