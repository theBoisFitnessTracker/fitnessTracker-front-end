import React, { useState, useEffect } from "react";
import { useOutletContext, Link } from "react-router-dom";

const ActivitiesPage = () => {
  const { activitesArr } = useOutletContext();
  const [activites, setActivities] = activitesArr;

  return (
    <div>
      <div>
        <p id="activitiesList">Check Out These Workouts!</p>
        <p>Create Your Own Activities!</p>
        <Link to="/Login">Login to Create an Activity!</Link>
        <div id="activities">
          {activites && !!activites.length ? (
            activites.map((activity) => {
              return (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    paddingTop: "20px",
                  }}
                >
                  <div
                    style={postStyle}
                    id="indivActivityPost"
                    key={activity.id}
                  >
                    <p>{activity.creatorName}</p>
                    <p>{activity.name}</p>
                    <p>{activity.description}</p>
                    <Link to={`/activties/${activity._id}`}>Check It Out!</Link>
                  </div>
                </div>
              );
            })
          ) : (
            <p>No activities at this time!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivitiesPage;
