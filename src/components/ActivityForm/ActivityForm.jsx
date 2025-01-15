//src/components/ActivityForm/ActivityForm.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as activityService from '../../services/activityService';

const ActivityForm = (props) => {
  const activityOptions = {
    morning: ['Morning hygiene', 'Breakfast', 'Leave to work', 'Work from home'],
    afternoon: ['Lunchbreak', 'Finish work', 'Return home', 'Go groceries'],
    evening: ['Family Time', 'Go for walk', 'Exercise', 'Help the community'],
    night: ['Prepare for the morning', 'Read a book', 'Go clubbing', 'Meditate'],
  };

  const activityTypes = ['Hard', 'Easy', 'Creative', 'Routine', 'Detrimental'];

  // const [formData, setFormData] = useState({
  //   date: '',
  //   activities: {
  //     morning: [],
  //     afternoon: [],
  //     evening: [],
  //     night: [],
  //   },
  // });

  const [formData, setFormData] = useState({
    morning: { activityName: '', activityType: '' },
    afternoon: { activityName: '', activityType: '' },
    evening: { activityName: '', activityType: '' },
    night: { activityName: '', activityType: '' },
  });

  const { activityId } = useParams();
  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchActivity = async () => {
  //     if (activityId) {
  //       const activityData = await activityService.show(activityId);
  //       setFormData({
  //         date: activityData?.date || '',
  //         activities: {
  //           morning: activityData?.activities?.morning || [],
  //           afternoon: activityData?.activities?.afternoon || [],
  //           evening: activityData?.activities?.evening || [],
  //           night: activityData?.activities?.night || [],
  //         },
  //       });
  //     }
  //   };
  //   fetchActivity();
  // }, [activityId]);

  const handleNewActivityChange = (timeOfDay, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [timeOfDay]: {
        ...prev[timeOfDay],
        [field]: value,
      },
    }));
  };

  const handleAddActivity = (timeOfDay) => {
    const { activityName, activityType } = formData[timeOfDay];
    if (activityName && activityType) {
      // setFormData((prevFormData) => ({
      //   ...prevFormData,
      //   activities: {
      //     ...prevFormData.activities,
      //     [timeOfDay]: [
      //       ...prevFormData.activities[timeOfDay],
      //       { activityName, activityType, key: `${activityName}-${timeOfDay}-${Date.now()}` },
      //     ],
      //   },
      // }));
      setFormData((prev) => ({
        ...prev,
        [timeOfDay]: { activityName: '', activityType: '' },
      }));
    }
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if (activityId) {
      await props.handleUpdateActivity(activityId, formData);
    } else {
      await props.handleAddActivity(formData);
    }
    navigate('/activities');
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <h1>{activityId ? 'Edit Activity Entry' : 'New Activity Entry'}</h1>
        {/* <label htmlFor="date-input">Date:</label>
        <input
          required
          type="date"
          id="date-input"
          name="date"
          value={formData.date || ''}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        /> */}

        {Object.keys(activityOptions).map((timeOfDay) => (
          <div key={timeOfDay}>
            <h3>{timeOfDay.charAt(0).toUpperCase() + timeOfDay.slice(1)}</h3>
            <ul>
              {/* {formData.activities[timeOfDay].map((activity) => (
                <li key={activity.key || `${activity.activityName}-${Date.now()}`}>
                  {activity.activityName} ({activity.activityType})
                </li>
              ))} */}
            </ul>
            <label htmlFor={`${timeOfDay}-activityName`}>New Entry:</label>
            <select
              id={`${timeOfDay}-activityName`}
              value={formData[timeOfDay].activityName}
              onChange={(e) => handleNewActivityChange(timeOfDay, 'activityName', e.target.value)}
            >
              <option value="">-- Select an activity --</option>
              {activityOptions[timeOfDay].map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Custom activity"
              value={formData[timeOfDay].activityName}
              onChange={(e) => handleNewActivityChange(timeOfDay, 'activityName', e.target.value)}
            />
            <label htmlFor={`${timeOfDay}-activityType`}>Activity Type:</label>
            <select
              id={`${timeOfDay}-activityType`}
              value={formData[timeOfDay].activityType}
              onChange={(e) => handleNewActivityChange(timeOfDay, 'activityType', e.target.value)}
            >
              <option value="">-- Select activity type --</option>
              {activityTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <button type="button" onClick={() => handleAddActivity(timeOfDay)}>
              Add {timeOfDay.charAt(0).toUpperCase() + timeOfDay.slice(1)} Activity
            </button>
          </div>
        ))}

        <button type="submit">SUBMIT</button>
      </form>
    </main>
  );
};

export default ActivityForm;


