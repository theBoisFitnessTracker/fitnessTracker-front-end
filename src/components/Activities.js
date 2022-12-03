import { useOutletContext, Link, useNavigate } from "react-router-dom";
import SingleActivity from './SingleActivity.js'
import NewActivity from "./NewActivity.js";

const ActivitiesPage = () => {
  const { activitesArr: [activites, setActivities] } = useOutletContext();
  const [isNewActivity , setIsNewActivity] = useState(false)
  // jeremy: { key: [const1, const2]} = obj (from context)

  const handleIsNewActivity = () => setIsNewActivity(!isNewActivity)

  return (
    <div>
      <div>
        <p id="activitiesList">Check Out These Workouts!</p>
        <p>Create Your Own Activities!</p>
        <button onClick={handleIsNewActivity}></button>
        {
          isNewActivity ? <NewActivity /> : null
        }
        <Link to="/login">Login to Create an Activity!</Link>
        <div id="activities">
          {
            activites && !!activites.length
              ? activites.map((activity, idx) => <SingleActivity activity={activity} key={idx}/>)
              : <p>No activities at this time!</p>
          }
        </div>
      </div>
    </div>
  );
};

export default ActivitiesPage;
