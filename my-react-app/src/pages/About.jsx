import React, { memo } from 'react';
import { Helmet } from 'react-helmet-async'; // Import Helmet for SEO
import './About.css'; // Import the corresponding CSS

// Reusable Subtitle Component
const Subtitle = memo(({ text }) => (
  <h2 className="about-page__subtitle">{text}</h2>
));

// Reusable List Component for Skills
const SkillsList = memo(({ skills }) => (
  <ul className="about-page__skills-list">
    {skills.map((skill, idx) => (
      <li key={idx}>{skill}</li>
    ))}
  </ul>
));

const About = () => {
  const skills = [
    'Proficient in modern web technologies like React, Node.js, and Express.',
    'Experienced in database management with MySQL and Postgres.',
    'Skilled in implementing secure authentication systems using JWT and OAuth.',
    'Strong understanding of responsive design and accessibility principles.',
    'Comfortable working with CI/CD pipelines and cloud services like Azure and AWS.',
  ];

  return (
    <div className="about-page" style={{ overflowX: 'hidden' }}>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Murray Hill Web Development | About Me</title>
        <meta
          name="description"
          content="Learn more about David Stein, a passionate full-stack developer and US Army Veteran at Murray Hill Web Development. Discover his skills, expertise, and what drives him to create exceptional web solutions."
        />
        <meta name="keywords" content="about me, David Stein, web developer, full-stack development, UX/UI design, US Army Veteran, Murray Hill, web development services, Jacksonville FL" />
        <meta property="og:title" content="Murray Hill Web Development | About Me" />
        <meta property="og:description" content="Learn more about David Stein, a passionate full-stack developer and US Army Veteran at Murray Hill Web Development." />
        <meta property="og:image" content="%PUBLIC_URL%/images/mhwd_about_og_image.svg" />
        <meta property="og:url" content="https://murrayhillwebdevelopment.com/about" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Murray Hill Web Development | About Me" />
        <meta name="twitter:description" content="Learn more about David Stein, a passionate full-stack developer and US Army Veteran at Murray Hill Web Development." />
        <meta name="twitter:image" content="%PUBLIC_URL%/images/mhwd_about_twitter_image.svg" />
      </Helmet>

      {/* Page Header */}
      <header className="about-page__header text-center mb-5">
        <h1>About Me</h1>
      </header>

      {/* Main Content */}
      <main className="about-page__main container">
        {/* Introduction Section */}
        <section className="about-page__intro mb-5">
          <Subtitle text="Who I Am" />
          <p>
            Hi, I’m David, a passionate software developer and US Army Veteran with a strong interest in creating efficient, scalable, and user-friendly applications.
            My journey into development started as a UX/UI designer who recognized the disconnect between design and development. I decided to bridge that gap by learning to code and becoming a full-stack developer.
          </p>
          <p>
            Your website has the potential to be more than just a static online presence. It can become a powerful tool to drive growth and success for your business.
          </p>
          <p>
            What interests me the most is problem-solving and creating. Learning to build something new and seeing it come to life is what drives me.
          </p>
        </section>

        {/* Skills & Expertise Section */}
        <section className="about-page__skills mb-5">
          <Subtitle text="Skills & Expertise" />
          <SkillsList skills={skills} />
        </section>

        {/* Values Section */}
        <section className="about-page__values mb-5">
          <Subtitle text="What Drives Me" />
          <p>
            I am fueled by a passion for problem-solving and a dedication to continuous learning. From crafting intuitive user interfaces to enhancing backend efficiency,
            I find joy in every aspect of the development process.
          </p>
          <p>Give me a project and watch me bring it to life. I am always eager to take on new challenges and grow my skill set.</p>
        </section>

        {/* Call to Action Section */}
        <section className="about-page__cta text-center">
          <Subtitle text="Let’s Work Together" />
          <p>
            Feel free to explore my portfolio and reach out if you’d like to collaborate on a project or have any questions. I’m always excited to connect with like-minded individuals and organizations.
          </p>
          <a
            href="/contact"
            className="btn btn-primary about-page__cta-link"
            style={{ marginTop: '20px' }}
          >
            Contact Me
          </a>
        </section>
      </main>
    </div>
  );
};

export default About;
