import React from 'react';
import { Github, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="glass-panel-dark py-6 mt-10">
      <div className="app-container">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} AudioSummarizer. All rights reserved.
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <a
              href="#"
              className="text-gray-400 hover:text-primary-400 transition-colors duration-300"
              aria-label="Github"
            >
              <Github size={20} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-primary-400 transition-colors duration-300"
              aria-label="Twitter"
            >
              <Twitter size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;