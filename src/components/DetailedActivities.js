import React, { useState, useEffect } from "react";
import {
  useOutletContext as activitesArr,
  useParams,
  Link,
  useOutletContext,
} from "react-router-dom";

const ActivityDetails = () => {
  const { activitesArr } = useOutletContext();
  const [activities, setActivities] = activitesArr;
  const [activity, setActivity] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    if (activities.length) {
      const foundActvitity = activities.find((activity) => {
        return id == activity.id;
      });
      setActivity(foundActvitity);
    }
  }, []);

  if (activity.id) {
    return (
      <div>
        <div>
          <p>{activity.name}</p>
          <br />
          <p> {activity.description}</p>
        </div>
        <div>
          <Link to="editactivity">edit</Link>
        </div>
      </div>
    );
  }
};

export default ActivityDetails;
