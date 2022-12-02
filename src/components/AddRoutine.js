import React, { useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";

const NewRoutine = () => {
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const { routinesArr } = useOutletContext();
  const [routines, setRoutines] = routinesArr;
  const [routine, setRoutine] = useState({});
  const navigate = useNavigate();

  async function createNewRoutine(event) {
    event.preventDefault();
    try {
      if (!localStorage.getItem("token")) {
        navigate("/login");
      }
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
      const newResponse = await fetch(
        "https://fitnesstrac-kr.herokuapp.com/api/routines"
      );
      const newRoutines = await newResponse.json();
      setRoutines(newRoutines);
      if (newRoutine.id) {
        setRoutine(newRoutine);
        navigate("/routines");
      }
    } catch (error) {
      console.error(error.detail);
    }
  }
  function updateRoutineName(event) {
    setName(event.target.value);
  }
  function updateRoutineGoal(event) {
    setGoal(event.target.value);
  }
  function updateIsPublic(event) {
    setIsPublic(event.target.value);
  }
  return (
    <div>
      <div>
        <h2>Add New Routine:</h2>
        <form onSubmit={createNewRoutine}>
          <label>Routine Name: </label>
          <br />
          <input
            placeholder="Enter Routine Name..."
            onChange={updateRoutineName}
            value={name}
            type="text"
          ></input>
          <br />
          <br />
          <label>Routine Goal: </label>
          <br />
          <input
            placeholder="Enter Routine Goals..."
            onChange={updateRoutineGoal}
            value={goal}
            type="text"
          ></input>
          <br />
          <label>Public: </label>
          <input
            onChange={updateIsPublic}
            value={isPublic}
            type="checkbox"
          ></input>
          <br />
          <br />
          <button type="submit">Post Routine</button>
          <br />
        </form>
      </div>
    </div>
  );
};

export default NewRoutine;
