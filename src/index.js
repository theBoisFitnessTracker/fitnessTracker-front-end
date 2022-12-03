import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Homepage from "./components/Homepage";
import Errorpage from "./components/ErrorPage";
import Login from "./components/Login";
import Register from "./components/Register";
import Routines from "./components/Routines";
import Activities from "./components/Activities";
import Profile from "./components/Profile";
import EditActivity from "./components/EditActivity";
import NewActivity from "./components/NewActivity";
import NewRoutine from "./components/AddRoutine";
import ActivityDetails from "./components/DetailedActivities";
import SingleRoutine from "./components/SingleRoutine";

const root = createRoot(document.getElementById('app'))

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, //App is the root of where you want your pages to render
    errorElement: <Errorpage />,
    children: [
      {
        index: true, //Index set to true makes the app load the homepage by default
        element: <Homepage />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "routines",
        element: <Routines />,
      },
      {
        path:"routines/:routineId",
        element: <SingleRoutine />
      },
      {
        path: "activities",
        element: <Activities />,
        children: [
          {
            path: "activities/:activityId",
            element: <EditActivity />,
          },
          {
            path: "activities/:activityId",
            element: <ActivityDetails />,
          },
        ],
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "newactivity",
        element: <NewActivity />,
      },
      {
        path: "newroutine",
        element: <NewRoutine />,
      },
    ],
  },
]);

root.render(<RouterProvider router={router}/>);
