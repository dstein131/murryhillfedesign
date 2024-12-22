// src/pages/LandingPage.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LandingPage.css';
import TransitionPhrases from './TransitionPhrases';
import SecondTransition from './SecondTransition';

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
    <div className="landing-page d-flex flex-column">
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
        {/* Transitioning Phrases Section */}
        <TransitionPhrases />
      </header>

      {/* Navigation Sections */}
      <main className="landing-page__main flex-grow-1">
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
        {/* Second Transition */}
        {/* <SecondTransition /> */}
      </main>

      {/* Redesigned Footer */}
      <footer className="landing-page__footer mt-auto">
        <div className="container">
          <div className="row align-items-center">
            {/* Business Information */}
            <div className="col-md-6 text-center text-md-left mb-3 mb-md-0">
              <strong className="footer__company-name">Murray Hill Web Development, L.L.C.</strong>
              <span className="footer__phone"> | 📞 <a href="tel:9043839688">904.383.9688</a></span>
              <span className="footer__privacy"> | <a href="/privacy">Privacy Policy</a></span>
            </div>

            {/* Social Media */}
            <div className="col-md-6 text-center text-md-right">
              <a
                href="https://www.facebook.com/people/Murray-Hill-Web-Development/61570886608543/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="footer__social-link"
              >
                {/* Facebook SVG Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="facebook-icon"
                >
                  <path d="M22.675 0h-21.35C.596 0 0 .597 0 1.333v21.333C0 23.403.596 24 1.325 24h11.495v-9.294H9.691v-3.622h3.129V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.464.099 2.795.143v3.24l-1.918.001c-1.504 0-1.796.716-1.796 1.764v2.312h3.587l-.467 3.622h-3.12V24h6.116C23.404 24 24 23.403 24 22.667V1.333C24 .597 23.404 0 22.675 0z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/murrayhillwebdev/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="footer__social-link ml-3"
              >
                {/* Instagram SVG Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="instagram-icon"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.31.975.975 1.248 2.242 1.31 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.31 3.608-.975.975-2.242 1.248-3.608 1.31-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.31-.975-.975-1.248-2.242-1.31-3.608C2.175 15.747 2.163 15.367 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.31-3.608C4.52 2.497 5.787 2.225 7.153 2.163 8.419 2.105 8.799 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.07 5.765.128 4.604.392 3.603 1.393 2.601 2.395 2.337 3.556 2.28 4.843 2.223 6.123 2.213 6.532 2.213 12s.01 5.877.07 7.157c.057 1.287.321 2.448 1.322 3.449 1.001 1.001 2.162 1.265 3.449 1.322 1.28.06 1.689.07 7.157.07s5.877-.01 7.157-.07c1.287-.057 2.448-.321 3.449-1.322 1.001-1.001 1.265-2.162 1.322-3.449.06-1.28.07-1.689.07-7.157s-.01-5.877-.07-7.157c-.057-1.287-.321-2.448-1.322-3.449C19.448.392 18.287.128 17 .07 15.72.013 15.311 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998zm6.406-11.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
