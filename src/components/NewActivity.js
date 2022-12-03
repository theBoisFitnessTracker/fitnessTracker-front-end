import React, { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { getAllActivities } from '../utilities/activities.js';

const NewActivity = ({flag}) => {
    const { activitiesArr : [activities, setActivities] } = useOutletContext()
    const [newActivityTitle, setNewActivityTitle] = useState([])
    const [newActivityDesc, setNewActivityDesc] = useState([])
    const navigate = useNavigate()

    async function createNewActivityPosts(event) {
        event.preventDefault()
        try {
            if (!localStorage.getItem("token")) navigate('/login')
            const response = await fetch(`http://fitnesstrac-kr.herokuapp.com/api/activities`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    name: newActivityTitle,
                    description: newActivityDesc
                })
            })
            
            const newActivity = await response.json()
            console.log(newActivity)
            getAllActivities(setActivities)
            flag(false)
        } catch (error) {
            console.log(error)
        }
    }
        
    const updateTitle = (event) => setNewActivityTitle(event.target.value)
    const updateDesc = (event) => setNewActivityDesc(event.target.value)


    return(
        <form onSubmit={createNewActivityPosts}>
            <h2>Create a New Activity</h2>
            <br/>
            <label>Title:</label>
            <br/>
            <input placeholder='Enter Title...' type="text" value={newActivityTitle} onChange={updateTitle}></input>
            <br/><br/>
            <label>Description:</label>
            <br/>
            <input placeholder='Enter Description...' type="text" value={newActivityDesc} onChange={updateDesc}></input>
            <br/><br/>
            <button type="submit">Submit New Activity</button>
        </form>
    )
}
    


export default NewActivity;
