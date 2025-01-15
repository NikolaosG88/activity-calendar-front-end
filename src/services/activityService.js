//front-end// src/services/activityService.js

const BASE_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/activities`;

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
      console.log(error);
    }
};

async function update(activityId, activityFormData) {
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
      console.log(error);
    }
};

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
      console.log(error);
    }
};

const createType = async (activityId, typeFormData) => {
    try {
      const res = await fetch(`${BASE_URL}/${activityId}/types`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(typeFormData),
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
};

const updateType = async (activityId, typeId, typeFormData) => {
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
      console.log(error);
    }
};

const deleteType = async (activityId, typeId) => {
    try {
      const res = await fetch(`${BASE_URL}/${activityId}/types/${typeId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
};

export { index, show, createType, create, deleteActivity, update, deleteType, updateType };
