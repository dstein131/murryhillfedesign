// src/pages/Projects.jsx

import React, { useState } from 'react';
import './Projects.css';
import { FaGithub, FaExternalLinkAlt, FaImages, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const devProjects = [
  {
    "title": "Murray Hill Web Design - Frontend Application",
    "description": "A responsive React-based portfolio and e-commerce site designed to showcase services and facilitate user interactions, including purchasing and authentication features.",
    "difficulties": [
      "Integrating Google OAuth for secure and seamless user authentication.",
      "Setting up dynamic routing for pages using React Router.",
      "Deploying the site on Netlify while managing CORS and DNS configurations.",
      "Implementing an interactive cart and checkout system for services.",
      "Integrating a payment gateway to handle online transactions.",
      "Designing and managing a Redux-based state management system for cart and services."
    ],
    "solutions": [
      "Configured Google OAuth with backend support for authentication and callbacks.",
      "Utilized React Router to enable intuitive and efficient navigation across pages.",
      "Resolved CORS issues by updating server configurations and testing.",
      "Configured DNS records on Netlify and integrated a custom domain.",
      "Developed a React-Redux cart system to manage user service selections.",
      "Implemented Stripe for secure and reliable payment processing."
    ],
    "github": "https://github.com/dstein131/murryhillfedesign",
    "demo": "https://murrayhillwebdesign.netlify.app/"
  },  
  {
    "title": "Main Backend - Service API",
    "description": "A Node.js backend designed to support a personal web application with RESTful API services and comprehensive e-commerce functionality.",
    "difficulties": [
      "Integrating a CI/CD pipeline with GitHub Actions to automate deployment to Azure App Service.",
      "Developing a scalable RESTful API to interface with the frontend.",
      "Ensuring security of the API with JWT-based authentication and role-based authorization.",
      "Designing a MySQL database hosted on AWS RDS for reliable and performant data storage.",
      "Implementing robust cart, order, and payment systems to enable e-commerce capabilities.",
      "Facilitating user subscriptions and service purchases seamlessly."
    ],
    "solutions": [
      "Set up GitHub Actions for automated building, testing, and deployment to Azure.",
      "Built a RESTful API using Node.js and Express, thoroughly tested with Postman.",
      "Implemented middleware for JWT authentication, protecting sensitive endpoints.",
      "Designed and managed a MySQL database schema, hosted on AWS RDS.",
      "Created modular cart, order, and payment processing using Node.js and Express.",
      "Integrated Stripe API for secure and efficient handling of payments and subscriptions."
    ],
    "github": "https://github.com/dstein131/Main",
    "demo": "https://maindb-a2dugpdndze5d9br.canadacentral-01.azurewebsites.net"
  },  
  {
    title: 'Scalable and Integrated Text-to-Speech (TTS) Processing System',
    description: 'A robust, scalable TTS processing system integrated with ElevenLabs API and AWS S3, designed for high performance, real-time updates, security, and error resilience.',
    difficulties: [
      'Integrating the ElevenLabs API for dynamic and high-quality audio generation.',
      'Securely storing generated audio files in AWS S3 while enabling efficient retrieval.',
      'Designing an asynchronous job queue using Bull.js to handle high volumes of TTS requests.',
      'Configuring Azure Redis Cache with TLS for secure and low-latency communication.',
      'Implementing error-handling mechanisms to manage external API failures and retry logic.',
      'Ensuring database consistency for updating TTS request statuses accurately.',
      'Providing real-time updates to users about the status of their TTS requests.',
      'Establishing reliable WebSocket communication using Socket.IO for live status updates.',
    ],
    solutions: [
      'Integrated ElevenLabs API to generate high-quality text-to-speech audio streams with customizable voice options.',
      'Used @aws-sdk/client-s3 to upload, retrieve, and manage audio files securely in AWS S3 with strict access policies.',
      'Developed a job queue using Bull.js to process requests asynchronously, supporting scalability and rate-limiting.',
      'Configured Azure Redis Cache with TLS for secure data transfer and optimized connection pooling for performance.',
      'Built robust error-handling mechanisms, including retry logic and systematic error logging, to handle external API failures.',
      'Implemented database operations to ensure consistent updates for TTS request statuses (e.g., pending, processing, completed).',
      'Utilized Socket.IO for real-time communication, allowing users to receive live updates on the progress of their TTS requests.',
      'Designed WebSocket events to handle TTS request status changes (e.g., pending, processing, completed, failed) and broadcast updates to connected clients.',
    ],
    github: 'https://github.com/dstein131/simpBack',
    demo: 'https://simpfront.netlify.app/',
  },
  {
    "title": "CoffeeHouse",
    "description": "A serverless web application using Google Firebase to handle user authentication and data storage, eliminating the need for a traditional backend.",
    "difficulties": [
      "Designing a user-friendly interface for non-technical users.",
      "Implementing a secure, scalable authentication system without backend dependencies.",
      "Storing user data securely using serverless solutions.",
      "Building an interactive dashboard for logged-in users."
    ],
    "solutions": [
      "Designed an intuitive user interface with React and Material-UI for seamless usability.",
      "Integrated Firebase Authentication for secure user sign-in and sign-up.",
      "Utilized Firebase Firestore for efficient and secure data storage.",
      "Developed a protected dashboard using React, Redux for state management, and route protection."
    ],
    "github": "https://github.com/dstein131/firebase-netlify-app",
    "demo": "https://mhwdfirebaseserverless.netlify.app/"
  },  
  {
    "title": "SRI, Inc - Web Platform Frontend",
    "description": "A React-based frontend for SRI, Inc., designed to unify the company's web presence and provide a seamless user experience across various services.",
    "difficulties": [
      "Implementing a Single Sign-On (SSO) solution for integration with multiple SRI web properties.",
      "Creating a responsive design to ensure accessibility across all devices.",
      "Designing an intuitive and user-friendly interface for non-technical users.",
      "Building a comprehensive admin dashboard for site and user management."
    ],
    "solutions": [
      "Implemented FusionAuth to handle SSO and streamline user authentication across web properties.",
      "Used Bootstrap and custom CSS modules to create a responsive and visually appealing design.",
      "Incorporated user feedback to refine and enhance interface usability.",
      "Developed an admin dashboard using React and Redux for efficient state management and user interaction."
    ],
    "github": "https://github.com/sriservices/sri_services_web_node",
    "demo": "https://sriserviceswebsiteimpl.azurewebsites.net/"
  },  
  {
    "title": "SRI, Inc - Backend",
    "description": "A Node.js backend for the SRI, Inc. web properties, focusing on user management, SSO, and integration with multiple databases.",
    "difficulties": [
        "Integrating FusionAuth for SSO and user authentication.",
        "Creating a RESTful API to interact with the frontend.",
        "Designing and managing a MySQL database schema for user and site data.",
        "Connecting to and normalizing data across multiple databases.",
        "Managing file operations through Azure Blob Storage.",
        "Handling email notifications and alerts via SendGrid.",
        "Scheduling automated tasks like alerts using cron jobs."
    ],
    "solutions": [
        "Configured FusionAuth for seamless SSO and authentication.",
        "Developed a RESTful API with Express to handle frontend requests.",
        "Created robust MySQL database schemas to manage user, role, and application data.",
        "Implemented multi-database queries and normalization for cohesive data handling.",
        "Integrated Azure Blob Storage for file uploads, downloads, and metadata management.",
        "Utilized SendGrid for email notifications with styled templates.",
        "Scheduled tasks like weekly alerts using Node.js cron jobs."
    ],
    "github": "https://github.com/sriservices/UserMgmt",
    "demo": "https://usermgmtwebappimpl.azurewebsites.net/"
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
  const [isChallengesOpen, setIsChallengesOpen] = useState(false);
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);

  const toggleChallenges = () => {
    setIsChallengesOpen(!isChallengesOpen);
  };

  const toggleSolutions = () => {
    setIsSolutionsOpen(!isSolutionsOpen);
  };

  return (
    <div className="unique-projects-page__project-card">
      <h2 className="unique-projects-page__project-title">{title}</h2>
      <p className="unique-projects-page__project-description">{description}</p>

      {/* Challenges Section */}
      <div className="unique-projects-page__project-section">
        <h3 className="unique-projects-page__project-subtitle" onClick={toggleChallenges}>
          Challenges:
          <span className="unique-projects-page__toggle-icon">
            {isChallengesOpen ? <FaChevronUp /> : <FaChevronDown />}
          </span>
        </h3>
        <ul className={`unique-projects-page__project-list ${isChallengesOpen ? 'unique-projects-page__project-list--open' : 'unique-projects-page__project-list--collapsed'}`}>
          {difficulties.map((difficulty, idx) => (
            <li key={`diff-${idx}`} className="unique-projects-page__project-list-item">
              {difficulty}
            </li>
          ))}
        </ul>
      </div>

      {/* Solutions Section */}
      <div className="unique-projects-page__project-section">
        <h3 className="unique-projects-page__project-subtitle" onClick={toggleSolutions}>
          Solutions:
          <span className="unique-projects-page__toggle-icon">
            {isSolutionsOpen ? <FaChevronUp /> : <FaChevronDown />}
          </span>
        </h3>
        <ul className={`unique-projects-page__project-list ${isSolutionsOpen ? 'unique-projects-page__project-list--open' : 'unique-projects-page__project-list--collapsed'}`}>
          {solutions.map((solution, idx) => (
            <li key={`sol-${idx}`} className="unique-projects-page__project-list-item">
              {solution}
            </li>
          ))}
        </ul>
      </div>

      {/* Conditional Buttons for UX Projects */}
      {section === 'ux' && screenshots && screenshots.length > 0 && (
        <button
          className="unique-projects-page__project-button"
          onClick={() => openModal(screenshots, title)}
          aria-label={`View screenshots of ${title}`}
        >
          <FaImages className="unique-projects-page__project-icon" />
          View Screenshots
        </button>
      )}

      {/* Conditional Links for Development Projects */}
      {section === 'development' && (github || demo) && (
        <div className="unique-projects-page__project-links">
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="unique-projects-page__project-link"
              aria-label={`View ${title} on GitHub`}
            >
              <FaGithub className="unique-projects-page__project-icon" />
              GitHub
            </a>
          )}
          {demo && demo !== 'N/A' && (
            <a
              href={demo}
              target="_blank"
              rel="noopener noreferrer"
              className="unique-projects-page__project-link"
              aria-label={`View live demo of ${title}`}
            >
              <FaExternalLinkAlt className="unique-projects-page__project-icon" />
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
    <div className="unique-projects-page__container">
      <header className="unique-projects-page__header">
        <h1 className="unique-projects-page__header-title">
          {currentSection === 'development' ? 'Development Projects' : 'UX/UI Projects'}
        </h1>
        <p className="unique-projects-page__header-subtitle">
          Here’s a list of projects I’ve worked on, the challenges I faced, and how I solved them.
        </p>
        <div className="unique-projects-page__toggle">
          <button
            onClick={() => setCurrentSection('development')}
            className={`unique-projects-page__toggle-button ${
              currentSection === 'development' ? 'unique-projects-page__toggle-button--active' : ''
            }`}
            aria-pressed={currentSection === 'development'}
          >
            Development
          </button>
          <button
            onClick={() => setCurrentSection('ux')}
            className={`unique-projects-page__toggle-button ${
              currentSection === 'ux' ? 'unique-projects-page__toggle-button--active' : ''
            }`}
            aria-pressed={currentSection === 'ux'}
          >
            UX/UI
          </button>
        </div>
      </header>

      <main className="unique-projects-page__main">
        <div className="unique-projects-page__grid">
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
          className={`unique-projects-page__modal ${
            modalData.screenshots.length > 0 ? 'unique-projects-page__modal--visible' : ''
          }`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div
            className="unique-projects-page__modal-overlay"
            onClick={closeModal}
            aria-hidden="true"
          ></div>
          <div className="unique-projects-page__modal-content">
            <button
              className="unique-projects-page__modal-close"
              onClick={closeModal}
              aria-label="Close modal"
            >
              &times;
            </button>
            <h3 className="unique-projects-page__modal-title" id="modal-title">
              {modalData.title} Screenshots
            </h3>
            <div className="unique-projects-page__modal-carousel">
              {modalData.screenshots.map((screenshot, idx) => (
                <img
                  key={`modal-screenshot-${idx}`}
                  src={screenshot}
                  alt={`Screenshot ${idx + 1} of ${modalData.title}`}
                  className="unique-projects-page__modal-image"
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
