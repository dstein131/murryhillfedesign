// src/components/Services.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async'; // Import Helmet for SEO
import './Services.css'; // Import the corresponding CSS
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported

const Services = () => {
  const navigate = useNavigate();

  // Function to handle contact button click
  const handleContact = (serviceName) => {
    // Navigate to the Contact page with a query parameter indicating the selected service
    navigate(`/contact?service=${encodeURIComponent(serviceName)}`);
  };

  // Services Data
  const servicesData = [
    {
      sectionTitle: 'Project Overview',
      description:
        'I specialize in designing and developing modern, responsive static websites tailored to your unique needs. My focus is on creating efficient, scalable, and user-friendly applications that not only look great but also perform seamlessly across all devices.',
    },
    {
      sectionTitle: 'Pricing Packages',
      packages: [
        {
          title: 'Basic Package',
          price: '$500',
          features: [
            'Up to 3 pages (Home, About, Contact)',
            'Professional template with light customization',
            'Basic mobile responsiveness',
            'Integration of a contact form',
            'Delivery Time: 1 week',
          ],
          addons: [
            'Additional Pages: $100/page',
            'Hosting Setup: $50',
          ],
        },
        {
          title: 'Standard Package',
          price: '$1,500',
          features: [
            'Up to 5 custom-designed pages',
            'Fully responsive design (desktop, tablet, mobile)',
            'Custom CSS animations and interactive elements',
            'Basic SEO optimization (meta tags, alt attributes)',
            'Delivery Time: 2–3 weeks',
          ],
          addons: [
            'Blog or Portfolio Section: $200',
            'Hosting & Domain Setup: $50',
          ],
        },
        {
          title: 'Premium Package',
          price: '$3,000+',
          features: [
            'Up to 10 custom pages with advanced layouts and features',
            'High-quality, custom graphics or image editing',
            'Integration with third-party tools (e.g., MailChimp, Google Analytics)',
            'Enhanced SEO optimization',
            'Accessibility Features (WCAG compliance)',
            'Delivery Time: 3–4 weeks',
          ],
          addons: [
            'E-commerce Features: $500+',
            'Content Creation: $200–$400',
          ],
        },
      ],
    },
    {
      sectionTitle: 'Advanced Static Website Packages',
      packages: [
        {
          title: 'Tier 1: Intermediate Advanced Site',
          price: '$3,000+',
          features: [
            'Up to 10 pages with advanced layouts and interactive elements (e.g., galleries, modals)',
            'Custom graphics and CSS animations',
            'Integration with external tools (e.g., Google Analytics, email marketing platforms)',
            'Fully responsive design (desktop, tablet, mobile)',
            'Basic SEO optimization',
            'Social media integration (e.g., share buttons, feeds)',
            'Delivery Time: 3–4 weeks',
          ],
          addons: [],
        },
        {
          title: 'Tier 2: Full Advanced Static Site',
          price: '$5,000+',
          features: [
            'Up to 15 custom-designed pages',
            'Advanced features such as search functionality, video embedding, advanced animations or parallax effects',
            'Enhanced SEO optimization for better ranking potential',
            'Website Accessibility (WCAG compliance for ADA standards)',
            'Delivery Time: 4–6 weeks',
          ],
          addons: [
            'E-commerce Features (Product Listings, Static Cart): $500–$2,000',
            'API Integrations (e.g., weather data, stock market feeds): $300–$800+',
            'Membership Pages (Password-Protected): $200–$500',
            'Content Creation (Copy, Stock Images, Blog Posts): $300–$1,000',
          ],
        },
      ],
    },
    {
      sectionTitle: 'Hosting, Deployment, and Monthly Maintenance',
      packages: [
        {
          title: 'Hosting & Domain Setup',
          price: '',
          features: [
            'Basic Setup: $50 (one-time)',
            'Assistance with hosting platforms like GitHub Pages, Netlify, or Vercel',
            'Managed Hosting (Optional): $20/month + hosting fees',
          ],
          addons: [],
        },
        {
          title: 'Monthly Maintenance Plans',
          price: '',
          features: [
            {
              heading: 'Basic Maintenance - $100/month:',
              items: [
                'Monitoring uptime and basic functionality',
                'Minor updates to existing content (text, images, links)',
                'Monthly backups',
              ],
            },
            {
              heading: 'Standard Maintenance - $250/month:',
              items: [
                'Everything in Basic Plan',
                'Adding or modifying small features (e.g., a new section or page updates)',
                'Regular SEO audits and updates to improve search rankings',
                'Security checks and fixes',
              ],
            },
            {
              heading: 'Premium Maintenance - $500/month:',
              items: [
                'Everything in Standard Plan',
                'Adding custom features (e.g., new galleries or forms)',
                'Priority support (faster response times)',
                'Advanced analytics and performance optimization',
              ],
            },
          ],
          addons: [],
        },
        {
          sectionTitle: 'Add-On Monthly Services',
          packages: [
            {
              title: 'Add-On Monthly Services',
              price: '',
              features: [
                'Content Creation (e.g., blog posts, image galleries): $50–$200 per post',
                'SEO Optimization: $100/month for ongoing keyword updates and reporting',
                'Third-Party Tool Management (e.g., Mailchimp, Analytics): $50–$100/month',
              ],
              addons: [],
            },
          ],
        },
      ],
    },
  ];

  // Function to render features
  const renderFeatures = (features) => {
    if (Array.isArray(features)) {
      return features.map((feature, idx) => <li key={idx}>{feature}</li>);
    } else if (typeof features === 'object') {
      return features.items.map((item, idx) => <li key={idx}>{item}</li>);
    }
    return null;
  };

  return (
    <div className="services-page">
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Murray Hill Web Development | Services</title>
        <meta
          name="description"
          content="Discover the range of web development services offered by Murray Hill Web Development. From basic to premium packages, we provide tailored solutions to meet your business needs."
        />
        <meta
          name="keywords"
          content="web development services, Murray Hill, static websites, responsive design, SEO optimization, hosting, maintenance, custom websites, Jacksonville FL"
        />
        <meta property="og:title" content="Murray Hill Web Development | Services" />
        <meta
          property="og:description"
          content="Explore the comprehensive web development services offered by Murray Hill Web Development. Choose from a variety of packages tailored to your specific needs."
        />
        <meta property="og:image" content="%PUBLIC_URL%/images/mhwd_services_og_image.svg" />
        <meta property="og:url" content="https://murrayhillwebdevelopment.com/services" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Murray Hill Web Development | Services" />
        <meta
          name="twitter:description"
          content="Explore the comprehensive web development services offered by Murray Hill Web Development. Choose from a variety of packages tailored to your specific needs."
        />
        <meta name="twitter:image" content="%PUBLIC_URL%/images/mhwd_services_twitter_image.svg" />
      </Helmet>

      <header className="services-page__header text-center mb-5">
        <h1>Our Services</h1>
        <p>Choose the package that best fits your needs and let’s build something great together!</p>
      </header>

      <main className="services-page__main container">
        {servicesData.map((section, sectionIndex) => (
          <section className="services-page__section mb-5" key={sectionIndex}>
            <h2 className="services-page__subtitle mb-3">{section.sectionTitle}</h2>
            {section.description && <p className="services-page__description mb-4">{section.description}</p>}
            {section.packages && (
              <div className="services-page__packages row">
                {section.packages.map((pkg, pkgIndex) => (
                  <div className="col-md-6 mb-4" key={pkgIndex}>
                    <div className="services-page__package card h-100">
                      <div className="card-body d-flex flex-column">
                        <h3 className="services-page__package-title card-title">{pkg.title}</h3>
                        {pkg.price && <p className="services-page__package-price card-text"><strong>Price:</strong> {pkg.price}</p>}
                        <ul className="services-page__package-features list-unstyled flex-grow-1">
                          {pkg.features.map((feature, featureIndex) => (
                            typeof feature === 'string' ? (
                              <li key={featureIndex}>{feature}</li>
                            ) : (
                              <div key={featureIndex} className="mb-2">
                                <strong>{feature.heading}</strong>
                                <ul>
                                  {feature.items.map((item, itemIndex) => (
                                    <li key={itemIndex}>{item}</li>
                                  ))}
                                </ul>
                              </div>
                            )
                          ))}
                        </ul>
                        {pkg.addons && pkg.addons.length > 0 && (
                          <div className="services-page__package-addons mt-3">
                            <h4>Add-Ons Available:</h4>
                            <ul className="list-unstyled">
                              {pkg.addons.map((addon, addonIndex) => (
                                <li key={addonIndex}>{addon}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        <button
                          className="btn btn-primary mt-auto services-page__contact-button"
                          onClick={() => handleContact(pkg.title)}
                        >
                          Contact Me
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        ))}
      </main>
    </div>
  );
};

export default Services;
