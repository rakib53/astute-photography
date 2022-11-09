import React, { useContext } from "react";
import toast, { Toaster } from "react-hot-toast";
import { CgClose } from "react-icons/cg";
import { FaSignInAlt, FaUser } from "react-icons/fa";
import { GoSignIn } from "react-icons/go";
import { HiOutlineMenu } from "react-icons/hi";
import { Link } from "react-router-dom";
import { Context } from "../Context/CreateContext";
// import logo from "../images/logo.jpeg";
import "../styles/Navbar.css";

const Navbar = () => {
  const { expandMenu, setExpandMenu, user, signOutUser } = useContext(Context);

  const expendMenu = () => {
    setExpandMenu(!expandMenu);
  };

  const handleSignOut = () => {
    signOutUser()
      .then((data) => {
        notify("logged out Successfully");
      })
      .catch((err) => {
        notifyErr(err.message);
      });
  };

  const notify = (text) => toast.success(text);
  const notifyErr = (text) => toast.error(text);

  return (
    <div className="navbarWrapper">
      <div className="menuWrapper">
        <div className="brand">
          <Link to={"/"} className="logo">
            {/* <img src={logo} alt="logo" /> */}
            Astute Photography
          </Link>
        </div>

        <nav className={`menu ${expandMenu ? "activeMenu" : "menu"}`}>
          <li className="listItem">
            <Link to={"/"} className="linkItem" onClick={expendMenu}>
              home
            </Link>
          </li>
          <li className="listItem">
            <Link to={"/services"} className="linkItem" onClick={expendMenu}>
              services
            </Link>
          </li>
          <li className="listItem">
            <Link to={"/myreviews"} className="linkItem" onClick={expendMenu}>
              My review
            </Link>
          </li>
          <li className="listItem">
            <Link to={"/addservice"} className="linkItem" onClick={expendMenu}>
              add service
            </Link>
          </li>
        </nav>

        <div className={`profile ${expandMenu ? "activeProfile" : "profile"}`}>
          {user && user.uid ? (
            user?.photoURL ? (
              <img
                className="userProfilePic "
                src={user?.photoURL}
                alt="Profile"
              />
            ) : (
              <FaUser className="userProfile" />
            )
          ) : (
            ""
          )}

          {user?.uid ? (
            <FaSignInAlt className="signOut" onClick={handleSignOut} />
          ) : (
            <Link to={"signin"}>
              <GoSignIn className="signIn" />
            </Link>
          )}
        </div>

        <div onClick={expendMenu} className="expandMenuWrapper">
          {!expandMenu ? (
            <HiOutlineMenu className="expandBar" />
          ) : (
            <CgClose className="closeBar" />
          )}
        </div>
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default Navbar;
