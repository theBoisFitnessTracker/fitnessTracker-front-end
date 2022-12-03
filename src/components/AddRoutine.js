import React, { useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { getPersonalRoutines } from "../utilities/routines";

const NewRoutine = ({flag}) => {
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const {
    routinesArr: [routines, setRoutines],
    profileArr: [profile, setProfile],
    personalRoutinesState: [personalRoutines, setPersonalRoutines]
  } = useOutletContext();
  const [routine, setRoutine] = useState({});
  const navigate = useNavigate();
  if (!localStorage.getItem("token")) navigate("/login");

  async function createNewRoutine(event) {
    event.preventDefault();
    try {
      const response = await fetch(
        "http://fitnesstrac-kr.herokuapp.com/api/routines",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            name,
            goal,
            isPublic,
          }),
        }
      );
      const newRoutine = await response.json();
      console.log(newRoutine);

      const newResponse = await fetch("http://fitnesstrac-kr.herokuapp.com/api/routines");
      const newRoutines = await newResponse.json();
      setRoutines(newRoutines);
      setPersonalRoutines(profile.username)
      if (newRoutine.id) {
        setRoutine(newRoutine);
        flag(false)
      }
    } catch (error) {
      console.error(error.detail);
    }
  }

  const updateRoutineName = (event) => setName(event.target.value)
  const updateRoutineGoal = (event) => setGoal(event.target.value)
  const updateIsPublic = (event) => setIsPublic(!isPublic)

  return (
    <div>
      <h2>Add New Routine:</h2>
      <form onSubmit={createNewRoutine}>
        <label>Routine Name: </label>
        <br />
        <input
          placeholder="Enter Routine Name..."
          onChange={updateRoutineName}
          value={name}></input>
        <br />
        <br />
        <label>Routine Goal: </label>
        <br />
        <input
          placeholder="Enter Routine Goals..."
          onChange={updateRoutineGoal}
          value={goal}></input>
        <br />
        <label>Public: </label>
        <input
          onChange={updateIsPublic}
          value={isPublic}
          type="checkbox"></input>
        <br />
        <br />
        <button type="submit">Post Routine</button>
        <br />
      </form>
    </div>
  );
};

export default NewRoutine;
