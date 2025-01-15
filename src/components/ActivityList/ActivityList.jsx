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
              <h2>Activity Summary</h2>
              <p>
                {activity.author?.username || 'Unknown User'} logged activities on{' '}
                {activity.createdAt ? new Date(activity.createdAt).toLocaleDateString() : 'Unknown Date'}
              </p>
            </header>
            <p><strong>Morning:</strong> {activity.morning?.activityName || 'No activity recorded'} ({activity.morning?.activityType?.activityType || 'No type'})</p>
            <p><strong>Afternoon:</strong> {activity.afternoon?.activityName || 'No activity recorded'} ({activity.afternoon?.activityType?.activityType || 'No type'})</p>
            <p><strong>Evening:</strong> {activity.evening?.activityName || 'No activity recorded'} ({activity.evening?.activityType?.activityType || 'No type'})</p>
            <p><strong>Night:</strong> {activity.night?.activityName || 'No activity recorded'} ({activity.night?.activityType?.activityType || 'No type'})</p>
          </article>
        </Link>
      ))}
    </main>
  );
};

export default ActivityList;









