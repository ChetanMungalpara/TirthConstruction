import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Layout and Page Components
import DashboardLayout from './components/DashboardLayout';
import DashboardPage from './pages/Dashboard';
import LoginPage from './pages/LoginPage';
import EditProfilePage from './pages/EditProfilePage';
import AccountSettingsPage from './pages/AccountSettingsPage';
import ManageUsersPage from './pages/ManageUsersPage';
import ManageProjectsPage from './pages/ManageProjectsPage';

// Route Guards
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';

// Placeholder for the My Projects page
const MyProjectsPage = () => <h1 className="text-3xl font-bold">My Projects</h1>;
const NotFound = () => (
  <div>
    <h1 className="text-3xl font-bold">404 - Not Found</h1>
    <p className="text-gray-600 mt-2">This page does not exist within the dashboard.</p>
  </div>
);

function App() {

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/"
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }
      >
        {/* --- Routes for ALL logged-in users --- */}
        <Route index element={<DashboardPage />} />
        <Route path="my-projects" element={<MyProjectsPage />} />
        <Route path="profile/edit" element={<EditProfilePage />} />
        <Route path="settings/account" element={<AccountSettingsPage />} />

        {/* --- Admin-ONLY routes --- */}
        {/* The AdminRoute component protects all routes nested inside it */}
        <Route element={<AdminRoute />}>
          <Route path="manage/users" element={<ManageUsersPage />} />
          <Route path="manage/projects" element={<ManageProjectsPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;