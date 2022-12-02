import React, { useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";

const EditActivity = () => {
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const { activitesArr } = useOutletContext();
  const [activities, setActivities] = activitiesArr;
  const [activity, setActivity] = useState({});
  const [profileData, setProfileData] = useState([]);
  const { id } = useParams();
  const [desc, setEditDesc] = useState("");

  const navigate = useNavigate();

  async function createEdit(event) {
    event.preventDefault();
    try {
      const response = await fetch(
        `http://fitnesstrac-kr.herokuapp.com/api/activities/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          method: "PATCH",
          body: JSON.stringify({
            post: {
              name: name,
              description: desc,
            },
          }),
        }
      );

      const editedActivity = await response.json();
      if (editedActivity) {
        setActivity(editedActivity);
        const editActivities = await fetch(
          "http://fitnesstrac-kr.herokuapp.com/api/activities"
        );
        const translatedEditActivities = await editActivities.json();

        setActivities(translatedEditActivities);

        navigate("/profile");
      } else {
        setError("Could not edit activty.");
      }
    } catch (error) {
      console.log(error);
    }
  }

  function editName(event) {
    setName(event.target.value);
  }
  function editDesc(event) {
    setEditDesc(event.target.value);
  }

  return (
    <div id="editPage">
      <p id="title">Edit Page</p>
      <form onSubmit={createEdit}>
        <label>Edit Name</label>
        <input type="text" value={name} onChange={editName}></input>
        <br />
        <label>Edit Description</label>
        <input type="text" value={desc} onChange={editDesc}></input>
        <br />
        <button type="Submit">Submit New Activity</button>
      </form>
    </div>
  );
};

export default EditActivity;
