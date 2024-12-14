import React from 'react';

const projects = [
  {
    title: 'Portfolio Website',
    description: 'A personal portfolio site to showcase my skills and projects.',
    difficulties: [
      'Integrating dynamic routing with React Router.',
      'Deploying the site with Netlify and handling CORS issues.',
    ],
    solutions: [
      'Implemented React Router and tested route-based navigation extensively.',
      'Updated the CORS configuration to allow requests from multiple origins.',
    ],
    github: 'https://github.com/yourusername/portfolio-website', // GitHub repo link
    demo: 'https://murrayhillwebdesign.netlify.app/', // Live demo URL
  },
  {
    title: 'E-commerce Platform',
    description: 'A fully-featured e-commerce platform with payment integration.',
    difficulties: [
      'Managing complex state for the shopping cart and product filters.',
      'Integrating secure payment gateways like Stripe.',
    ],
    solutions: [
      'Utilized Redux for state management, ensuring seamless user experience.',
      'Followed Stripe documentation and sandbox testing to integrate payments.',
    ],
    github: 'https://github.com/yourusername/e-commerce-platform', // GitHub repo link
    demo: 'https://ecommerce-platform-demo.netlify.app/', // Live demo URL
  },
  // Add more projects here
];

const Projects = () => {
  return (
    <div className="projects-page">
      <header className="projects-page__header">
        <h1>My Projects</h1>
        <p>Here’s a list of projects I’ve worked on, the challenges I faced, and how I solved them.</p>
      </header>
      <main className="projects-page__main">
        {projects.map((project, index) => (
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
            <div className="project-card__links">
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-card__link">
                View on GitHub
              </a>
              <a href={project.demo} target="_blank" rel="noopener noreferrer" className="project-card__link">
                Live Demo
              </a>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default Projects;
