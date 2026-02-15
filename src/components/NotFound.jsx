import React from "react";
import notFoundImage from "../../public/assets/404-error-not-found-badge.png";

const NotFound = () => {
  return (
    <div className="text-center">
      <img
        src={notFoundImage}
        alt="404"
        style={{ width: "400px" }}
      />
      <h2>404 - Page Not Found</h2>
    </div>
  );
};

export default NotFound;