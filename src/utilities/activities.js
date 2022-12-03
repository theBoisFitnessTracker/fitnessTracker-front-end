async function getAllActivities(setActivities) {
  try {
    const data = await fetch(
      "http://fitnesstrac-kr.herokuapp.com/api/activities",
      {headers: {"Content-Type": "application/json"}}
    );
    const activities = await data.json();
    setActivities(activities);
    console.log(activities);
  } catch (error) {
    console.error(error.detail);
  }
}

export {getAllActivities}