// src/services/activityService.js

const BASE_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/activities`;

const index = async () => {
  try {
    const res = await fetch(BASE_URL, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    if (!res.ok) throw new Error(`Error fetching activities: ${res.status}`);
    return res.json();
  } catch (error) {
    console.error('Error fetching activities:', error);
    return null; // Handle null case in the UI
  }
};

const show = async (activityId) => {
  try {
    const res = await fetch(`${BASE_URL}/${activityId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const createActivity = async (activityData) => {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(activityData),
    });
    if (!res.ok) throw new Error(`Error creating activity: ${res.status}`);
    return res.json();
  } catch (error) {
    console.error('Error creating activity:', error);
    return null;
  }
};

const updateActivity = async (activityId, activityData) => {
  try {
    const res = await fetch(`${BASE_URL}/${activityId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(activityData),
    });
    if (!res.ok) throw new Error(`Error updating activity: ${res.status}`);
    return res.json();
  } catch (error) {
    console.error('Error updating activity:', error);
    return null;
  }
};

const deleteActivity = async (activityId) => {
  try {
    const res = await fetch(`${BASE_URL}/${activityId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    if (!res.ok) throw new Error(`Error deleting activity: ${res.status}`);
    return res.json();
  } catch (error) {
    console.error('Error deleting activity:', error);
    return null;
  }
};

export { index, createActivity, updateActivity, deleteActivity };
