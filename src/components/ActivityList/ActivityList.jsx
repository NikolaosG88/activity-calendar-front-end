//src/components/ActivityList/ActivityList.jsx

import { Link } from 'react-router-dom';

const ActivityList = (props) => {
  return (
    <main>
      {props.activities.map((activity) => (
        <Link key={activity._id} to={`/activities/${activity._id}`}>
          <article>
            <header>
              <h2>{activity.morning.activityName}</h2>
              <p>
                {activity.author?.username || 'Unknown User'} logged on 
                {new Date(activity.createdAt).toLocaleDateString()}
              </p>
            </header>
            <p>{activity.text}</p>
          </article>
        </Link>
      ))}
    </main>
  );
};

export default ActivityList;









