import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NewActivity = () => {
    const [newActivity, setNewActivity] = useState([])
    const [newActivityTitle, setNewActivityTitle] = useState([])
    const [newActivityDesc, setNewActivityDesc] = useState([])
    const navigate = useNavigate()

    
        async function createNewActivityPosts(event) {
            event.preventDefault()
            try {
                if (!localStorage.getItem("token")) {
                    navigate('/login')
                    return;
                }
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
                const data = await response.json()
                console.log(data)
                setNewActivity([...newActivity, data.name])

                navigate("/activities")
                
            } catch (error) {
                console.log(error)
            }
        
        
        }
        
        function updateTitle(event) {
            setNewActivityTitle(event.target.value)
        }
        function updateDesc(event) {
            setNewActivityDesc(event.target.value)
        }
        

        return (
            <div>
                <div>
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
                        <button type="Submit">Submit New Activity</button>
                    </form>
                </div>
            </div>
        )
}
    


export default NewActivity;
