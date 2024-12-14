import React from 'react';
import { useNavigate } from 'react-router-dom';


const LandingPage = () => {
  const navigate = useNavigate();

  const sections = [
    { title: 'About Me', description: 'Learn more about who I am and what I do.', route: '/about' },
    { title: 'Resume', description: 'View my professional experience and skills.', route: '/resume' },
    { title: 'Projects', description: 'Explore the apps and projects I’ve worked on.', route: '/projects' },
    { title: 'Music', description: 'Music I love', route: '/must' },
    // { title: 'Contact', description: 'Get in touch with me.', route: '/contact' },
  ];

  return (
    <div className="landing-page">
      <header className="landing-page__header">
        <h1 className="landing-page__title">Murray Hill Web Development</h1>
        <p className="landing-page__subtitle">
          A showcase of my work, skills, and journey as a developer and a person.
        </p>
      </header>
      <main className="landing-page__main">
        <div className="dashboard">
          {sections.map((section, index) => (
            <div
              key={index}
              className="dashboard__card"
              onClick={() => navigate(section.route)}
            >
              <h2 className="dashboard__card-title">{section.title}</h2>
              <p className="dashboard__card-description">{section.description}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
