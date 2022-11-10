import React from "react";
import { createBrowserRouter } from "react-router-dom";
import ServiceDetails from "../components/ServiceDetails";
import Services from "../components/Services";
import Main from "../layouts/Main";
import AddService from "../pages/AddService";
import EditReview from "../pages/EditReview";
import Home from "../pages/Home";
import Login from "../pages/Login";
import MyReview from "../pages/MyReview";
import Registration from "../pages/Registration";
import PrivateRoute from "./PrivateRoute/PrivateRoute";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/services",
        element: <Services></Services>,
      },
      {
        path: "/myreviews",
        element: (
          <PrivateRoute>
            <MyReview></MyReview>
          </PrivateRoute>
        ),
      },
      {
        path: "/addservice",
        element: (
          <PrivateRoute>
            <AddService></AddService>
          </PrivateRoute>
        ),
      },
      {
        path: "/signin",
        element: <Login />,
      },
      {
        path: "/registration",
        element: <Registration></Registration>,
      },
      {
        path: "/serviceDetails/:serviceId",
        element: <ServiceDetails></ServiceDetails>,
      },
      {
        path: "/myreviews/:id",
        element: (
          <PrivateRoute>
            <EditReview></EditReview>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default Routes;
