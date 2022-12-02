import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

const App = () => {
  const [activites, setActivities] = useState([]);
  const [routines, setRoutines] = useState([]);

  useEffect(() => {
    async function getAllActivities() {
      try {
        const data = await fetch(
          "http://fitnesstrac-kr.herokuapp.com/api/activities",
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const results = await data.json();
        setActivities(results);
        console.log(results);
      } catch (error) {
        console.error(error.detail);
      }
    }
    getAllActivities();
  }, []);

  useEffect(() => {
    async function postHandler() {
      try {
        const response = await fetch(
          "http://fitnesstrac-kr.herokuapp.com/api/routines",
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        console.log(data);
        setRoutines(data);
      } catch (error) {
        console.log(error);
      }
    }
    postHandler();
  }, []);

  const contextObj = {};
  return (
    <div>
      <Navbar />
      <Outlet context={contextObj} />
    </div>
  );
};

export default App;
