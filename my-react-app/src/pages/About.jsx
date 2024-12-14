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
            Hi, I’m David, a passionate software developer with a strong interest in creating efficient, scalable, and user-friendly applications. 
            My journey into development started as a UX/UI designer who recognized that there was a discontent between deisgn and development. 
            I decided to bridge that gap by learning to code and becoming a full-stack developer where I was easily able to transition my design skills into development.
          </p>
          <p>What interest me the most is problem solving and creating. Learning to build something new and seeing it come to life is what drives me.</p>
        </section>

        <section className="about-page__skills">
          <h2 className="about-page__subtitle">Skills & Expertise</h2>
          <ul className="about-page__skills-list">
            <li>Proficient in modern web technologies like React, Node.js, and Express.</li>
            <li>Experienced in database management with MySQL and Postgres.</li>
            <li>Skilled in implementing secure authentication systems using JWT and OAuth.</li>
            <li>Strong understanding of responsive design and accessibility principles.</li>
            <li>Comfortable working with CI/CD pipelines and cloud services like Azure and AWS.</li>
          </ul>
        </section>

        <section className="about-page__values">
          <h2 className="about-page__subtitle">What Drives Me</h2>
          <p>
          I am fueled by a passion for problem-solving and a dedication to continuous learning. From crafting intuitive user interfaces to enhancing backend efficiency, I find joy in every aspect of the development process.</p>
        <p>Give me a project and then watch me bring it to life. I am always eager to take on new challenges and grow my skill set.</p>
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
