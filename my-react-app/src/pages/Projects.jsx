import { useState, React } from 'react';

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
      'Created a backend google auth and callback to handle user authentication.', 
      'Implemented React Router and tested route-based navigation extensively.',
      'Updated the CORS configuration to allow requests from multiple origins.',
      'Configured DNS records with Netlify and added a custom domain.',
    ],
    github: 'https://github.com/dstein131/murryhillfedesign', // GitHub repo link
    demo: 'https://murrayhillwebdesign.netlify.app/', // Live demo URL
  },
  {
    title: 'Main Website - Backend',
    description: 'A node/express backend for my personal site.',
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
    github: 'https://github.com/dstein131/Main', // GitHub repo link
    demo: 'maindb-a2dugpdndze5d9br.canadacentral-01.azurewebsites.net', // Live demo URL
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
        'Implemented FusoinAuth to handle SSO for the various SRI, Inc. web properties.',
        'Utilized Bootstrap and custom CSS to create a responsive design.',
        'Conducted user testing and feedback sessions to refine the interface.',
        'Designed a dashboard with React and Redux for state management.',
    ],
    github: 'https://github.com/dstein131/sri_services_web_node', // GitHub repo link
    demo: 'https://sriserviceswebsiteimpl.azurewebsites.net/', // Live demo URL
    },
    {
    title: 'SRI, Inc - Backend',
    description: 'A Node.js backend for the SRI, Inc. web properties.',
    difficulties: [
      'Integrating FusionAuth with the backend for SSO.',
      'Creating a RESTful API to interact with the frontend.',
      'Creating a MySQL database to store user and site data.',
      'Connecting to three different databases to retireive, sort, normalize, and store data to be used by the frontend.',
    ],
    solutions: [
        'Configured FusionAuth to handle SSO and user authentication.',
        'Designed a RESTful API with Express to interact with the frontend.',
        'Created a MySQL database schema and connected it to the app.',
        'Utilized multiple database connections to retrieve, sort, normalize, and store data.',
        ],
    github: 'https://github.com/dstein131/UserMgmt', // GitHub repo link
    demo: 'https://usermgmtwebappimpl.azurewebsites.net/', // Live demo URL
    },
    {
    title: 'Discord Bot',
    description: 'A Discord bot to manage and moderate a server.',
    difficulties: [
      'First time using python or creating a bot.',
      'Creating a bot that could be used by multiple servers.',
      'Creating a method to avoid spam and other unwanted behavior.',
    ],
    solutions: [
        'Utilized the discord.py library to create a bot that could be used by multiple servers.',
        'Implemented methods to avoid spam and other unwanted behavior.',
        'Created other fun commands to keep users engaged.',
    ],
    github: 'https://github.com/dstein131/clip_bot', // GitHub repo link
    demo: 'N/A', // Live demo URL
    }
];

const uxProjects = [
    {
      title: 'Lien Assist Program',
      description: 'UX/UI design for a web app designed to assist County employees in managing liens.',
      difficulties: ['Creating a user-friendly dashboard for users who are not tech-savvy.'],
      solutions: ['Interviewed users to understand their needs and pain points.', 'Designed a simple and intuitive dashboard with XD.'],
      screenshots: [
        'https://i.imgur.com/HMCKuec.png',
        'https://i.imgur.com/sDM9SAf.png',
      ],
    },
    {
      title: 'Masterfile Portal',
      description: 'A mobile friendly slimmed down county management system for user to use while in the field.',
      difficulties: ['Organizing the many tables and forms into a mobile friendly format that also allowed for easy data entry and review.'],
      solutions: ['Create a tabbed based system that allowed for easy navigation and data entry.', 'Utilized programtic review of data to ensure data was entered correctly.'],
      screenshots: [
        'https://i.imgur.com/ixWNQ0K.png',
        'https://i.imgur.com/0yhnmSb.png',
        'https://i.imgur.com/z8cicK0.png',

      ],
    },
    // Add more UX/UI projects...
  ];
    
  const Projects = () => {
    const [currentSection, setCurrentSection] = useState('development');
    const [modalVisible, setModalVisible] = useState(false);
    const [currentScreenshots, setCurrentScreenshots] = useState([]);
    const [currentProject, setCurrentProject] = useState('');
  
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
        <header className="projects-page__header">
          <h1>{currentSection === 'development' ? 'Development Projects' : 'UX/UI Projects'}</h1>
          <p>Here’s a list of projects I’ve worked on, the challenges I faced, and how I solved them.</p>
          <div className="projects-page__toggle">
            <button
              onClick={() => setCurrentSection('development')}
              className={`toggle-button ${currentSection === 'development' ? 'active' : ''}`}
              style={{ margin: '2rem' }}
            >
              Development Projects
            </button>
            <button
              onClick={() => setCurrentSection('ux')}
              className={`toggle-button ${currentSection === 'ux' ? 'active' : ''}`}
              style={{ margin: '2rem' }}
            >
              UX/UI Projects
            </button>
          </div>
        </header>
        <main className="projects-page__main">
          {projectsToDisplay.map((project, index) => (
            <div key={index} className="project-card">
              <h2 className="project-card__title">{project.title}</h2>
              <p className="project-card__description">{project.description}</p>
              <h3 className="project-card__subtitle">Challenges:</h3>
              <ul className="project-card__list">
                {project.difficulties.map((difficulty, idx) => (
                  <li key={idx}>{difficulty}</li>
                ))}
              </ul>
              <h3 className="project-card__subtitle">Solutions:</h3>
              <ul className="project-card__list">
                {project.solutions.map((solution, idx) => (
                  <li key={idx}>{solution}</li>
                ))}
              </ul>
              {currentSection === 'ux' && (
                <button
                  onClick={() => openModal(project.screenshots, project.title)}
                  className="project-card__button"
                >
                  View Screenshots
                </button>
              )}
              {currentSection === 'development' && (
                <div className="project-card__links">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-card__link">
                      View on GitHub
                    </a>
                  )}
                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noopener noreferrer" className="project-card__link">
                      Live Demo
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}
        </main>
        {modalVisible && (
          <div className="ssmodal">
            <div className="ssmodal__overlay" onClick={closeModal}></div>
            <div className="ssmodal__content">
              <button className="ssmodal__close" onClick={closeModal}>
                &times;
              </button>
              <h2 className="ssmodal__title">Screenshots for {currentProject}</h2>
              <div className="ssmodal__images">
                {currentScreenshots.map((screenshot, idx) => (
                  <img
                    key={idx}
                    src={screenshot}
                    alt={`Screenshot of ${currentProject} - Image ${idx + 1}`}
                    className="ssmodal__image"
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