// src/pages/Projects.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async'; // Import Helmet for SEO

import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported

const devProjects = [
  {
    title: 'Murray Hill Web Design - Frontend',
    description: 'A personal portfolio site to showcase my skills and projects.',
    difficulties: [
      'Integrating Google OAuth for user authentication.',
      'Integrating dynamic routing with React Router.',
      'Deploying the site with Netlify and handling CORS issues.',
      'Setting up DNS records and configuring custom domains.',
    ],
    solutions: [
      'Created a backend Google Auth and callback to handle user authentication.',
      'Implemented React Router and tested route-based navigation extensively.',
      'Updated the CORS configuration to allow requests from multiple origins.',
      'Configured DNS records with Netlify and added a custom domain.',
    ],
    github: 'https://github.com/dstein131/murryhillfedesign',
    demo: 'https://murrayhillwebdesign.netlify.app/',
  },
  {
    title: 'Main Website - Backend',
    description: 'A Node.js/Express backend for my personal site.',
    difficulties: [
      'Creating a CI/CD pipeline with GitHub Actions to Azure App Service.',
      'Implementing a RESTful API for the frontend to consume.',
      'Securing the API with JWT authentication and authorization.',
      'Setting up a MySQL database and hosting it on AWS RDS.',
    ],
    solutions: [
      'Configured a GitHub Actions workflow to build and deploy the app on Azure.',
      'Designed a RESTful API with Express and tested it with Postman.',
      'Implemented JWT authentication middleware to protect routes.',
      'Created a MySQL database schema and connected it to the app.',
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
      'Designed a simple and intuitive dashboard with XD.',
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

const Projects = () => {
  const [currentSection, setCurrentSection] = useState('development');
  const [modalVisible, setModalVisible] = useState(false);
  const [currentScreenshots, setCurrentScreenshots] = useState([]);
  const [currentProject, setCurrentProject] = useState('');

  const navigate = useNavigate();

  const projectsToDisplay = currentSection === 'development' ? devProjects : uxProjects;

  const openModal = (screenshots, title) => {
    setCurrentScreenshots(screenshots);
    setCurrentProject(title);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setCurrentScreenshots([]);
    setCurrentProject('');
  };

  return (
    <div className="projects-page">
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Murray Hill Web Development | Projects</title>
        <meta
          name="description"
          content="Explore the diverse range of development and UX/UI projects undertaken by Murray Hill Web Development. Discover the challenges faced and solutions implemented in each project."
        />
        <meta
          name="keywords"
          content="projects, web development projects, UX/UI projects, React projects, Node.js projects, Discord bot, full-stack development, Murray Hill, Jacksonville FL"
        />
        <meta property="og:title" content="Murray Hill Web Development | Projects" />
        <meta
          property="og:description"
          content="Explore the diverse range of development and UX/UI projects undertaken by Murray Hill Web Development. Discover the challenges faced and solutions implemented in each project."
        />
        <meta property="og:image" content="%PUBLIC_URL%/images/mhwd_projects_og_image.svg" />
        <meta property="og:url" content="https://murrayhillwebdevelopment.com/projects" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Murray Hill Web Development | Projects" />
        <meta
          name="twitter:description"
          content="Explore the diverse range of development and UX/UI projects undertaken by Murray Hill Web Development. Discover the challenges faced and solutions implemented in each project."
        />
        <meta name="twitter:image" content="%PUBLIC_URL%/images/mhwd_projects_twitter_image.svg" />

        {/* Structured Data for SEO */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "ItemList",
              "name": "Projects",
              "description": "A collection of development and UX/UI projects by Murray Hill Web Development.",
              "itemListElement": [
                ${devProjects
                  .concat(uxProjects)
                  .map(
                    (project, index) => `
                  {
                    "@type": "ListItem",
                    "position": ${index + 1},
                    "item": {
                      "@type": "CreativeWork",
                      "name": "${project.title}",
                      "description": "${project.description}",
                      "url": "${project.demo !== 'N/A' ? project.demo : project.github}",
                      "author": {
                        "@type": "Person",
                        "name": "David Stein"
                      }
                    }
                  }
                `
                  )
                  .join(',')}
              ]
            }
          `}
        </script>
      </Helmet>

      <header className="projects-page__header text-center mb-5">
        <h1>{currentSection === 'development' ? 'Development Projects' : 'UX/UI Projects'}</h1>
        <p>Here’s a list of projects I’ve worked on, the challenges I faced, and how I solved them.</p>
        <div className="projects-page__toggle mb-4">
          <button
            onClick={() => setCurrentSection('development')}
            className={`btn btn-outline-primary mx-2 ${currentSection === 'development' ? 'active' : ''}`}
            aria-pressed={currentSection === 'development'}
          >
            Development Projects
          </button>
          <button
            onClick={() => setCurrentSection('ux')}
            className={`btn btn-outline-secondary mx-2 ${currentSection === 'ux' ? 'active' : ''}`}
            aria-pressed={currentSection === 'ux'}
          >
            UX/UI Projects
          </button>
        </div>
      </header>

      <main className="projects-page__main container">
        {projectsToDisplay.map((project, index) => (
          <div key={index} className="project-card card mb-4">
            <div className="card-body d-flex flex-column">
              <h2 className="project-card__title card-title">{project.title}</h2>
              <p className="project-card__description card-text">{project.description}</p>

              <h3 className="project-card__subtitle">Challenges:</h3>
              <ul className="project-card__list list-unstyled">
                {project.difficulties.map((difficulty, idx) => (
                  <li key={idx}>&#8226; {difficulty}</li>
                ))}
              </ul>

              <h3 className="project-card__subtitle">Solutions:</h3>
              <ul className="project-card__list list-unstyled">
                {project.solutions.map((solution, idx) => (
                  <li key={idx}>&#8226; {solution}</li>
                ))}
              </ul>

              {currentSection === 'ux' && project.screenshots && project.screenshots.length > 0 && (
                <button
                  onClick={() => openModal(project.screenshots, project.title)}
                  className="btn btn-info mt-auto project-card__button"
                >
                  View Screenshots
                </button>
              )}

              {currentSection === 'development' && (
                <div className="project-card__links mt-3">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline-dark me-2"
                    >
                      View on GitHub
                    </a>
                  )}
                  {project.demo === 'N/A' ? (
                    <button
                      className="btn btn-outline-secondary"
                      disabled
                      aria-disabled="true"
                      title="Demo Not Available"
                    >
                      Demo Not Available
                    </button>
                  ) : (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline-success"
                    >
                      Live Demo
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </main>

      {/* Modal for Screenshots */}
      {modalVisible && (
        <div className="ssmodal">
          <div className="ssmodal__overlay" onClick={closeModal} aria-label="Close Screenshot Modal"></div>
          <div className="ssmodal__content" role="dialog" aria-modal="true" aria-labelledby="ssmodal-title">
            <button className="ssmodal__close btn btn-danger" onClick={closeModal} aria-label="Close">
              &times;
            </button>
            <h2 id="ssmodal-title" className="ssmodal__title">
              Screenshots for {currentProject}
            </h2>
            <div className="ssmodal__images row">
              {currentScreenshots.map((screenshot, idx) => (
                <div key={idx} className="col-md-6 mb-3">
                  <img
                    src={screenshot}
                    alt={`Screenshot of ${currentProject} - Image ${idx + 1}`}
                    className="img-fluid ssmodal__image"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
