import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/Logo.svg';

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

        {/* Login / Register Button */}
        <button className="bg-gray-800 text-white text-sm px-4 py-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 transition">
          Login / Register
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
    </>
  );
};

export default Navbar;
