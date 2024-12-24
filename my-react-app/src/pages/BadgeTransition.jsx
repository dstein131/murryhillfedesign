import React, { useState, useEffect } from 'react';
import './BadgeTransition.css';

const BadgeTransition = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger the visibility after a short delay to create the transition effect
    const timeout = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timeout); // Cleanup timeout on component unmount
  }, []);

  return (
    <div className={`badge-container ${isVisible ? 'fade-in' : 'fade-out'}`}>
      <img
        src="/images/templates/vetbadge1.png"
        alt="Veteran Owned Business Badge"
        className="badge-image"
      />
    </div>
  );
};

export default BadgeTransition;
