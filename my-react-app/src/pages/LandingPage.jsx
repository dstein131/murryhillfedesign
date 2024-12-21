// src/pages/LandingPage.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  const sections = [
    { title: 'About Me', description: 'Learn more about who I am and what I do.', route: '/about' },
    { title: 'Services', description: 'Learn about the services I offer.', route: '/services' },
    { title: 'Templates', description: 'View our collection of templates for your site.', route: '/templates' },
    // { title: 'CV', description: 'View my professional experience and skills.', route: '/resume' },
    { title: 'Projects', description: 'Explore the apps and projects I’ve worked on.', route: '/projects' },
    { title: 'Blog', description: 'Read my thoughts on development, design, and life.', route: '/blog' },
    { title: 'Contact', description: 'Get in touch with me.', route: '/contact' },
    // { title: 'Message Me Directly', description: 'Send me a message directly.', route: '/direct-message' },
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
        />
      </header>

      {/* Navigation Sections */}
      <main className="landing-page__main">
        <div className="dashboard container">
          <div className="row">
            {sections.map((section, index) => (
              <div key={index} className="col-md-4 col-sm-6 mb-4">
                <div
                  className="dashboard__card p-4 border rounded h-100 animate__animated animate__fadeInUp"
                  style={{ cursor: 'pointer', animationDelay: `${index * 0.2}s` }}
                  onClick={() => navigate(section.route)}
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
      <footer className="landing-page__footer mt-4">
        <div className="container text-center">
          <div style={{ marginBottom: '0.5rem' }}>
            <p>
              <strong>Front End:</strong> React, Redux, Node.js, React Router Dom, Bcrypt, JWT, Stripe, React Bootstrap, Axios, Google OAuth Identity
              Provider Login
              <br />
              <span className="footer__secondary-text">
                Hosted on Netlify with CI/CD pipeline
              </span>
            </p>
          </div>
          <div style={{ marginBottom: '0.5rem' }}>
            <p>
              <strong>Back End:</strong> Node.js, Express, MySQL, Sequelize, Bcrypt, Stripe, JWT, Axios, Custom APIs and Middleware
              <br />
              <span className="footer__secondary-text">
                Hosted on Azure with CI/CD pipeline
              </span>
            </p>
          </div>
          <div>
            <p>
              <strong>Database:</strong> MySQL
              <br />
              <span className="footer__secondary-text">
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
