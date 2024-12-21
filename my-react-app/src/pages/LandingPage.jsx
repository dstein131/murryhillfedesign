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
      </main>

      {/* Redesigned Footer */}
      <footer className="landing-page__footer mt-4">
        <div className="container d-flex justify-content-between align-items-center">
          {/* Business Information */}
          <div className="footer__company">
            <strong>Murray Hill Web Development, L.L.C.</strong>
            <span className="footer__phone"> | 📞 <a href="tel:9043839688">904.383.9688</a></span>
          </div>

          {/* Social Media */}
          <div className="footer__social">
            <a href="https://www.facebook.com/people/Murray-Hill-Web-Development/61570886608543/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              {/* Facebook SVG Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="var(--footer-link-color)"
                className="facebook-icon"
              >
                <path d="M22.675 0h-21.35C.596 0 0 .597 0 1.333v21.333C0 23.403.596 24 1.325 24h11.495v-9.294H9.691v-3.622h3.129V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.464.099 2.795.143v3.24l-1.918.001c-1.504 0-1.796.716-1.796 1.764v2.312h3.587l-.467 3.622h-3.12V24h6.116C23.404 24 24 23.403 24 22.667V1.333C24 .597 23.404 0 22.675 0z" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
