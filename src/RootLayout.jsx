import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import NavigationBar from "./Components/Navbar";
import { Container, Spinner } from "react-bootstrap";

const RootLayout = () => {
  return (
    <>
      <NavigationBar />

      <Container className="mt-4">
        <Suspense fallback={<Spinner animation="border" />}>
          <Outlet />
        </Suspense>
      </Container>
    </>
  );
};

export default RootLayout;