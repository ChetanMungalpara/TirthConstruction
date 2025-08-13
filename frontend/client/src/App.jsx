import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
// Import your pages
import HomePage from './pages/HomePage';
import ContractorsPage from './pages/ContractorsPage';
import ProjectsPage from './pages/ProjectsPage';
import ContactPage from './pages/ContactPage';
import About from './pages/About';

function App() {
  return (
    // The Router has been removed from here, as it's already in main.jsx
    <div className="max-w-[94%] mx-auto">
        <Navbar />
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/contractors" element={<ContractorsPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
    </div>
  );
}

export default App;
