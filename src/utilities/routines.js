async function getPersonalRoutines(setPersonalRoutines, username) {
  try {
      const response = await fetch(`http://fitnesstrac-kr.herokuapp.com/api/users/${username}/routines`,
      {headers: {'Content-Type': 'application/json'}})
      const routines = await response.json();
      setPersonalRoutines(routines)
  } catch (error) {
      console.log(error)
  }
}
async function deleteRoutine({id, setRoutines, navigate}) {
  console.log(id)
  try {
      const deleteResponse = await fetch(`http://fitnesstrac-kr.herokuapp.com/api/routines/${id}`, {
          method: "DELETE",
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem("token")}`
          }
      })
      const deletedRoutine = await deleteResponse.json()
      console.log(deletedRoutine)
      await getRoutines(setRoutines)


  } catch (error) {
      console.log(error)
  }   navigate("/profile")
}

async function getRoutines(setRoutines) {
  try {
    const response = await fetch(
      "http://fitnesstrac-kr.herokuapp.com/api/routines",
      { headers: {"Content-Type": "application/json"} }
    );
    const routines = await response.json();
    console.log(routines);
    setRoutines(routines);
  } catch (error) {
    console.log(error);
  }
}

export { getPersonalRoutines, deleteRoutine, getRoutines }