// front-end/src/components/activitydetails/activitydetails

import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as activityService from '../../services/activityService';

const ActivityDetails = ({ handleDeleteActivity }) => {
  const { activityId } = useParams();
  const [activity, setActivity] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const activityData = await activityService.show(activityId);
        if (activityData) {
          setActivity(activityData);
        } else {
          console.error('Activity not found.');
        }
      } catch (error) {
        console.error('Failed to fetch activity:', error);
      }
    };
    fetchActivity();
  }, [activityId]);

  const handleDelete = async () => {
    await handleDeleteActivity(activityId);
    navigate('/activities');
  };

  if (!activity) return <p>Loading...</p>;

  return (
    <main>
      <article>
        <header>
          <h2>Activity Details</h2>
          <p>
            {activity.author?.username || 'Unknown User'} logged activities on{' '}
            {activity.createdAt ? new Date(activity.createdAt).toLocaleDateString() : 'Unknown Date'}
          </p>
        </header>
        <p><strong>Morning:</strong> {activity.morning?.activityName || 'No activity recorded'} ({activity.morning?.activityType?.activityType || 'No type'})</p>
        <p><strong>Afternoon:</strong> {activity.afternoon?.activityName || 'No activity recorded'} ({activity.afternoon?.activityType?.activityType || 'No type'})</p>
        <p><strong>Evening:</strong> {activity.evening?.activityName || 'No activity recorded'} ({activity.evening?.activityType?.activityType || 'No type'})</p>
        <p><strong>Night:</strong> {activity.night?.activityName || 'No activity recorded'} ({activity.night?.activityType?.activityType || 'No type'})</p>

        <div className="actions">
          <Link to={`/activities/${activity._id}/edit`}><button>Edit</button></Link>
          <button onClick={handleDelete}>Delete</button>
        </div>
      </article>
    </main>
  );
};

export default ActivityDetails;

