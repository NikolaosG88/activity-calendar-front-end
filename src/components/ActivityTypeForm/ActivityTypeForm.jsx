//src/components/ActivityTypeForm/ActivityTypeForm.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as activityService from '../../services/activityService';

const TypeForm = (props) => {
  const { activityId, typeId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ text: '' });

  useEffect(() => {
    const fetchActivity = async () => {
      const activityData = await activityService.show(activityId); // Fetch the activity data
      // Find type in fetched activity data
      setFormData(activityData.activityTypes?.find((type) => type._id === typeId) || { text: '' });
    };
    if (activityId && typeId) fetchActivity();
  }, [activityId, typeId]);

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (activityId && typeId) {
      activityService.updateType(activityId, typeId, formData);
      navigate(`/activities/${activityId}`);
    } else {
      props.handleAddType(formData);
    }
    setFormData({ text: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="text-input">Type</label>
      <textarea
        required
        name="text"
        id="text-input"
        value={formData.text}
        onChange={handleChange}
      />
      <button type="submit">{typeId ? 'Update Type' : 'Add Type'}</button>
    </form>
  );
};

export default TypeForm;

