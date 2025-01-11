//activity-calendar-front-end/app.jsx

import { useState, createContext, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import SignupForm from './components/SignupForm/SignupForm';
import SigninForm from './components/SigninForm/SigninForm';
import ActivityForm from './components/ActivityForm/ActivityForm';
import ActivityDetails from './components/ActivityDetails/ActivityDetails';
import * as authService from './services/authService';
import * as activityService from './services/activityService';

export const AuthedUserContext = createContext(null);

const App = () => {
  const [user, setUser] = useState(authService.getUser());
  const [activities, setActivities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchActivities = async () => {
      if (user) {
        const fetchedActivities = await activityService.index();
        setActivities(fetchedActivities || []);
      }
    };
    fetchActivities();
  }, [user]);

  const handleAddActivity = async (newActivity) => {
    const createdActivity = await activityService.createActivity(newActivity);
    if (createdActivity) {
      setActivities([...activities, createdActivity]);
      navigate(`/activities/${createdActivity._id}`);
    }
  };

  const handleDeleteActivity = async (activityId) => {
    await activityService.deleteActivity(activityId);
    setActivities(activities.filter((a) => a._id !== activityId));
    navigate('/activities');
  };

  return (
    <>
      <AuthedUserContext.Provider value={user}>
        <NavBar user={user} handleSignout={() => setUser(null)} />
        <Routes>
          {user ? (
            <>
              <Route path="/" element={<Dashboard activities={activities} />} />
              <Route path="/activities/new" element={<ActivityForm handleSubmit={handleAddActivity} />} />
              <Route path="/activities/:activityId" element={<ActivityDetails handleDelete={handleDeleteActivity} />} />
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