//src/components/ActivityList/ActivityList.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const ActivityList = (props) => {
  return (
    <main>
      {props.activities.map((activity) => (
        <Link key={activity._id} to={`/activities/${activity._id}`}>
          <article>
            <header>
              <h2>{activity.morning.activityName} ({activity.morning.activityType.activityType})</h2>
              <h2>{activity.afternoon.activityName} ({activity.afternoon.activityType.activityType})</h2>
              <h2>{activity.evening.activityName} ({activity.evening.activityType.activityType})</h2>
              <h2>{activity.night.activityName} ({activity.night.activityType.activityType})</h2>
              <p>
                {activity.author?.username || 'Unknown User'} logged on 
                {new Date(activity.createdAt).toLocaleDateString()}
              </p>
            </header>
          </article>
        </Link>
      ))}
    </main>
  );
};

export default ActivityList;









