import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
// Import your pages
import HomePage from './pages/HomePage';
import ContractorsPage from './pages/ContractorsPage';
import ProjectsPage from './pages/ProjectsPage';
import ContactPage from './pages/ContactPage';
import About from './pages/About';

const NotFound = () => (
  <div className="text-center py-24 min-h-[50vh]">
    <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
    <p className="mt-4 text-gray-600">The page you are looking for does not exist.</p>
    <Link to="/" className="mt-6 inline-block bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition">
      Go to Homepage
    </Link>
  </div>
);
function App() {

  return (
    // The Router has been removed from here, as it's already in main.jsx
    <div className="max-w-[94%] mx-auto">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/contractors" element={<ContractorsPage />} />
        <Route path="/contractors/:id" element={<ContractorsPage />} />

        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:id" element={<ProjectsPage />} />

        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
