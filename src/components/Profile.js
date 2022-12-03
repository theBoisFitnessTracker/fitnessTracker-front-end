import React, { useState, useEffect } from "react";
import { Link, useNavigate, useOutletContext} from "react-router-dom";
import { fetchProfileData } from "../utilities/profile.js";
import { getPersonalRoutines, getRoutines, deleteRoutine } from "../utilities/routines.js";
import AddRoutine from "./AddRoutine.js"
import NewActivity from './NewActivity.js'


const ProfilePage = () => {
    const [routine, setRoutine] = useState({})
    const [isRoutinesOpen, setIsRoutinesOpen] = useState(false)
    const [isNewActivity, setIsNewActivity] = useState(false)
    const [isNewRoutine, setIsNewRoutine] = useState(false)
    const {
        routinesArr: [routines, setRoutines],
        profileArr: [profile, setProfile],
        isLoggedInState: [isLoggedIn, setIsLoggedIn],
        personalRoutinesState: [personalRoutines, setPersonalRoutines]
    } = useOutletContext()
    const navigate = useNavigate()

    if (!localStorage.getItem("token")) navigate('/login')

    useEffect(() => {
        fetchProfileData(setProfile)
    }, []);

    useEffect(() => {
        if (profile.id) getPersonalRoutines(setPersonalRoutines, profile.username)
    }, [profile])

    const handleLogOut = () => (localStorage.removeItem("token"), navigate("/"))
    const handleOpenRoutines = () => setIsRoutinesOpen(!isRoutinesOpen) //if isRoutinesOpen == true !isRoutinesOpen == false
    const handleIsNewRoutine = () => setIsNewRoutine(!isNewRoutine)
    const handleIsNewActivity = () => setIsNewActivity(!isNewActivity)
    /* Sample Routine
    {
        "id": 2,
        "creatorId": 1,
        "isPublic": true,
        "name": "Chest Day",
        "goal": "To beef up the Chest and Triceps!",
        "creatorName": "albert",
        "activities": [
            {
                "id": 3,
                "name": "bench press",
                "description": "3 sets of 10. Lift a safe amount, but push yourself!",
                "duration": 8,
                "count": 10,
                "routineActivityId": 6,
                "routineId": 2
            },
            {
                "id": 4,
                "name": "Push Ups",
                "description": "Pretty sure you know what to do!",
                "duration": 7,
                "count": 10,
                "routineActivityId": 7,
                "routineId": 2
            }
        ]
    }
    */

    return (
        <div>
            <h1>Your Profile</h1>
            <h2>Your Routines</h2>
            {
                isRoutinesOpen ? (
                    <>
                        <a onClick={handleOpenRoutines}>Close Routines</a>
                        <div>
                            { !!personalRoutines.length ? personalRoutines.map((routine, idx) => {
                                return (
                                <div key={idx}>
                                    <p>{routine.name}</p>
                                    <ul>
                                        {
                                            routine.activities.map((activity, idx) => {
                                                return (
                                                    <li key={idx}>
                                                        <h3>{activity.name}</h3>
                                                        <p>Description: {activity.description}</p>
                                                        <p>Sets: {activity.duration}</p>
                                                        <p>Repetitions: {activity.count}</p>
                                                    </li>
                                                    
                                                )
                                            })
                                        }
                                    </ul>
                                    <Link to={`/routines/${routine.id}`}>Go To Routine</Link>
                                    <button onClick={(event) => {
                                                            event.preventDefault();
                                                            deleteRoutine({id: activity.id, navigate, setRoutines});
                                                        }}>Delete Routine</button>
                                    <p>{routine.goal}</p>
                                </div>
                                )}) : <p>You have not posted anything yet.</p>
                            }
                        </div>
                    </>) : <a onClick={handleOpenRoutines}>Open Routines</a>
            }
            { isNewActivity ? <NewActivity flag={setIsNewActivity}/> : <p onClick={handleIsNewActivity}>Create New Activity</p>}
            { isNewRoutine ? <AddRoutine flag={setIsNewRoutine}/> : <p onClick={handleIsNewRoutine}>Create New Routine</p>}
            <button onClick={handleLogOut}>Log Out</button>
        </div>
    )
}

export default ProfilePage;
