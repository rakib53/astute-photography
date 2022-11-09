import React, { useContext, useState } from "react";
import { AiOutlineGoogle } from "react-icons/ai";
import { BsEyeSlashFill, BsFillEyeFill } from "react-icons/bs";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../Context/CreateContext";
import SignUpImg from "../images/sign-up.png";
import "../styles/Registration.css";

const Registration = () => {
  const [eye, setEye] = useState(false);
  const navigate = useNavigate();

  const { user, addedUserName, LoginWithGoogle, createUser } =
    useContext(Context);

  const handleSubmit = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    createUser(email, password)
      .then((res) => {
        const user = res.user;
        console.log(user);
        navigate("/signin");
        addedUserName(name);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleGoogleLogin = () => {
    LoginWithGoogle()
      .then((data) => {
        const user = data.user;
        console.log(user);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEye = () => {
    setEye(!eye);
  };

  return (
    <div className="registration">
      <div className="welcome-back-text">
        <img className="regImage" src={SignUpImg} alt="" />
      </div>

      <div className="registration-form">
        <div className="registrationWrapper">
          <h1 className="create-acc">Create Account</h1>
          <div className="social-login">
            <FaFacebookF className="icon" />
            <AiOutlineGoogle className="icon" onClick={handleGoogleLogin} />
            <FaLinkedinIn className="icon" />
          </div>

          <p className="use-in">or use your mail for registration</p>
          <form className="registrationForm" onSubmit={handleSubmit}>
            <input type="text" placeholder="Enter Name" name="name" />
            <input type="email" placeholder="Enter email" name="email" />
            <div className="inputFiled">
              <input
                type={eye ? "text" : "password"}
                placeholder="Enter password"
                name="password"
              />
              <div className="eye" onClick={handleEye}>
                {eye ? <BsEyeSlashFill /> : <BsFillEyeFill />}
              </div>
            </div>
            <button className="sign-up" type="submit">
              sign up
            </button>
            <p className="login-link">
              Have an Account? <Link to={"/signin"}>Sign in</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;
