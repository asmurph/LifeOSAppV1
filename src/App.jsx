import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './useAuth';
import LoginScreen from './pages/LoginScreen';
import MainTabs from './pages/MainTabs';
import Dashboard from './pages/Dashboard';
import Routines from './pages/DailyRoutinesScreen';
import Behavior from './pages/Behavior';
import Mood from './pages/Mood';
import Sensory from './pages/Sensory';
import Safety from './pages/Safety';
//import Notes from './pages/Notes';
import Tasks from './pages/Tasks';
import Children from './pages/Children';
import DailyRoutinesScreen from './pages/DailyRoutinesScreen';
import PredictiveSuggestions from './pages/PredictiveSuggestions';
import Settings from './pages/Settings';
import BehaviorList from './components/BehaviorList';
import SignupForm from './components/SignupForm';


const App = () => {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        {user ? (
          <>
            <Route path="/" element={<MainTabs />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="routines" element={<Routines />} />
              <Route path="behavior" element={<Behavior />} />
              <Route path="mood" element={<Mood />} />
              <Route path="sensory" element={<Sensory />} />
              <Route path="safety" element={<Safety />} />
         
              <Route path="tasks" element={<Tasks />} />
              <Route path="behaviorlist" element={<BehaviorList />} />
              <Route path="SignUpForm" element={<SignupForm />} />
            </Route>
            <Route path="/children" element={<Children />} />
            <Route path="/daily-routines" element={<DailyRoutinesScreen />} />
            <Route path="/predictive-suggestions" element={<PredictiveSuggestions />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/dashboardv2" />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<LoginScreen />} />
            <Route path="*" element={<Navigate to="/Login" />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};

const AppWrapper = () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

export default AppWrapper;
