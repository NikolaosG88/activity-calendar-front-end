//activity-calendar-front-end/app.jsx

import { useState, createContext, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import SignupForm from './components/SignupForm/SignupForm';
import SigninForm from './components/SigninForm/SigninForm';
import ActivityForm from './components/ActivityForm/ActivityForm.jsx'; // Ensure default export in ActivityForm.jsx
import ActivityDetails from './components/ActivityDetails/ActivityDetails';
import * as authService from '../src/services/authService';
import * as activityService from '../src/services/activityService';

export const AuthedUserContext = createContext(null);

const App = () => {
  const [user, setUser] = useState(authService.getUser());
  const [activities, setActivities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllActivities = async () => {
      const activitiesData = await activityService.index();
      console.log('activitiesData:', activitiesData);
      setActivities(activitiesData);
    };
    if (user) fetchAllActivities();
  }, [user]);

  const handleAddActivity = async (activityFormData) => {
    if (!activityFormData || typeof activityFormData !== 'object') {
      console.error('Invalid activity form data.');
      return;
    }

    try {
      const newActivity = await activityService.createActivity(activityFormData);
      if (!newActivity) {
        console.error('Failed to create new activity.');
        return;
      }
      setActivities((prev) => [newActivity, ...prev]);
      console.log('activityFormData:', activityFormData);
      navigate('/activities');
    } catch (error) {
      console.error('Error adding activity:', error);
    }
  };

  const handleDeleteActivity = async (activityId) => {
    if (!activityId) {
      console.error('Activity ID is missing.');
      return;
    }

    try {
      const deletedActivity = await activityService.deleteActivity(activityId);
      if (!deletedActivity) {
        console.error('Failed to delete activity.');
        return;
      }
      setActivities((prev) => prev.filter((activity) => activity._id !== deletedActivity._id));
      navigate('/activities');
    } catch (error) {
      console.error('Error deleting activity:', error);
    }
  };

  const handleUpdateActivity = async (activityId, activityFormData) => {
    if (!activityId || !activityFormData || typeof activityFormData !== 'object') {
      console.error('Invalid activity data for update.');
      return;
    }

    try {
      console.log('activityId:', activityId, 'activityFormData:', activityFormData);
      const updatedActivity = await activityService.updateActivity(activityId, activityFormData);
      if (!updatedActivity) {
        console.error('Failed to update activity.');
        return;
      }
      setActivities((prev) => prev.map((activity) => (activityId === activity._id ? updatedActivity : activity)));
      navigate(`/activities/${activityId}`);
    } catch (error) {
      console.error('Error updating activity:', error);
    }
  };

  const handleSignout = () => {
    authService.signout();
    setUser(null);
  };

  return (
    <>
      <AuthedUserContext.Provider value={user}>
        <NavBar user={user} handleSignout={handleSignout} />
        <Routes>
          {user ? (
            <>
              <Route path="/" element={<Dashboard user={user} />} />
              <Route path="/activities" element={<Dashboard user={user} activities={activities} />} />
              <Route path="/activities/new" element={<ActivityForm handleSubmit={handleAddActivity} />} />
              <Route path="/activities/:activityId" element={<ActivityDetails handleDeleteActivity={handleDeleteActivity} />} />
              <Route path="/activities/:activityId/edit" element={<ActivityForm handleSubmit={handleUpdateActivity} />} />
            </>
          ) : (
            <Route path="/" element={<Landing />} />
          )}
          <Route path="/signup" element={<SignupForm setUser={setUser} />} />
          <Route path="/signin" element={<SigninForm setUser={setUser} />} />
        </Routes>
      </AuthedUserContext.Provider>
    </>
  );
};

export default App;
