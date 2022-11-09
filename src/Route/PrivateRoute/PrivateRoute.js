import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Context } from "../../Context/CreateContext";

const PrivateRoute = ({ children }) => {
  const { user, loader } = useContext(Context);
  const location = useLocation();

  if (loader) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return (
      <Navigate to="/signin" state={{ from: location }} replace></Navigate>
    );
  }
  return children;
};

export default PrivateRoute;
