// src/components/Services.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Services.css'; // Import the corresponding CSS

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
        'I specialize in designing and developing modern, responsive static websites tailored to your unique needs. Our focus is on creating efficient, scalable, and user-friendly applications that not only look great but also perform seamlessly across all devices.',
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
      <header className="services-page__header">
        <h1>Services</h1>
        <p>Choose the package that best fits your needs and let’s build something great together!</p>
      </header>

      <main className="services-page__main">
        {servicesData.map((section, sectionIndex) => (
          <section className="services-page__section" key={sectionIndex}>
            <h2 className="services-page__subtitle">{section.sectionTitle}</h2>
            {section.description && <p className="services-page__description">{section.description}</p>}
            {section.packages && (
              <div className="services-page__packages">
                {section.packages.map((pkg, pkgIndex) => (
                  <div className="services-page__package" key={pkgIndex}>
                    <div className="services-page__package-content">
                      <h3 className="services-page__package-title">{pkg.title}</h3>
                      {pkg.price && <p className="services-page__package-price">{pkg.price}</p>}
                      <ul className="services-page__package-features">
                        {pkg.features.map((feature, featureIndex) => (
                          typeof feature === 'string' ? (
                            <li key={featureIndex}>{feature}</li>
                          ) : (
                            <div key={featureIndex}>
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
                        <div className="services-page__package-addons">
                          <h4>Add-Ons Available:</h4>
                          <ul>
                            {pkg.addons.map((addon, addonIndex) => (
                              <li key={addonIndex}>{addon}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                    <button
                      className="services-page__contact-button"
                      onClick={() => handleContact(pkg.title)}
                    >
                      Contact Me
                    </button>
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
