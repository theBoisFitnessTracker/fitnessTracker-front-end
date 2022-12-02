import React from "react";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <div>
      <div>
        <h1>Welcome to Fitness-Trackr!</h1>
        <h3>
          We have plenty of fitness routines for you to enjoy, all made by our
          users.
        </h3>
        <br />
        <br />
        <h3>
          Not registered yet? You can register <Link to="register">here!</Link>
        </h3>
      </div>
    </div>
  );
};

export default Homepage;
