//src/components/ActivityList/ActivityList.jsx
import { Link } from 'react-router-dom';

const ActivityList = (props) => {
  return (
    <main>
      {props.activities.length === 0 ? (
        <p>No activities found.</p>
      ) : (
        props.activities.map((activity) => (
          <Link key={activity._id} to={`/activities/${activity._id}`}>
            <article>
              <header>
                <h2>Activity Entry for {new Date(activity.createdAt).toLocaleDateString()}</h2>
                <p>
                  {activity.author ? activity.author.username || "User without username" : "Unknown Author"}
                </p>
              </header>
              <ul>
  {["morning", "afternoon", "evening", "night"].map((timeOfDay) => (
    <li key={timeOfDay}>
      <strong>{timeOfDay.charAt(0).toUpperCase() + timeOfDay.slice(1)}:</strong>{" "}
      {Array.isArray(activity.activities[timeOfDay]?.activityTypes) &&
      activity.activities[timeOfDay].activityTypes.length ? (
        <ul>
          {activity.activities[timeOfDay].activityTypes.map((type, index) => (
            <li key={index}>{type.activityName || "No activity name"}</li>
          ))}
        </ul>
      ) : (
        "No activities logged"
      )}
    </li>
  ))}
</ul>
            </article>
          </Link>
        ))
      )}
    </main>
  );
};

export default ActivityList;

