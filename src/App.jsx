//activity-calendar-front-end/App.jsx

import { useState, createContext, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import ActivityList from './components/ActivityList/ActivityList';
import ActivityDetails from './components/ActivityDetails/ActivityDetails';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import SignupForm from './components/SignupForm/SignupForm';
import SigninForm from './components/SigninForm/SigninForm';
import * as authService from '../src/services/authService';
import * as activityService from './services/activityService';
import ActivityForm from './components/ActivityForm/ActivityForm';

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
    const newActivity = await activityService.create(activityFormData);
    setActivities([newActivity, ...activities]);
    console.log('Submision complete:', newActivity)
    console.log('activityFormData', activityFormData);
    navigate('/activities');
  };

  const handleDeleteActivity = async (activityId) => {
    const deletedActivity = await activityService.deleteActivity(activityId);
    setActivities(activities.filter((activity) => activity._id !== deletedActivity._id));
    navigate('/activities');
  };

  const handleUpdateActivity = async (activityId, activityFormData) => {
    console.log('activityId:', activityId, 'activityFormData:', activityFormData);
    const updatedActivity = await activityService.update(activityId, activityFormData);
    setActivities(activities.map((activity) => (activityId === activity._id ? updatedActivity : activity)));
    navigate(`/activities/${activityId}`);
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
            // Protected Routes:
            <>
              <Route path="/" element={<Dashboard user={user} />} />
              <Route path="/activities" element={<ActivityList activities={activities} />} />
              <Route path="/activities/new" element={<ActivityForm handleAddActivity={handleAddActivity} />} />
              <Route path="/activities/:activityId" element={<ActivityDetails handleDeleteActivity={handleDeleteActivity} />} />
              <Route path="/activities/:activityId/edit" element={<ActivityForm handleUpdateActivity={handleUpdateActivity} />} />
            </>
          ) : (
            // Public Route:
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
