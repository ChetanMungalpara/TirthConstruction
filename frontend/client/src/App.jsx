import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar.jsx';
import Footer from './components/Footer.jsx';
// Import your pages
import HomePage from './pages/HomePage';
import ContractorsPage from './pages/ContractorsPage';
import ProjectsPage from './pages/ProjectsPage';
import ContactPage from './pages/ContactPage';
import About from './pages/About.jsx';

function App() {
  return (
    <div className="max-w-[94%] mx-auto">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contractors" element={<ContractorsPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer/>
        {/* We can add a <Footer /> component here later */}
    </div>
  );
}

export default App;