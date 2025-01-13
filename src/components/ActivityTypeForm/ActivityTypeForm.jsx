//src/components/ActivityTypeForm/ActivityTypeForm.jsx

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as activityService from '../../services/activityService';

const ActivityTypeForm = (props) => {
  const { activityId, typeId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ type: '' });
  const [timeOfDay, setTimeOfDay] = useState('');

  useEffect(() => {
    const fetchActivity = async () => {
      const activityData = await activityService.show(activityId);
      if (typeId) {
        const foundType = ['morning', 'afternoon', 'evening', 'night']
          .flatMap((time) => activityData.activities[time]?.activityTypes.map((type) => ({ ...type, timeOfDay: time })) || [])
          .find((type) => type._id === typeId);
        if (foundType) {
          setFormData({ type: foundType.type });
          setTimeOfDay(foundType.timeOfDay);
        }
      }
    };
    if (activityId && typeId) fetchActivity();
  }, [activityId, typeId]);

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleTimeOfDayChange = (evt) => {
    setTimeOfDay(evt.target.value);
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if (activityId && typeId) {
      await activityService.updateActivityType(activityId, typeId, { ...formData, timeOfDay });
      navigate(`/activities/${activityId}`);
    } else {
      await props.handleAddActivityType(activityId, { ...formData, timeOfDay });
    }
    setFormData({ type: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="timeOfDay-select">Time of Day</label>
      <select name="timeOfDay" id="timeOfDay-select" value={timeOfDay} onChange={handleTimeOfDayChange} required>
        <option value="">Select a time</option>
        <option value="morning">Morning</option>
        <option value="afternoon">Afternoon</option>
        <option value="evening">Evening</option>
        <option value="night">Night</option>
      </select>

      <label htmlFor="type-input">Activity Type</label>
      <input
        required
        type="text"
        name="type"
        id="type-input"
        value={formData.type}
        onChange={handleChange}
        placeholder="Enter activity type (e.g., Hard, Creative)"
      />

      <button type="submit">{typeId ? 'Update Activity Type' : 'Add Activity Type'}</button>
    </form>
  );
};

export default ActivityTypeForm;
