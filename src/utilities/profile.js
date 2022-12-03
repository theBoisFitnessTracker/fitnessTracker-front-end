async function fetchProfileData(setProfile) {
  try {
      const response = await fetch(
          `http://fitnesstrac-kr.herokuapp.com/api/users/me`, {
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${localStorage.getItem("token")}` 
              },
          }
      );
      const profile = await response.json();
      console.log("this is the profile id: ", profile)
      
      setProfile(profile)
  } catch (error) {
      console.log(error)
  }
}

export { fetchProfileData }