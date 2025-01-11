// src/components/ActivityForm/ActivityForm.jsx
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as activityService from '../../services/activityService';

const ActivityForm = ({ handleSubmit }) => {
  const [formData, setFormData] = useState({
    date: '',
    morning: { selectedActivity: '', selectedType: '', activityStack: [] },
    afternoon: { selectedActivity: '', selectedType: '', activityStack: [] },
    evening: { selectedActivity: '', selectedType: '', activityStack: [] },
    night: { selectedActivity: '', selectedType: '', activityStack: [] },
  });
  const [customEntryEnabled, setCustomEntryEnabled] = useState({
    morning: false,
    afternoon: false,
    evening: false,
    night: false,
  });
  const [message, setMessage] = useState('');
  const { activityId } = useParams();
  const navigate = useNavigate();

  const activityOptions = {
    morning: ['Morning hygiene', 'Breakfast', 'Leave to work', 'Work from home'],
    afternoon: ['Lunchbreak', 'Finish work', 'Return home', 'Go groceries'],
    evening: ['Family Time', 'Go for walk', 'Exercise', 'Help the community'],
    night: ['Prepare for the morning', 'Read a book', 'Go clubbing', 'Meditate'],
  };

  const activityTypes = ['Hard', 'Easy', 'Creative', 'Routine'];

  useEffect(() => {
    const fetchActivity = async () => {
      if (activityId) {
        try {
          const activityData = await activityService.show(activityId);
          setFormData(activityData);
        } catch (error) {
          console.error('Error fetching activity:', error);
          setMessage('Error loading activity data.');
        }
      }
    };
    fetchActivity();
  }, [activityId]);

  const handleAddToStack = (timePeriod) => {
    const selectedActivity = formData[timePeriod].selectedActivity || '(New Entry)';
    const selectedType = formData[timePeriod].selectedType; // Allow blank type

    if (!selectedActivity.trim()) return;

    setFormData((prev) => ({
      ...prev,
      [timePeriod]: {
        ...prev[timePeriod],
        activityStack: [
          ...prev[timePeriod].activityStack,
          { activityName: selectedActivity, type: selectedType || '' },
        ],
        selectedActivity: '',
        selectedType: '',
      },
    }));
  };

  const handleChange = (evt, timePeriod, field) => {
    const value = evt.target.value;
    setFormData((prev) => ({
      ...prev,
      [timePeriod]: {
        ...prev[timePeriod],
        [field]: value,
      },
    }));
  };

  const toggleCustomEntry = (timePeriod) => {
    setCustomEntryEnabled((prev) => ({
      ...prev,
      [timePeriod]: !prev[timePeriod],
    }));

    if (!customEntryEnabled[timePeriod]) {
      setFormData((prev) => ({
        ...prev,
        [timePeriod]: {
          ...prev[timePeriod],
          selectedActivity: '',
        },
      }));
    }
  };

  const onSubmit = async (evt) => {
    evt.preventDefault();
    if (!formData.date.trim()) {
      setMessage('Date is required.');
      return;
    }

    const consolidatedActivities = {
      date: formData.date,
      activities: {
        morning: formData.morning.activityStack,
        afternoon: formData.afternoon.activityStack,
        evening: formData.evening.activityStack,
        night: formData.night.activityStack,
      },
    };

    try {
      const savedActivity = await handleSubmit(consolidatedActivities);
      setMessage('Activities for the day saved successfully! Redirecting...');

      // Check if savedActivity._id is valid and matches the route format
      if (savedActivity && savedActivity._id) {
        navigate(`/activities/${savedActivity._id}`);
      } else {
        setMessage('Error: Activity ID missing. Unable to redirect.');
      }
    } catch (error) {
      console.error('Error saving activity:', error);
      setMessage('Failed to save activities. Please try again.');
    }
  };

  return (
    <main>
      <h1>{activityId ? 'Edit Activity' : 'New Activity'}</h1>
      {message && <p>{message}</p>}
      <form onSubmit={onSubmit}>
        <label htmlFor="date">Date</label>
        <input
          required
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        />

        {['morning', 'afternoon', 'evening', 'night'].map((time) => (
          <div key={time}>
            <h3>{`${time.charAt(0).toUpperCase() + time.slice(1)} Activities`}</h3>
            {!customEntryEnabled[time] && (
              <>
                <label htmlFor={`${time}-activity`}>Select Activity</label>
                <select
                  id={`${time}-activity`}
                  value={formData[time].selectedActivity}
                  onChange={(e) => handleChange(e, time, 'selectedActivity')}
                >
                  <option value="">Select an activity</option>
                  {activityOptions[time].map((option, idx) => (
                    <option key={idx} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </>
            )}

            {customEntryEnabled[time] && (
              <>
                <label htmlFor={`${time}-custom`}>Enter Custom Activity</label>
                <input
                  type="text"
                  id={`${time}-custom`}
                  value={formData[time].selectedActivity}
                  onChange={(e) => handleChange(e, time, 'selectedActivity')}
                  placeholder="Enter custom activity"
                />
              </>
            )}

            <button
              type="button"
              onClick={() => toggleCustomEntry(time)}
            >
              {customEntryEnabled[time] ? 'Use Predefined Activity' : 'Enter Custom Activity'}
            </button>

            <label htmlFor={`${time}-type`}>Select Type</label>
            <select
              id={`${time}-type`}
              value={formData[time].selectedType}
              onChange={(e) => handleChange(e, time, 'selectedType')}
            >
              <option value="">Select type</option>
              {activityTypes.map((type, idx) => (
                <option key={idx} value={type}>
                  {type}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={() => handleAddToStack(time)}
            >
              Add Activity
            </button>

            <h4>Added Activities:</h4>
            <ul>
              {formData[time].activityStack.map((activity, idx) => (
                <li key={idx}>{`${activity.activityName}${activity.type ? ` (${activity.type})` : ''}`}</li>
              ))}
            </ul>
          </div>
        ))}

        <button type="submit">Submit Daily Activities</button>
      </form>
    </main>
  );
};

export default ActivityForm;