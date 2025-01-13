// front-end/src/components/activitydetails/activitydetails

import { Link, useParams } from 'react-router-dom';
import { AuthedUserContext } from '../../App';
import { useState, useEffect, useContext } from 'react';
import * as activityService from '../../services/activityService';

const ActivityDetails = (props) => {
  const [activity, setActivity] = useState(null);
  const user = useContext(AuthedUserContext);
  const { activityId } = useParams(); // Get activity ID from URL params

  // Handle adding a new activity type
  const handleAddActivityType = async (typeFormData, timeOfDay) => {
    const newType = await activityService.createActivityType(activityId, timeOfDay, typeFormData);
    setActivity({
      ...activity,
      activities: {
        ...activity.activities,
        [timeOfDay]: {
          ...activity.activities[timeOfDay],
          activityTypes: [...activity.activities[timeOfDay].activityTypes, newType],
        },
      },
    });
  };

  // Handle deleting an activity type
  const handleDeleteActivityType = async (typeId, timeOfDay) => {
    await activityService.deleteActivityType(activityId, typeId, timeOfDay);
    setActivity({
      ...activity,
      activities: {
        ...activity.activities,
        [timeOfDay]: {
          ...activity.activities[timeOfDay],
          activityTypes: activity.activities[timeOfDay].activityTypes.filter((type) => type._id !== typeId),
        },
      },
    });
  };

  useEffect(() => {
    const fetchActivity = async () => {
      const activityData = await activityService.show(activityId);
      console.log('activityData:', activityData);
      setActivity(activityData);
    };
    fetchActivity();
  }, [activityId]);

  if (!activity) return <main>Loading...</main>;

  return (
    <main>
      <header>
        <h1>Activity Entry</h1>
        <p>
          {activity.author?.username || 'Anonymous'} logged on {new Date(activity.createdAt).toLocaleDateString()}
        </p>
        {activity.author._id === user._id && (
          <>
            <Link to={`/activities/${activityId}/edit`}>Edit</Link>
            <button onClick={() => props.handleDeleteActivity(activityId)}>Delete</button>
          </>
        )}
      </header>

      <section>
        <h2>Daily Activities</h2>
        {['morning', 'afternoon', 'evening', 'night'].map((timeOfDay) => (
          <article key={timeOfDay}>
            <header>
              <h3>{timeOfDay.charAt(0).toUpperCase() + timeOfDay.slice(1)}</h3>
              <p>
                <strong>Activity Name:</strong> {activity.activities[timeOfDay]?.activityName || 'No activity logged'}
              </p>
              <ul>
                {activity.activities[timeOfDay]?.activityTypes.length ? (
                  activity.activities[timeOfDay].activityTypes.map((type) => (
                    <li key={type._id}>
                      {type.type} by {type.author?.username || 'Anonymous'}
                      {type.author?._id === user._id && (
                        <>
                          <Link to={`/activities/${activityId}/types/${type._id}/edit`}>Edit</Link>
                          <button onClick={() => handleDeleteActivityType(type._id, timeOfDay)}>Delete</button>
                        </>
                      )}
                    </li>
                  ))
                ) : (
                  <p>No activity types added for this time.</p>
                )}
              </ul>
            </header>
          </article>
        ))}
      </section>
    </main>
  );
};

export default ActivityDetails;
