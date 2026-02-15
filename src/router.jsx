import React, { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./RootLayout";

const Events = lazy(() => import("./components/Events"));
const EventDetails = lazy(() => import("./components/EventDetails"));
const NotFound = lazy(() => import("./components/NotFound"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <Events /> },
      { path: "/event/:name", element: <EventDetails /> },
      { path: "*", element: <NotFound /> }
    ]
  }
]);

export default router;