import { useOutletContext, useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

const DeleteRoutine = ({ routine }) => {
  const navigate = useNavigate();
  const { routinesArr } = useOutletContext();
  const [routines, setRoutines] = routinesArr;

  const { id } = useParams();

  async function deleteThisRoutine() {
    try {
      const response = await fetch(
        `https://fitnesstrac-kr.herokuapp.com/api/routines/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const deleteData = await response.json();
      console.log("delete data: ", deleteData);
      const newResponse = await fetch(
        "https://fitnesstrac-kr.herokuapp.com/api/routines"
      );
      const newRoutines = await newResponse.json();
      setRoutines(newRoutines);
      navigate("/routines");
    } catch (error) {
      console.log("error:", error);
    }
  }

  return (
    <div>
      <button
        onClick={(event) => {
          event.preventDefault();
          deleteThisRoutine(id);
        }}
      >
        Delete Routine
      </button>
    </div>
  );
};

export default DeleteRoutine;
