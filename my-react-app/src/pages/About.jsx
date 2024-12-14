import React from 'react';

const About = () => {
  return (
    <div className="about-page">
      <header className="about-page__header">
        <h1>About Me</h1>
      </header>
      <main className="about-page__main">
        <section className="about-page__intro">
          <h2 className="about-page__subtitle">Who I Am</h2>
          <p>
            Hi, I’m [Your Name], a passionate software developer with a strong interest in creating efficient, scalable, and user-friendly applications. My journey in tech started with [brief origin story, e.g., building my first website], and since then, I’ve honed my skills in frontend and backend development.
          </p>
        </section>

        <section className="about-page__skills">
          <h2 className="about-page__subtitle">Skills & Expertise</h2>
          <ul className="about-page__skills-list">
            <li>Proficient in modern web technologies like React, Node.js, and Express.</li>
            <li>Experienced in database management with MySQL and MongoDB.</li>
            <li>Skilled in implementing secure authentication systems using JWT and OAuth.</li>
            <li>Strong understanding of responsive design and accessibility principles.</li>
            <li>Comfortable working with CI/CD pipelines and cloud services like Azure and AWS.</li>
          </ul>
        </section>

        <section className="about-page__values">
          <h2 className="about-page__subtitle">What Drives Me</h2>
          <p>
            I’m driven by a passion for problem-solving and a commitment to lifelong learning. Whether I’m designing intuitive user interfaces or optimizing backend performance, I enjoy every step of the development process. Collaboration is a cornerstone of my approach—I believe great ideas are born from teamwork and diverse perspectives.
          </p>
        </section>

        <section className="about-page__cta">
          <h2 className="about-page__subtitle">Let’s Work Together</h2>
          <p>
            Feel free to explore my portfolio and reach out if you’d like to collaborate on a project or have any questions. I’m always excited to connect with like-minded individuals and organizations.
          </p>
          <a href="/contact" className="about-page__cta-link">Contact Me</a>
        </section>
      </main>
    </div>
  );
};

export default About;
