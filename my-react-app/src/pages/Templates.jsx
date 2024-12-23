// src/pages/Templates.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import './Templates.css'; // Import the custom CSS

const Templates = () => {
  const navigate = useNavigate();

  // Sample data for templates
  const templates = [
    {
      id: 13,
      title: 'Zstal Law',
      description: 'A React and Next.js template for law firms. This template is a modern responsive design that is perfect for a law firm website.',
      imageUrl: '/images/templates/zstal-law.png',
      link: 'https://strong-stroopwafel-fd9377.netlify.app/',
    },
    {
      id: 12,
      title: 'Foodily',
      description: 'A react and next.js template for food services. Simple and clean.',
      imageUrl: '/images/templates/foodily.png',
      link: 'https://steady-phoenix-f34073.netlify.app/',
    },
    {
      id: 10,
      title: 'CoffeHouse',
      description: 'This is an in-house designed template that incorporates Google Firebase for services like authentication, and database storage. It is a simple and elegant design that is perfect for a coffee shop or cafe website. This can also be modified for other business types easily.', 
      imageUrl: '/images/templates/coffehouse2.png',
      link: 'https://mhwdfirebaseserverless.netlify.app/',
    },
    {
      id: 11,
      title: 'HealthCare',
      description: 'Designed in house. This is a React Tailwind CSS template that is perfect for a health care provider. It is a design that is perfect for a health care provider website utilizing calm colors and a clean design.',
      imageUrl: '/images/templates/healthcare.png',
      link: 'https://heroic-pegasus-b45b32.netlify.app/',
    },
    {
      id: 7,
      title: 'Flat',
      description: 'This amazing template is designed for agency, startup, and business websites. Also, Flat comes with a clean, modern, and high-quality design for building an amazing template. This template is versatile, too, as it comes with all the common elements a website needs.',
      imageUrl: '/images/templates/flat.png',
      link: 'https://whimsical-ganache-804813.netlify.app/',
    },
    {
      id: 8,
      title: 'Fancy-Lite',
      description: 'Fancy is a one-page Bootstrap 5 template designed for Business, Agency, Corporate, and Startup websites. It comes with a clean, modern design and all essential business sections/elements powered by the mighty Bootstrap 5.',
      imageUrl: '/images/templates/fancy-lite.png',
      link: 'https://golden-jalebi-135f94.netlify.app/',
    },
    {
      id: 9,
      title: 'Simple',
      description: 'Simple is a Bootstrap template based on the latest version of Bootstrap 5. It is a simple yet complete website template that can be used for any business website. We named it simple because it is simple only with essential elements and features.',
      imageUrl: '/images/templates/simple.png',
      link: 'https://taupe-licorice-bf69ff.netlify.app/',
    },
    {
      id: 4,
      title: 'Upcover',
      description: 'Upcover is a fully responsive, clean, and modern high-converting Next js landing page template. It is a beautifully handcrafted, pixel-perfect Next js landing page template based on the Next 14.x, React 18.x & Tailwind CSS V3.4.1.',
      imageUrl: '/images/templates/upcover.png',
      link: 'https://lambent-lokum-7d6403.netlify.app/',
    },
    {
      id: 1,
      title: 'Startup',
      description: 'Next.js template for startups and SaaS business websites comes with all the essential pages, components, and sections you need to launch a complete business website, built-with Next 13.x and Tailwind CSS.',
      imageUrl: '/images/templates/startup.png', // Ensure these images are in the public/images/templates/ directory
      link: 'https://startupdemo.netlify.app/',
    },
    {
      id: 2,
      title: 'Landy',
      description: 'Beautifully designed templates using React.js, ant design and styled-components! Landy comes with a set of ready to use sections to help you easily create a landing page for your own brand, with all the content your startup desires.',
      imageUrl: '/images/templates/landy.png',
      link: 'https://cute-gaufre-eb0131.netlify.app/',
    },
    {
      id: 3,
      title: 'Material Kit',
      description: 'Material Kit 2 is a comprehensive UI (User Interface) toolkit designed to help developers and designers create stunning, responsive, and modern web applications and websites with ease.',
      imageUrl: '/images/templates/material.png',
      link: 'https://soft-caramel-31dd34.netlify.app/',
    },
    { 
      id: 5,
      title: 'MXapp',
      description: 'MXapp is a one page app landing page react template for your mobile app showcase website. React landing page is a creative way to present their own app or product. It is created with the popular latest responsive bootstrap 5 framework. Designed and developed keeping in mind the latest web design trade. ',
      imageUrl: '/images/templates/mxapp.png',
      link: 'https://startling-palmier-5d995d.netlify.app/',
    },
    {
      id: 6,
      title: 'Base',
      description: 'The base is a high-quality free and premium Tailwind CSS template specially crafted for - startups, Businesses, and Digital agencies. It is perfect for most businesses who want to create a new website quickly, as it comes with all the essential sections and features needed to create a complete website for a business, agency, or startup.',
      imageUrl: '/images/templates/base.png',
      link: 'https://melodious-selkie-ec220a.netlify.app/',
    },
  ];

  return (
    <div className="templates-page">
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Murray Hill Web Development | Templates</title>
        <meta
          name="description"
          content="Explore our collection of professionally designed templates. Choose from a variety of styles to fit your business, e-commerce, blog, and more."
        />
        <meta
          name="keywords"
          content="web templates, business templates, e-commerce templates, blog templates, photography templates, Murray Hill Web Development"
        />
        <meta property="og:title" content="Murray Hill Web Development | Templates" />
        <meta
          property="og:description"
          content="Explore our collection of professionally designed templates. Choose from a variety of styles to fit your business, e-commerce, blog, and more."
        />
        <meta property="og:image" content="%PUBLIC_URL%/images/templates/og_template.png" />
        <meta property="og:url" content="https://murrayhillwebdevelopment.com/templates" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Murray Hill Web Development | Templates" />
        <meta
          name="twitter:description"
          content="Explore our collection of professionally designed templates. Choose from a variety of styles to fit your business, e-commerce, blog, and more."
        />
        <meta name="twitter:image" content="%PUBLIC_URL%/images/templates/twitter_template.png" />
      </Helmet>

      <header className="templates-page__header text-center">
        <h1 className="templates-page__title">Our Templates</h1>
        <p className="templates-page__subtitle">
          Browse through our professionally designed templates and find the perfect fit for your project. Or we can create a custom design just for you!
        </p>
      </header>

      <main className="templates-page__main">
        <Container fluid>
          <Row className="gx-0 gy-4">
            {templates.map((template) => (
              <Col key={template.id} xs={12} sm={6} md={4} lg={3}>
                <Card className="template-card h-100">
                  <Card.Img
                    variant="top"
                    src={template.imageUrl}
                    alt={`${template.title} Preview`}
                    className="template-card__image"
                  />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="template-card__title">{template.title}</Card.Title>
                    <Card.Text className="template-card__description">{template.description}</Card.Text>
                    <div className="mt-auto">
                      <Button
                        variant="primary"
                        href={template.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="template-card__button"
                        aria-label={`View ${template.title}`}
                      >
                        Live Preview
                        {/* Inline SVG Icon */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="button-icon"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path d="M14 3h7v7h-2V6.414l-9.293 9.293-1.414-1.414L18.586 5H14V3z" />
                          <path d="M5 5v14h14v-7h-2v5H7V7h5V5H5z" />
                        </svg>
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </main>

      {/* Technology Description Section as Footer */}
      {/* Uncomment the footer section if you need it */}
      {/* <footer
        className="templates-page__footer mt-4"
        style={{ fontSize: '0.9rem', color: 'var(--primary-color)' }}
      >
        <div className="container text-center">
          <div style={{ marginBottom: '0.5rem' }}>
            <p>
              <strong>Front End:</strong> React, Redux, Node.js, React Router Dom, Bcrypt, JWT, React Bootstrap, Axios, Google OAuth Identity Provider Login
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
      </footer> */}
    </div>
  );
};

export default Templates;
