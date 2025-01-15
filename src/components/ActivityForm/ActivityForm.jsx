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
    morning: { activityName: '', activityType: '' },
    afternoon: { activityName: '', activityType: '' },
    evening: { activityName: '', activityType: '' },
    night: { activityName: '', activityType: '' },
  });

  const { activityId } = useParams();
  const navigate = useNavigate();

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
        {Object.keys(activityOptions).map((timeOfDay) => (
          <div key={timeOfDay}>
            <h3>{timeOfDay.charAt(0).toUpperCase() + timeOfDay.slice(1)}</h3>
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
          </div>
        ))}

        <button type="submit">SUBMIT</button>
      </form>
    </main>
  );
};

export default ActivityForm;


