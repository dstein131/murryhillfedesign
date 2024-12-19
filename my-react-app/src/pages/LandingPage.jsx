// src/pages/LandingPage.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async'; // Import Helmet
import 'bootstrap/dist/css/bootstrap.min.css';

import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  const sections = [
    { title: 'About Me', description: 'Learn more about who I am and what I do.', route: '/about' },
    { title: 'Projects', description: 'Explore the apps and projects I’ve worked on.', route: '/projects' },
    { title: 'Services', description: 'Learn about the services I offer.', route: '/services' },
    { title: 'CV', description: 'View my professional experience and skills.', route: '/resume' },
    // { title: 'Music', description: 'Some of the music I listen to while I work.', route: '/music' },
    { title: 'Blog', description: 'Read my thoughts on development, design, and life.', route: '/blog' },
    { title: 'Templates', description: 'View my collection of templates.', route: '/templates' },
    { title: 'Contact', description: 'Get in touch with me.', route: '/contact' },
    
  ];

  return (
    <div className="landing-page">
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Murray Hill Web Development | Home</title>
        <meta
          name="description"
          content="Welcome to Murray Hill Web Development. Explore my projects, services, and learn how I can help your business grow with custom web solutions."
        />
        <meta
          name="keywords"
          content="web development, Murray Hill, custom websites, SEO services, Jacksonville FL, portfolio, contact"
        />
        <meta property="og:title" content="Murray Hill Web Development | Home" />
        <meta
          property="og:description"
          content="Welcome to Murray Hill Web Development. Explore my projects, services, and learn how I can help your business grow with custom web solutions."
        />
        <meta property="og:image" content="%PUBLIC_URL%/images/NEWMHWDLOGO.svg" />
        <meta property="og:url" content="https://murrayhillwebdevelopment.com" /> 
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Murray Hill Web Development | Home" />
        <meta
          name="twitter:description"
          content="Welcome to Murray Hill Web Development. Explore my projects, services, and learn how I can help your business grow with custom web solutions."
        />
        <meta name="twitter:image" content="%PUBLIC_URL%/images/mhwd_logo_no_text.svg" />
      </Helmet>

      <header className="landing-page__header text-center">
        {/* Logo */}
        <img
          src="/images/NEWMHWDLOGO.svg"
          alt="Murray Hill Web Development Logo"
          className="landing-page__logo mb-4"
          style={{ height: '120px', width: 'auto' }}
        />
      </header>

      {/* Navigation Sections */}
      <main className="landing-page__main">
        <div className="dashboard container">
          <div className="row">
            {sections.map((section, index) => (
              <div key={index} className="col-md-4 mb-4">
                <div
                  className="dashboard__card p-4 border rounded h-100"
                  onClick={() => navigate(section.route)}
                  style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                >
                  <h2 className="dashboard__card-title">{section.title}</h2>
                  <p className="dashboard__card-description">{section.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Technology Description Section as Footer */}
      <footer
        className="landing-page__footer mt-4"
        style={{ fontSize: '0.9rem', color: 'var(--primary-color)' }}
      >
        <div className="container text-center">
          <div style={{ marginBottom: '0.5rem' }}>
            <p>
              <strong>Front End:</strong> React, Redux, Node.js, React Router Dom, Bcrypt, JWT, React Bootstrap, Axios, Google OAuth Identity Provider Login
              <br />
              <span style={{ color: 'var(--secondary-color)', fontSize: '0.85rem' }}>
                Hosted on Netlify with CI/CD pipeline
              </span>
            </p>
          </div>
          <div style={{ marginBottom: '0.5rem' }}>
            <p>
              <strong>Back End:</strong> Node.js, Express, MySQL, Sequelize, Bcrypt, JWT, Axios, Custom APIs and Middleware
              <br />
              <span style={{ color: 'var(--secondary-color)', fontSize: '0.85rem' }}>
                Hosted on Azure with CI/CD pipeline
              </span>
            </p>
          </div>
          <div>
            <p>
              <strong>Database:</strong> MySQL
              <br />
              <span style={{ color: 'var(--secondary-color)', fontSize: '0.85rem' }}>
                Hosted on Azure MySQL Flexible Server
              </span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
