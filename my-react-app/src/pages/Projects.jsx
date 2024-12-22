// src/pages/Projects.jsx

import React, { useState } from 'react';
import './Projects.css';
import { FaGithub, FaExternalLinkAlt, FaImages } from 'react-icons/fa';

const devProjects = [
  {
    title: 'Murray Hill Web Design - Frontend',
    description: 'A personal portfolio site to showcase my skills and projects.',
    difficulties: [
      'Integrating Google OAuth for user authentication.',
      'Integrating dynamic routing with React Router.',
      'Deploying the site with Netlify and handling CORS issues.',
      'Setting up DNS records and configuring custom domains.',
      'Creating a cart system to allow users to purchase services.',
      'Integrating a payment gateway to allow users to pay for services.',
    ],
    solutions: [
      'Created a backend Google auth and callback to handle user authentication.',
      'Implemented React Router and tested route-based navigation extensively.',
      'Updated the CORS configuration to allow requests from multiple origins.',
      'Configured DNS records with Netlify and added a custom domain.',
      'Designed a cart system with React and Redux for state management.',
      'Integrated Stripe to handle payments and subscriptions.',
    ],
    github: 'https://github.com/dstein131/murryhillfedesign',
    demo: 'https://murrayhillwebdesign.netlify.app/',
  },
  {
    title: 'Main Website - Backend',
    description: 'A Node/Express backend for my personal site.',
    difficulties: [
      'Creating a CI/CD pipeline with GitHub Actions to Azure App Service.',
      'Implementing a RESTful API for the frontend to consume.',
      'Securing the API with JWT authentication and authorization.',
      'Setting up a MySQL database and hosting it on AWS RDS.',
      'Setting up cart, order, and payment systems.',
      'Creating a method to allow users to purchase services.',
    ],
    solutions: [
      'Configured a GitHub Actions workflow to build and deploy the app on Azure.',
      'Designed a RESTful API with Express and tested it with Postman.',
      'Implemented JWT authentication middleware to protect routes.',
      'Created a MySQL database schema and connected it to the app.',
      'Designed a cart, order, and payment system with Node.js and Express.',
      'Utilized Stripe to handle payments and subscriptions.',
    ],
    github: 'https://github.com/dstein131/Main',
    demo: 'https://maindb-a2dugpdndze5d9br.canadacentral-01.azurewebsites.net',
  },
  {
    title: 'SRI, Inc - Frontend',
    description: 'A React frontend to unify the SRI, Inc. web presence.',
    difficulties: [
      'Creating a SSO solution for the various SRI, Inc. web properties.',
      'Implementing a responsive design that works across devices.',
      'Designing a user-friendly interface for non-technical users.',
      'Creating a dashboard to display for admin to easily manage and interact with the site and its users.',
    ],
    solutions: [
      'Implemented FusionAuth to handle SSO for the various SRI, Inc. web properties.',
      'Utilized Bootstrap and custom CSS to create a responsive design.',
      'Conducted user testing and feedback sessions to refine the interface.',
      'Designed a dashboard with React and Redux for state management.',
    ],
    github: 'https://github.com/dstein131/sri_services_web_node',
    demo: 'https://sriserviceswebsiteimpl.azurewebsites.net/',
  },
  {
    title: 'SRI, Inc - Backend',
    description: 'A Node.js backend for the SRI, Inc. web properties.',
    difficulties: [
      'Integrating FusionAuth with the backend for SSO.',
      'Creating a RESTful API to interact with the frontend.',
      'Creating a MySQL database to store user and site data.',
      'Connecting to three different databases to retrieve, sort, normalize, and store data to be used by the frontend.',
    ],
    solutions: [
      'Configured FusionAuth to handle SSO and user authentication.',
      'Designed a RESTful API with Express to interact with the frontend.',
      'Created a MySQL database schema and connected it to the app.',
      'Utilized multiple database connections to retrieve, sort, normalize, and store data.',
    ],
    github: 'https://github.com/dstein131/UserMgmt',
    demo: 'https://usermgmtwebappimpl.azurewebsites.net/',
  },
  {
    title: 'Google Firebase Serveless Authentication and User Storage',
    description: 'A Google Firebase project to handle user authentication and storage that does not require a backend.',
    difficulties: [
      'Creating a user-friendly interface for non-technical users.',
      'Implementing a secure authentication system that does not require a backend.',
      'Creating a method to store user data securely.',
    ],
    solutions: [
      'Designed a user-friendly interface with React and Material-UI.',
      'Utilized Firebase Authentication to handle user sign-in and sign-up.',
      'Utilized Firebase Firestore to store user data securely.',
    ],
    github: 'https://github.com/dstein131/firebase-netlify-app',
    demo: 'https://mhwdfirebaseserverless.netlify.app/',
  },
  {
    title: 'Discord Bot',
    description: 'A Discord bot to manage and moderate a server.',
    difficulties: [
      'First time using Python or creating a bot.',
      'Creating a bot that could be used by multiple servers.',
      'Creating a method to avoid spam and other unwanted behavior.',
    ],
    solutions: [
      'Utilized the discord.py library to create a bot that could be used by multiple servers.',
      'Implemented methods to avoid spam and other unwanted behavior.',
      'Created other fun commands to keep users engaged.',
    ],
    github: 'https://github.com/dstein131/clip_bot',
    demo: 'N/A',
  },
];

