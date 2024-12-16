// src/pages/About.jsx

import React from 'react';
import { Helmet } from 'react-helmet-async'; // Import Helmet for SEO
import './About.css'; // Import the corresponding CSS

const About = () => {
  return (
    <div className="about-page">
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Murray Hill Web Development | About Me</title>
        <meta
          name="description"
          content="Learn more about David Stein, a passionate full-stack developer and US Army Veteran at Murray Hill Web Development. Discover his skills, expertise, and what drives him to create exceptional web solutions."
        />
        <meta
          name="keywords"
          content="about me, David Stein, web developer, full-stack development, UX/UI design, US Army Veteran, Murray Hill, web development services, Jacksonville FL"
        />
        <meta property="og:title" content="Murray Hill Web Development | About Me" />
        <meta
          property="og:description"
          content="Learn more about David Stein, a passionate full-stack developer and US Army Veteran at Murray Hill Web Development. Discover his skills, expertise, and what drives him to create exceptional web solutions."
        />
        <meta property="og:image" content="%PUBLIC_URL%/images/mhwd_about_og_image.svg" />
        <meta property="og:url" content="https://murrayhillwebdevelopment.com/about" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Murray Hill Web Development | About Me" />
        <meta
          name="twitter:description"
          content="Learn more about David Stein, a passionate full-stack developer and US Army Veteran at Murray Hill Web Development. Discover his skills, expertise, and what drives him to create exceptional web solutions."
        />
        <meta name="twitter:image" content="%PUBLIC_URL%/images/mhwd_about_twitter_image.svg" />

        {/* Structured Data for SEO */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "David Stein",
              "jobTitle": "Full Stack Developer",
              "worksFor": {
                "@type": "Organization",
                "name": "Murray Hill Web Development",
                "url": "https://murrayhillwebdevelopment.com"
              },
              "description": "David Stein is a passionate full-stack developer and US Army Veteran specializing in creating efficient, scalable, and user-friendly web applications. With a background in UX/UI design, David bridges the gap between design and development to deliver exceptional web solutions.",
              "alumniOf": [
                {
                  "@type": "EducationalOrganization",
                  "name": "University of North Florida - Full Stack Academy"
                },
                {
                  "@type": "EducationalOrganization",
                  "name": "University of Denver"
                },
                {
                  "@type": "EducationalOrganization",
                  "name": "Colorado State University – Global"
                },
                {
                  "@type": "EducationalOrganization",
                  "name": "Florida International University"
                }
              ],
              "knowsAbout": ["React", "Node.js", "Express", "MySQL", "Postgres", "JWT", "OAuth", "Azure", "AWS"],
              "url": "https://murrayhillwebdevelopment.com/about",
              "image": "%PUBLIC_URL%/images/david_stein_profile.jpg"
            }
          `}
        </script>
      </Helmet>

      <header className="about-page__header text-center mb-5">
        <h1>About Me</h1>
      </header>

      <main className="about-page__main container">
        {/* Introduction Section */}
        <section className="about-page__intro mb-5">
          <h2 className="about-page__subtitle">Who I Am</h2>
          <p>
            Hi, I’m David, a passionate software developer and US Army Veteran with a strong interest in creating efficient, scalable, and user-friendly applications.
            My journey into development started as a UX/UI designer who recognized that there was a discontent between design and development.
            I decided to bridge that gap by learning to code and becoming a full-stack developer, where I was able to seamlessly transition my design skills into development.
          </p>
          <p>
            Your website has the potential to be more than just a static online presence. It can become a powerful tool to drive growth and success for your business.
            From managing inventory and users to handling photos, sales, and more, your website can be a dynamic solution tailored to your needs.
          </p>
          <p>
            What interests me the most is problem-solving and creating. Learning to build something new and seeing it come to life is what drives me.
          </p>
        </section>

        {/* Skills & Expertise Section */}
        <section className="about-page__skills mb-5">
          <h2 className="about-page__subtitle">Skills & Expertise</h2>
          <ul className="about-page__skills-list">
            <li>Proficient in modern web technologies like React, Node.js, and Express.</li>
            <li>Experienced in database management with MySQL and Postgres.</li>
            <li>Skilled in implementing secure authentication systems using JWT and OAuth.</li>
            <li>Strong understanding of responsive design and accessibility principles.</li>
            <li>Comfortable working with CI/CD pipelines and cloud services like Azure and AWS.</li>
          </ul>
        </section>

        {/* What Drives Me Section */}
        <section className="about-page__values mb-5">
          <h2 className="about-page__subtitle">What Drives Me</h2>
          <p>
            I am fueled by a passion for problem-solving and a dedication to continuous learning. From crafting intuitive user interfaces to enhancing backend efficiency,
            I find joy in every aspect of the development process.
          </p>
          <p>
            Give me a project and watch me bring it to life. I am always eager to take on new challenges and grow my skill set.
          </p>
        </section>

        {/* Call to Action Section */}
        <section className="about-page__cta text-center">
          <h2 className="about-page__subtitle">Let’s Work Together</h2>
          <p>
            Feel free to explore my portfolio and reach out if you’d like to collaborate on a project or have any questions. I’m always excited to connect with like-minded individuals and organizations.
          </p>
          <a href="/contact" className="btn btn-primary about-page__cta-link">
            Contact Me
          </a>
        </section>
      </main>
    </div>
  );
};

export default About;
