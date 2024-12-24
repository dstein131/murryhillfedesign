import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async'; // Import Helmet for SEO meta tags
import './TransitionPhrases.css';

const phrases = [
  "Custom Web Solutions Tailored for Your Business.",
  "Enhancing Your Online Presence with SEO Expertise.",
  "Responsive and Modern Designs that Engage Users.",
  "Reliable Support and Maintenance for Your Website.",
  "Innovative Development for Scalable Applications.",
  "Local Web Development Services in Jacksonville, FL.",
  "Affordable Web Solutions for Small Businesses.",
  "Veteran-Owned.",
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
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Dynamic Web Development Services | Jacksonville, FL</title>
        <meta
          name="description"
          content="Discover custom web solutions, SEO expertise, responsive designs, and scalable applications for your business in Jacksonville, FL."
        />
        <meta
          name="keywords"
          content="web development, SEO services, Jacksonville web development, responsive design, scalable applications, small business solutions"
        />
        <meta property="og:title" content="Dynamic Web Development Services | Jacksonville, FL" />
        <meta
          property="og:description"
          content="Providing custom web solutions, modern designs, and reliable support for businesses in Jacksonville, FL."
        />
        <meta property="og:url" content="https://murrayhillwebdevelopment.com" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Dynamic Web Development Services | Jacksonville, FL" />
        <meta
          name="twitter:description"
          content="Explore affordable, tailored web solutions for small businesses in Jacksonville, FL."
        />
      </Helmet>
      <p className={`transition-phrase ${fadeProp.fade}`}>
        {phrases[currentPhraseIndex]}
      </p>
    </div>
  );
};

export default TransitionPhrases;
