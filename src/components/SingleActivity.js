
export default ({activity}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        paddingTop: "20px",
      }}
    >
      <div id="activity" key={activity.id} >
        <p>{activity.creatorName}</p>
        <p>{activity.name}</p>
        <p>{activity.description}</p>
        <Link to={`/activities/${activity.id}`}>Check It Out!</Link>
      </div>
    </div>
    )}
