import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/Dashboard';
import LoginPage from './pages/LoginPage';

// This component will protect routes that require a user to be logged in
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Routes>
        {/* A public login route for the dashboard */}
        <Route path="/login" element={<LoginPage />} />

        {/* The main dashboard is a protected route */}
        <Route 
            path="/*" 
            element={
                <PrivateRoute>
                    <DashboardPage />
                </PrivateRoute>
            } 
        />
    </Routes>
  );
}

export default App;
