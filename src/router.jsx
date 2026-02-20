import React, { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./RootLayout";

const Events = lazy(() => import("./components/Events"));
const EventDetails = lazy(() => import("./components/EventDetails"));
const NotFound = lazy(() => import("./components/NotFound"));
const AddEvent = lazy(() => import("./components/AddEvent"));
const UpdateEvent = lazy(() => import("./components/UpdateEvent"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <Events /> },
      { path: "/event/:name", element: <EventDetails /> },
      { path: "*", element: <NotFound /> },
      { path: "/add", element: <AddEvent /> },
      { path: "/update/:id", element: <UpdateEvent /> },
      { index: true, element: <Events /> }
       
    ]
  }
]);

export default router;