import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const LandingPage = () => {
  const navigate = useNavigate();

  const sections = [
    { title: 'About Me', description: 'Learn more about who I am and what I do.', route: '/about' },
    { title: 'Projects', description: 'Explore the apps and projects I’ve worked on.', route: '/projects' },
    { title: 'CV', description: 'View my professional experience and skills.', route: '/resume' },
    { title: 'Services', description: 'Learn about the services I offer. (Not Live. Proof of Concept.)', route: '/services' },
    { title: 'Music', description: 'Some of the music I listen to while I work.', route: '/music' },
    { title: 'Blog', description: 'Read my thoughts on development, design, and life.', route: '/blog' },
    { title: 'Contact', description: 'Get in touch with me.', route: '/contact' },
  ];

  return (
    <div className="landing-page">
      <header className="landing-page__header text-center">
        {/* Logo */}
        <img
          src="/images/mhwd_logo.svg"
          alt="Murray Hill Web Development Logo"
          className="landing-page__logo mb-4"
          style={{ height: '120px', width: 'auto' }}
        />
      </header>

      {/* Navigation Sections */}
      <main className="landing-page__main">
        <div className="dashboard">
          {sections.map((section, index) => (
            <div
              key={index}
              className="dashboard__card mb-3 p-3 border rounded"
              onClick={() => navigate(section.route)}
              style={{ cursor: 'pointer' }}
            >
              <h2 className="dashboard__card-title">{section.title}</h2>
              <p className="dashboard__card-description">{section.description}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Technology Description Section as Footer */}
      <footer className="landing-page__footer mt-4" style={{ fontSize: '0.9rem', color: 'var(--primary-color)' }}>
        <div className="container text-center">
          <div style={{ marginBottom: '0.5rem' }}>
            <p>
              <strong>Front End:</strong> React, Redux, Node.js, React Router Dom, Bcrypt, JWT, React Bootstrap, Axios
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
