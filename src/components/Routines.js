import { useOutletContext } from "react-router-dom";
import SingleRoutine from './SingleRoutine.js'

const Routines = () => {
  const { routinesArr: [routines, setRoutines] } = useOutletContext();

  return (
    <>
      {routines && !!routines.length ? routines.map((routine, index) => {
        return (
          <div key={index}>
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
      }): (
        <div>No routines</div>
      )}
    </>
  );
};

export default Routines;
