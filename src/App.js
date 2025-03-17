import React, { useState } from 'react';
import { FaMoon, FaSun, FaUserCircle } from 'react-icons/fa'; // Import the profile icon
import ChatBox from './components/ChatBox';
import './index.css';

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false); // Default to dark mode

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`app ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <nav className="navbar">
      <h4>Chat Application</h4>
        <div className="navbar-icons">
          {isDarkMode ? (
            <FaSun className="dark-mode-icon" onClick={toggleDarkMode} />
          ) : (
            <FaMoon className="dark-mode-icon" onClick={toggleDarkMode} />
          )}
          <FaUserCircle className="profile-icon" />
        </div>
      </nav>
      <ChatBox isDarkMode={isDarkMode} />
    </div>
  );
};

export default App;
