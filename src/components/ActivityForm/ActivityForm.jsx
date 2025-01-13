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

  const [formData, setFormData] = useState({
    date: '',
    activities: {
      morning: { activityTypes: [] },
      afternoon: { activityTypes: [] },
      evening: { activityTypes: [] },
      night: { activityTypes: [] },
    },
  });

  const [newActivity, setNewActivity] = useState({
    timeOfDay: 'morning',
    activityName: '',
    activityType: '',
  });

  const { activityId } = useParams(); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchActivity = async () => {
      const activityData = await activityService.show(activityId);
      setFormData({
        date: activityData?.date || '', 
        activities: {
          morning: activityData?.activities?.morning || { activityTypes: [] },
          afternoon: activityData?.activities?.afternoon || { activityTypes: [] },
          evening: activityData?.activities?.evening || { activityTypes: [] },
          night: activityData?.activities?.night || { activityTypes: [] },
        },
      });
    };
    if (activityId) fetchActivity();
  }, [activityId]);

  const handleDateChange = (e) => {
    setFormData({ ...formData, date: e.target.value });
  };

  const handleNewActivityChange = (field, value) => {
    setNewActivity((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddActivity = () => {
    const { timeOfDay, activityName, activityType } = newActivity;
    if (activityName && activityType) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        activities: {
          ...prevFormData.activities,
          [timeOfDay]: {
            ...prevFormData.activities[timeOfDay],
            activityTypes: [
              ...(prevFormData.activities[timeOfDay]?.activityTypes || []),
              { activityName, activityType },
            ],
          },
        },
      }));
      setNewActivity({ timeOfDay: 'morning', activityName: '', activityType: '' });
    }
  };

  const handleRemoveActivity = (timeOfDay, index) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      activities: {
        ...prevFormData.activities,
        [timeOfDay]: {
          ...prevFormData.activities[timeOfDay],
          activityTypes: prevFormData.activities[timeOfDay].activityTypes.filter((_, i) => i !== index),
        },
      },
    }));
  };

  const handleEditActivity = (timeOfDay, index) => {
    const activityToEdit = formData.activities[timeOfDay].activityTypes[index];
    setNewActivity({
      timeOfDay,
      activityName: activityToEdit.activityName,
      activityType: activityToEdit.activityType,
    });
    handleRemoveActivity(timeOfDay, index);
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
  
    const defaultActivities = {
      morning: formData.activities?.morning || { activityTypes: [] },
      afternoon: formData.activities?.afternoon || { activityTypes: [] },
      evening: formData.activities?.evening || { activityTypes: [] },
      night: formData.activities?.night || { activityTypes: [] },
    };
  
    const updatedFormData = {
      ...formData,
      activities: defaultActivities,
    };
  
    console.log('Submitting Form Data:', updatedFormData);
  
    if (activityId) {
      await props.handleUpdateActivity(activityId, updatedFormData);
    } else {
      await props.handleAddActivity(updatedFormData);
    }
  
    navigate('/activities');
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <h1>{activityId ? 'Edit Activity Entry' : 'New Activity Entry'}</h1>

        {/* Date Input */}
        <label htmlFor="date-input">Date:</label>
        <input
          required
          type="date"
          id="date-input"
          value={formData.date || ''}
          onChange={handleDateChange}
        />

        <h3>Add Activity</h3>

        <label htmlFor="timeOfDay-select">Time of Day:</label>
        <select
          id="timeOfDay-select"
          value={newActivity.timeOfDay}
          onChange={(e) => handleNewActivityChange('timeOfDay', e.target.value)}
        >
          <option value="morning">Morning</option>
          <option value="afternoon">Afternoon</option>
          <option value="evening">Evening</option>
          <option value="night">Night</option>
        </select>

        <label htmlFor="activityName-input">Activity Name:</label>
        <select
          id="activityName-input"
          value={newActivity.activityName}
          onChange={(e) => handleNewActivityChange('activityName', e.target.value)}
        >
          <option value="">-- Select an activity --</option>
          {activityOptions[newActivity.timeOfDay]?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Custom activity"
          value={newActivity.activityName}
          onChange={(e) => handleNewActivityChange('activityName', e.target.value)}
        />

        <label htmlFor="activityType-input">Activity Type:</label>
        <select
          id="activityType-input"
          value={newActivity.activityType}
          onChange={(e) => handleNewActivityChange('activityType', e.target.value)}
        >
          <option value="">-- Select an activity type --</option>
          {activityTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <button type="button" onClick={handleAddActivity}>
          Add Activity
        </button>

        {Object.keys(formData.activities).map((timeOfDay) => (
          <div key={timeOfDay}>
            <h3>{timeOfDay.charAt(0).toUpperCase() + timeOfDay.slice(1)}</h3>
            <ul>
              {Array.isArray(formData.activities[timeOfDay]?.activityTypes) &&
              formData.activities[timeOfDay]?.activityTypes.length ? (
                formData.activities[timeOfDay].activityTypes.map((activity, index) => (
                  <li key={index}>
                    {activity?.activityName || 'No activity logged'} (
                    {activity?.activityType || 'No type specified'})
                    <button
                      type="button"
                      onClick={() => handleEditActivity(timeOfDay, index)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemoveActivity(timeOfDay, index)}
                    >
                      Remove
                    </button>
                  </li>
                ))
              ) : (
                <li>No activities logged for this time.</li>
              )}
            </ul>
          </div>
        ))}
        <button type="submit">SUBMIT</button>
      </form>
    </main>
  );
};

export default ActivityForm;
