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
      const activityData = await activityService.show(activityId);
      setActivity(activityData);
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
          {/* <p>
            {activity.author.username} logged activities on{' '}
            {new Date(activity.createdAt).toLocaleDateString()}
          </p> */}
        </header>
        {/* <p><strong>Morning:</strong> {activity.morning.activityName || 'No activity recorded'}</p>
        <p><strong>Afternoon:</strong> {activity.afternoon.activityName || 'No activity recorded'}</p>
        <p><strong>Evening:</strong> {activity.evening.activityName || 'No activity recorded'}</p>
        <p><strong>Night:</strong> {activity.night.activityName || 'No activity recorded'}</p> */}

        {/* <div className="actions">
          <Link to={`/activities/${activity._id}/edit`}><button>Edit</button></Link>
          <button onClick={handleDelete}>Delete</button>
        </div> */}
      </article>
    </main>
  );
};

export default ActivityDetails;

