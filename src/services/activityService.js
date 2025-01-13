//front-end// src/services/activityService.js

const BASE_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/activities`;

// Fetch all activities
const index = async () => {
  try {
    const res = await fetch(BASE_URL, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return res.json();
  } catch (error) {
    console.error('Error fetching activities:', error);
  }
};

// Fetch a specific activity entry by ID
const show = async (activityId) => {
  try {
    const res = await fetch(`${BASE_URL}/${activityId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return res.json();
  } catch (error) {
    console.error('Error fetching activity:', error);
  }
};

// Create a new activity entry
const create = async (activityFormData) => {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(activityFormData),
    });
    return res.json();
  } catch (error) {
    console.error('Error creating activity:', error);
  }
};

// Update an activity entry
const update = async (activityId, activityFormData) => {
  try {
    const res = await fetch(`${BASE_URL}/${activityId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(activityFormData),
    });
    return res.json();
  } catch (error) {
    console.error('Error updating activity:', error);
  }
};

// Delete an activity entry
const deleteActivity = async (activityId) => {
  try {
    const res = await fetch(`${BASE_URL}/${activityId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return res.json();
  } catch (error) {
    console.error('Error deleting activity:', error);
  }
};

// Add a new activity type to a specific time of day
const createActivityType = async (activityId, timeOfDay, typeFormData) => {
  try {
    const res = await fetch(`${BASE_URL}/${activityId}/types/${timeOfDay}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(typeFormData),
    });
    return res.json();
  } catch (error) {
    console.error('Error creating activity type:', error);
  }
};

// Update a specific activity type
const updateActivityType = async (activityId, typeId, typeFormData) => {
  try {
    const res = await fetch(`${BASE_URL}/${activityId}/types/${typeId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(typeFormData),
    });
    return res.json();
  } catch (error) {
    console.error('Error updating activity type:', error);
  }
};

// Delete a specific activity type
const deleteActivityType = async (activityId, typeId) => {
  try {
    const res = await fetch(`${BASE_URL}/${activityId}/types/${typeId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return res.json();
  } catch (error) {
    console.error('Error deleting activity type:', error);
  }
};

export {
  index,
  show,
  create,
  update,
  deleteActivity,
  createActivityType,
  updateActivityType,
  deleteActivityType,
};
