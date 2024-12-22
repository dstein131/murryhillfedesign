import React, { useEffect, useState } from 'react';
import './SecondTransition.css';

const SecondTransition = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 4000); // Transition lasts 4 seconds
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="second-transition-container">
      <div className="second-transition">
        <div className="svg-container">
          {/* Sleek technology SVG animation */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 500 500"
            className="gearing-svg"
          >
            <g>
              <circle
                cx="250"
                cy="250"
                r="100"
                stroke="#646cff"
                strokeWidth="8"
                fill="none"
                className="circle-rotate"
              />
              <path
                d="M250 150 L270 220 L250 250 L230 220 Z"
                fill="#18bc9c"
                className="path-animate"
              />
              <circle
                cx="250"
                cy="250"
                r="30"
                fill="#646cff"
                className="inner-circle-pulse"
              />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SecondTransition;
