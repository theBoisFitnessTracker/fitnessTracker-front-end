import React, { useState, useEffect } from "react";
import {
  useParams,
  Link,
  useOutletContext,
} from "react-router-dom";

const ActivityDetails = () => {
  const { activitesArr: [activities, setActivities] } = useOutletContext();
  const [activity, setActivity] = useState({});
  const { id } = useParams();

  useEffect(() => {
    if (activities.length) {
      const foundActvitity = activities.find(activity => id == activity.id);
      setActivity(foundActvitity);
    }
  }, []);

  activity ? (
      <div>
        <div>
          <p>{activity.name}</p>
          <br />
          <p> {activity.description}</p>
        </div>
        <div>
          <Link to="editactivity">Edit</Link>
        </div>
      </div>
    ) : (
      <div> 
        <h1>No Activities</h1>
      </div>
    )
  }

export default ActivityDetails;
