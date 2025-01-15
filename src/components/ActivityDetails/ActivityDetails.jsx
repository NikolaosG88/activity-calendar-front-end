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
        </header>
      </article>
    </main>
  );
};

export default ActivityDetails;

