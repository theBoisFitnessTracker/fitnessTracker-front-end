import React, { useState, useEffect } from "react";
import { useOutletContext, Link } from "react-router-dom";

const Routines = () => {
  console.log("Routines should be displaying now...");
  const { routinesArr } = useOutletContext();
  const [routines, setRoutines] = routinesArr;

  return (
    <>
      <div>
        <p>Create A New Routine</p>
        <Link to="/login">Login First!</Link>
      </div>
      <br />
      <br />
      {routines && !!routines.length ? (
        routines.map((routine, index) => {
          return (
            <div key={index}>
              <div style={postStyle}>
                <h3>{routine.creatorName}</h3>
                <br />
                <p>{routine.name}</p>
                <p>{routine.goal}</p>
                {/* <div>{routine.activities}</div> */}
              </div>
            </div>
          );
        })
      ) : (
        <div>No routines</div>
      )}
    </>
  );
};

export default Routines;