const uxProjects = [
  {
    title: 'Lien Assist Program',
    description: 'UX/UI design for a web app designed to assist County employees in managing liens.',
    difficulties: ['Creating a user-friendly dashboard for users who are not tech-savvy.'],
    solutions: [
      'Interviewed users to understand their needs and pain points.',
      'Designed a simple and intuitive dashboard with Adobe XD.',
    ],
    screenshots: ['https://i.imgur.com/HMCKuec.png', 'https://i.imgur.com/sDM9SAf.png'],
  },
  {
    title: 'Masterfile Portal',
    description: 'A mobile-friendly slimmed-down county management system for users to use while in the field.',
    difficulties: [
      'Organizing the many tables and forms into a mobile-friendly format that also allowed for easy data entry and review.',
    ],
    solutions: [
      'Created a tabbed-based system that allowed for easy navigation and data entry.',
      'Utilized programmatic review of data to ensure data was entered correctly.',
    ],
    screenshots: [
      'https://i.imgur.com/ixWNQ0K.png',
      'https://i.imgur.com/0yhnmSb.png',
      'https://i.imgur.com/z8cicK0.png',
    ],
  },
];

const ProjectCard = ({ project, section, openModal }) => {
  const { title, description, difficulties, solutions, github, demo, screenshots } = project;

  return (
    <div className="project-card">
      <h2 className="project-card__title">{title}</h2>
      <p className="project-card__description">{description}</p>

      <div className="project-card__section">
        <h3 className="project-card__subtitle">Challenges:</h3>
        <ul className="project-card__list">
          {difficulties.map((difficulty, idx) => (
            <li key={`diff-${idx}`} className="project-card__list-item">
              {difficulty}
            </li>
          ))}
        </ul>
      </div>

      <div className="project-card__section">
        <h3 className="project-card__subtitle">Solutions:</h3>
        <ul className="project-card__list">
          {solutions.map((solution, idx) => (
            <li key={`sol-${idx}`} className="project-card__list-item">
              {solution}
            </li>
          ))}
        </ul>
      </div>

      {section === 'ux' && screenshots && screenshots.length > 0 && (
        <button
          className="project-card__button"
          onClick={() => openModal(screenshots, title)}
          aria-label={`View screenshots of ${title}`}
        >
          <FaImages className="project-card__icon" />
          View Screenshots
        </button>
      )}

      {section === 'development' && (github || demo) && (
        <div className="project-card__links">
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card__link"
              aria-label={`View ${title} on GitHub`}
            >
              <FaGithub className="project-card__icon" />
              GitHub
            </a>
          )}
          {demo && demo !== 'N/A' && (
            <a
              href={demo}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card__link"
              aria-label={`View live demo of ${title}`}
            >
              <FaExternalLinkAlt className="project-card__icon" />
              Live Demo
            </a>
          )}
        </div>
      )}
    </div>
  );
};

const Projects = () => {
  const [currentSection, setCurrentSection] = useState('development');
  const [modalData, setModalData] = useState({ screenshots: [], title: '' });

  const openModal = (screenshots, title) => {
    setModalData({ screenshots, title });
  };

  const closeModal = () => {
    setModalData({ screenshots: [], title: '' });
  };

  const projectsToDisplay = currentSection === 'development' ? devProjects : uxProjects;

  return (
    <div className="projects-page">
      <header className="projects-page__header">
        <h1 className="projects-page__title">
          {currentSection === 'development' ? 'Development Projects' : 'UX/UI Projects'}
        </h1>
        <p className="projects-page__subtitle">
          Here’s a list of projects I’ve worked on, the challenges I faced, and how I solved them.
        </p>
        <div className="projects-page__toggle">
          <button
            onClick={() => setCurrentSection('development')}
            className={`projects-page__toggle-button ${
              currentSection === 'development' ? 'projects-page__toggle-button--active' : ''
            }`}
            aria-pressed={currentSection === 'development'}
          >
            Development
          </button>
          <button
            onClick={() => setCurrentSection('ux')}
            className={`projects-page__toggle-button ${
              currentSection === 'ux' ? 'projects-page__toggle-button--active' : ''
            }`}
            aria-pressed={currentSection === 'ux'}
          >
            UX/UI
          </button>
        </div>
      </header>

      <main className="projects-page__main">
        <div className="projects-page__grid">
          {projectsToDisplay.map((project, index) => (
            <ProjectCard
              key={`project-${index}`}
              project={project}
              section={currentSection}
              openModal={openModal}
            />
          ))}
        </div>
      </main>

      {modalData.title && modalData.screenshots.length > 0 && (
        <div
          className={`modal ${modalData.screenshots.length > 0 ? 'modal--visible' : ''}`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div className="modal__overlay" onClick={closeModal} aria-hidden="true"></div>
          <div className="modal__content">
            <button
              className="modal__close"
              onClick={closeModal}
              aria-label="Close modal"
            >
              &times;
            </button>
            <h3 className="modal__title" id="modal-title">
              {modalData.title} Screenshots
            </h3>
            <div className="modal__carousel">
              {modalData.screenshots.map((screenshot, idx) => (
                <img
                  key={`modal-screenshot-${idx}`}
                  src={screenshot}
                  alt={`Screenshot ${idx + 1} of ${modalData.title}`}
                  className="modal__image"
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
