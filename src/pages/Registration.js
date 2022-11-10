import React, { useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AiOutlineGoogle } from "react-icons/ai";
import { BsEyeSlashFill, BsFillEyeFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../Context/CreateContext";
import SignUpImg from "../images/sign-up.png";
import "../styles/Registration.css";

const Registration = () => {
  const [eye, setEye] = useState(false);
  const navigate = useNavigate();

  const { signOutUser, addedUserName, LoginWithGoogle, createUser } =
    useContext(Context);

  const handleSubmit = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const photoURl = event.target.photo.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    createUser(email, password)
      .then((res) => {
        navigate("/signin");
        addedUserName(name, photoURl);
        signOutUser()
          .then((res) => {})
          .catch((err) => {});
        notify("Successfully Registration!");
      })
      .catch((err) => {
        notifyErr(err.message);
      });
  };

  useEffect(() => {
    document.title = "Registration || astute photography";
  }, []);

  const handleGoogleLogin = () => {
    LoginWithGoogle()
      .then((data) => {
        fetch("https://astute-photography-server.vercel.app/jwt", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            email: data.user.email,
          }),
        })
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            localStorage.setItem("token", data.token);
          });

        navigate("/");
        notify("Login Successfully!");
      })
      .catch((err) => {
        notifyErr(err.message);
      });
  };

  const handleEye = () => {
    setEye(!eye);
  };

  const notify = (text) => toast.success(text);
  const notifyErr = (text) => toast.error(text);

  return (
    <div className="registration">
      <div className="welcome-back-text">
        <img className="regImage" src={SignUpImg} alt="" />
      </div>

      <div className="registration-form">
        <div className="registrationWrapper">
          <h1 className="create-acc">Create Account</h1>
          <div className="social-login">
            <AiOutlineGoogle
              className="icon border-2 border-gray-700 googleIcon"
              onClick={handleGoogleLogin}
            />
          </div>

          <p className="use-in">or use your mail for registration</p>
          <form className="registrationForm" onSubmit={handleSubmit}>
            <input type="text" placeholder="Enter Name" name="name" />
            <input type="text" placeholder="Enter Photo URL" name="photo" />
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
            <button className="sign-up bg-slate-900" type="submit">
              sign up
            </button>
            <p className="login-link">
              Have an Account?{" "}
              <Link className="underline underline-offset-1" to={"/signin"}>
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Registration;
