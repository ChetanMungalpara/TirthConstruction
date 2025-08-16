import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/Logo.svg';

import Login from '../components/Login';

const Logo = () => (
  <img
    src={logo}
    alt="Tirth Logo"
    className="absolute h-[80px] top-[-14px]"
  />
);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isFixedNavVisible, setIsFixedNavVisible] = useState(false);
  const lastScrollY = useRef(0);

  // --- State for Modal ---
  const [isModalOpen, setIsModalOpen] = useState(false);

  const activeLinkStyle = {
    color: 'black',
    fontWeight: '600',
  };

  const pasiveLinkStyle = {
    color: 'inherit',
    transition: 'color 0.3s ease',
    ':hover': {
      color: 'black',
    },
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY <= 10) {
        setIsScrolled(false);
        setIsFixedNavVisible(false);
      } else {
        setIsScrolled(true);
        if (isFixedNavVisible && Math.abs(currentScrollY - lastScrollY.current) > 10) {
          setIsFixedNavVisible(false);
        }
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isFixedNavVisible]);

  // --- Function to handle closing modal on escape key ---
  useEffect(() => {
    const handleEscape = (event) => {
        if (event.key === 'Escape') {
            setIsModalOpen(false);
        }
    };
    document.addEventListener('keydown', handleEscape);
    return () => {
        document.removeEventListener('keydown', handleEscape);
    };
  }, []);


  const showFixedNav = () => {
    setIsFixedNavVisible(true);
  };

  const NavbarContent = () => (
    <div className="w-[100%] flex items-center justify-between bg-white rounded-[0px_0px_9.6px_9.6px] shadow-[0px_3px_36.8px_8px_#00000040] px-6 py-2">
      <NavLink to="/" className="flex items-center w-28">
        <Logo />
      </NavLink>
      <div className="flex gap-8 text-sm text-[#6B6B6B] font-medium">
        <NavLink to="/" style={({ isActive }) => isActive ? activeLinkStyle : pasiveLinkStyle}>Home</NavLink>
        <NavLink to="/contractors" style={({ isActive }) => isActive ? activeLinkStyle : pasiveLinkStyle}>Contractors</NavLink>
        <NavLink to="/projects" style={({ isActive }) => isActive ? activeLinkStyle : pasiveLinkStyle}>Projects</NavLink>
        <NavLink to="/about" style={({ isActive }) => isActive ? activeLinkStyle : pasiveLinkStyle}>About Us</NavLink>
        <NavLink to="/contact" style={({ isActive }) => isActive ? activeLinkStyle : pasiveLinkStyle}>Contact Us</NavLink>
      </div>
      <div className="flex items-center gap-4">
        {/* Language Dropdown */}
        <div className="relative">
          <select className="appearance-none bg-gray-200 text-sm text-black px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:bg-white transition">
            <option>English</option>
            <option>ગુજરાતી</option>
          </select>
        </div>

        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-gray-800 text-white text-sm px-4 py-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
        >
          Contractor Login
        </button>
      </div>
    </div>
  );

  return (
    <>
      <nav className={`relative flex justify-center mb-7 transition-opacity duration-300 ${isScrolled ? 'opacity-0' : 'opacity-100'}`}>
        <NavbarContent />
      </nav>
      <nav className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-500 ${isScrolled && isFixedNavVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
        <NavbarContent />
      </nav>
      <div className={`fixed top-4 right-4 z-50 transition-all duration-500 ${isScrolled && !isFixedNavVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
        <button
          onClick={showFixedNav}
          className="bg-white flex item-center justify-center p-6 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform hover:scale-110 transition-transform"
          aria-label="Open Navigation"
        >
          <Logo className="h-8 w-8" />
        </button>
      </div>

      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-[10000] flex items-center justify-center transition-opacity duration-300"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md relative transform transition-all duration-300 scale-100"
            onClick={(e) => e.stopPropagation()} 
          >
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            <Login />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
