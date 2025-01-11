import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import * as activityService from '../../services/activityService';

const ActivityDetails = () => {
  const { activityId } = useParams();
  const navigate = useNavigate();
  const [activityData, setActivityData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchActivityDetails = async () => {
      try {
        console.log(`Fetching details for activity ID: ${activityId}`);
        const data = await activityService.show(activityId);
        if (!data) {
          setError('No data found for this activity.');
        } else {
          setActivityData(data);
        }
      } catch (err) {
        setError('Error fetching activity details.');
        console.error('Error:', err);
      }
    };

    if (activityId) fetchActivityDetails();
  }, [activityId]);

  if (error) {
    return (
      <main>
        <h1>Error</h1>
        <p>{error}</p>
        <Link to="/">Go Back to Dashboard</Link>
      </main>
    );
  }

  if (!activityData) {
    return (
      <main>
        <h1>Loading...</h1>
        <p>Fetching activity details. Please wait.</p>
      </main>
    );
  }

  const handleEditClick = () => {
    navigate(`/activities/edit/${activityId}`);
  };

  return (
    <main>
      <h1>Activity Details for {activityData.date || 'Unknown Date'}</h1>
      <nav>
        <Link to="/">Go Back to Dashboard</Link>
        <Link to="/activities/new">Add New Activity</Link>
        <button onClick={handleEditClick}>Edit Activity</button>
      </nav>
      <div>
        <h2>Daily Activities</h2>
        {['morning', 'afternoon', 'evening', 'night'].map((time) => (
          <div key={time}>
            <h3>{`${time.charAt(0).toUpperCase() + time.slice(1)}`}</h3>
            {activityData[time]?.activityStack?.length > 0 ? (
              <ul>
                {activityData[time].activityStack.map((activity, idx) => (
                  <li key={idx}>
                    <strong>{activity.activityName || 'No Name Provided'}</strong> - {activity.type || 'No Type Specified'}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No activities recorded for this time period.</p>
            )}
          </div>
        ))}
      </div>
    </main>
  );
};

export default ActivityDetails;

