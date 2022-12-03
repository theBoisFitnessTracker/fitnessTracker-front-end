import { useOutletContext, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const DeleteRoutine = () => {
  const navigate = useNavigate();
  const { routinesArr: [routines, setRoutines] } = useOutletContext();
  const [routine, setRoutine] = useState({}) // set routine on function call
  const { id } = useParams();

  useEffect(() => {
    // set routine on first run of function
    // id <int>, routines <arr>
    
    // 1) find the routine
    // 2) setRoutine(routine that I find)
    /*1*/ const routine = routines.find(routine => routine.id == id) // one thing - the first thing it finds
    // const routineFiltered = routines.filter((routine) => {return routines.id == id}) // returns an array [ <everything that's true> ]
    /*2*/ setRoutine(routine)
  }, []) // empty dependency array means it will run on first render


  async function deleteThisRoutine() {
    try {
      const deleteResponse = await fetch(
        `http://fitnesstrac-kr.herokuapp.com/api/routines/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const deletedRoutine = await deleteResponse.json();
      console.log("delete data: ", deletedRoutine);
      const routineResponse = await fetch(
        "http://fitnesstrac-kr.herokuapp.com/api/routines"
      );
      const updatedRoutines = await routineResponse.json();
      setRoutines(updatedRoutines);
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
