import React, { useState, useEffect } from 'react';
import './TransitionPhrases.css';

const phrases = [
  "Custom Web Solutions Tailored for Your Business.",
  "Enhancing Your Online Presence with SEO Expertise.",
  "Responsive and Modern Designs that Engage Users.",
  "Reliable Support and Maintenance for Your Website.",
  "Innovative Development for Scalable Applications."
];

const TransitionPhrases = () => {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [fadeProp, setFadeProp] = useState({
    fade: 'fade-in'
  });

  useEffect(() => {
    const timeout = setInterval(() => {
      setFadeProp({ fade: 'fade-out' });
      setTimeout(() => {
        setCurrentPhraseIndex((prevIndex) =>
          prevIndex === phrases.length - 1 ? 0 : prevIndex + 1
        );
        setFadeProp({ fade: 'fade-in' });
      }, 1000); // Duration of fade-out before switching phrase
    }, 5000); // Total time each phrase is displayed

    return () => clearInterval(timeout);
  }, []);

  return (
    <div className="transition-phrases-container">
      <p className={`transition-phrase ${fadeProp.fade}`}>
        {phrases[currentPhraseIndex]}
      </p>
    </div>
  );
};

export default TransitionPhrases;
