import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Mic, History, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const navLinks = [
    { name: 'Dashboard', path: '/', icon: <Mic size={18} /> },
    { name: 'History', path: '/history', icon: <History size={18} /> },
    { name: 'Settings', path: '/settings', icon: <Settings size={18} /> },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-panel-dark py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="app-container">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <motion.div
              initial={{ rotate: -10 }}
              animate={{ rotate: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Mic className="text-primary-500" size={28} />
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-accent-500"
            >
              AudioSummarizer
            </motion.h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors duration-300 ${
                  location.pathname === link.path
                    ? 'text-primary-400 bg-white bg-opacity-5'
                    : 'text-gray-300 hover:text-white hover:bg-white hover:bg-opacity-5'
                }`}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-300 hover:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden mt-4 glass-panel-dark rounded-lg p-4"
          >
            <nav className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors duration-300 ${
                    location.pathname === link.path
                      ? 'text-primary-400 bg-white bg-opacity-10'
                      : 'text-gray-300 hover:text-white hover:bg-white hover:bg-opacity-5'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.icon}
                  <span>{link.name}</span>
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;