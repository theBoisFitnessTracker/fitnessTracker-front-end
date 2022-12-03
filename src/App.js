import React, {useState, useEffect} from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { getAllActivities } from './utilities/activities'
import { getRoutines } from "./utilities/routines";
import { fetchProfileData } from "./utilities/profile";

const App = () => {
  const [profile, setProfile] = useState({})
  const [activities, setActivities] = useState([]);
  const [routines, setRoutines] = useState([]);
  const [personalRoutines, setPersonalRoutines] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    getAllActivities(setActivities);
    getRoutines(setRoutines);
  }, []);

  useEffect(() => {
    isLoggedIn ? fetchProfileData(setProfile) : null
  }, [isLoggedIn])

  const contextObj = {
    activitiesArr: [activities, setActivities],
    routinesArr: [routines, setRoutines],
    profileArr: [profile, setProfile],
    isLoggedInState: [isLoggedIn, setIsLoggedIn],
    personalRoutinesState: [personalRoutines, setPersonalRoutines]
  };

  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn}/>
      <Outlet context={contextObj} />
    </div>
  );
};

export default App;
