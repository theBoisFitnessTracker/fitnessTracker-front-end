import React, {useState} from 'react';
import { useNavigate, useOutletContext, useParams} from 'react-router-dom';
import DeleteRoutine from './DeleteRoutine';

const RoutineEdit = () => {
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [routines, setRoutines] = useState([]);
  const {id} = useParams();
  const navigate = useNavigate();

  // useEffect(() => {
  //   const filteredRoutines = routines.filter((singleRoutine) => {
  //     return id == singleRoutine.id
  //   });
  //   console.log(filteredRoutines, filteredRoutines);
  //   setRoutine(filteredRoutines[0]);
  //   console.log(routines)
  // }, []);


  async function submitRoutineEdit (event) {
    event.preventDefault();
    try {
      const response = await fetch (`https://fitnesstrac-kr.herokuapp.com/api/routines/${id}`, 
      {
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
        },
        method: "PATCH",
        body: JSON.stringify({
          name,
          goal
        })
      })
      const newResponse = await fetch ('http://fitnesstrac-kr.herokuapp.com/api/routines')
      const newData = await newResponse.json();
      console.log(newData)
      setRoutines(newData);
      navigate('/routines');
    } catch (error) {
      console.log(error);
    }
  }

  function editName (event) {
    setName(event.target.value)
    console.log(event.target.value)
  }

  function editGoal (event) {
    setGoal (event.target.value)
    console.log(event.target.value)
  }

  function editIsPublic (event) {
    setIsPublic (event.target.checked)
    console.log('isPublic:', isPublic)
    console.log('isChecked:', event.target.checked)
    console.log('!isChecked:', !event.target.checked)
  }

  return (
    <div>
      RoutineEdit Form:
      <form onSubmit={submitRoutineEdit}>
        <label>Routine Name:</label>
        <br />
        <input onChange={editName} value={name} type='text'></input>
        <br />
        <label>Goal:</label>
        <br />
        <input onChange={editGoal} value={goal} type='text'></input>
        <br />
        <label>Make Public:</label> 
        <input onChange={editIsPublic} value={isPublic} type="checkbox"></input>
        <br />        
        <button type="submit">Update Routine</button>
        <br /><br />
        <DeleteRoutine />

      </form>
    </div>
  )
}

export default RoutineEdit;