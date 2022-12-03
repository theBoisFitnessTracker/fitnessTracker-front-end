import { useState, useEffect } from 'react'
import { useParams, useOutletContext } from 'react-router-dom'

const SingleRoutine = () => {
  const { routineId } = useParams()
  const {routinesArr: [routines, setRoutines]} = useOutletContext()
  const [routine, setRoutine] = useState(routines.find(routine => routine.id == routineId))
  console.log("we'er in the SingleRoutine")


  return (
    <div>
      <h3 className="routine-cn">{routine.creatorName}</h3>
      <p className="routine-name">{routine.name}</p>
      <p className="routine-goal">{routine.goal}</p>
      {
        routine.activities.map((activity, idx) => {
          <div key={idx}>
            <h3 className="activity-name">{activity.name}</h3>
            <p className="activity-description">Description: {activity.description}</p>
            <p className="activtiy-duration">Sets: {activity.duration}</p>
            <p className="activity-count">Repetitions: {activity.count}</p>
          </div>
        })
      }
    </div>
    )
}

export default SingleRoutine