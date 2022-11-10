import React, { useContext, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AiOutlineGoogle } from "react-icons/ai";
import { BsEyeSlashFill, BsFillEyeFill } from "react-icons/bs";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Context } from "../Context/CreateContext";
import "../styles/Login.css";

const Login = () => {
  const [eye, setEye] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const { logInUser } = useContext(Context);

  const handleEye = () => {
    setEye(!eye);
  };

  const handleLogin = (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    logInUser(email, password)
      .then((userCredential) => {
        notify("Login Successfull!");
        fetch("http://localhost:5000/jwt", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            email: userCredential.user.email,
          }),
        })
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            localStorage.setItem("token", data.token);
          });
        navigate(from, { replace: true });
      })
      .catch((err) => {
        notifyErr(err.message);
      });
  };

  const notify = (text) => toast(text);
  const notifyErr = (text) => toast.error(text);

  return (
    <div className="login-page">
      <div className="loginFormWrapper">
        <h1 className="login">Login Page</h1>

        <div className="social-login">
          <FaFacebookF className="icon" />
          <AiOutlineGoogle className="icon" />
          <FaLinkedinIn className="icon" />
        </div>

        <p className="use-in">or use your mail for login</p>
        <form className="registrationForm" onSubmit={handleLogin}>
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
          <button className="sign-in" type="submit">
            sign In
          </button>
          <p className="need-acc">
            Need Account? <Link to={"/registration"}>Registration</Link>
          </p>
        </form>
        <Toaster position="top-right" reverseOrder={false} />
      </div>
    </div>
  );
};

export default Login;
