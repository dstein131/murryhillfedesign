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
        id: 5,
           title: 'MXapp',
           description: 'MXapp is a one page app landing page react template for your mobile app showcase website. React landing page is a creative way to present their own app or product. It is created with the popular latest responsive bootstrap 5 framework. Designed and developed keeping in mind the latest web design trade. The code is very clean, easy to use and developer friendly which would be so easy for any engineer to customize.',
           imageUrl: '/images/templates/mxapp.png',
           link: 'https://startling-palmier-5d995d.netlify.app/',
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
        <Container>
          <Row>
            {templates.map((template) => (
              <Col key={template.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
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
