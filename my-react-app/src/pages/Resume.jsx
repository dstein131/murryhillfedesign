import React from 'react';

const Resume = () => {
  const resumeData = {
    education: [
      {
        institution: 'University of Example',
        degree: 'Bachelor of Science in Computer Science',
        graduationYear: 2020,
        details: [
          'Specialized in Software Development and Data Structures.',
          'Graduated with honors.',
        ],
      },
      {
        institution: 'Community College of Example',
        degree: 'Associate Degree in Information Technology',
        graduationYear: 2016,
        details: [
          'Focused on networking and basic programming.',
        ],
      },
    ],
    militaryService: {
      branch: 'United States Army',
      serviceYears: '2012 - 2016',
      rank: 'Sergeant',
      highlights: [
        'Led a team of 10 soldiers in daily operations.',
        'Managed logistics for multiple deployments.',
        'Received Army Achievement Medal for exemplary service.',
      ],
    },
    workExperience: [
      {
        company: 'FinanceCorp Inc.',
        position: 'Financial Analyst',
        years: '2020 - 2022',
        responsibilities: [
          'Analyzed financial data to guide investment strategies.',
          'Developed financial models to forecast market trends.',
        ],
      },
      {
        company: 'GrantMasters LLC',
        position: 'Grant Manager',
        years: '2018 - 2020',
        responsibilities: [
          'Oversaw $2M in grant funding for nonprofit organizations.',
          'Streamlined grant application processes, improving efficiency by 25%.',
        ],
      },
    ],
    skills: [
      'Full-stack development (React, Node.js, Express)',
      'Azure cloud services | CI/CD pipelines',
      'Front-end frameworks (Bootstrap, Material-UI)',
      'UX/UI design principles',
      'MySQL and PostgreSQL databases',
    ],
  };

  return (
    <div className="resume-page">
      <header className="resume-page__header">
        <h1>Resume</h1>
        <p>A comprehensive view of my education, experience, and skills.</p>
      </header>
      <main className="resume-page__main">
        <section className="resume-section">
          <h2 className="resume-section__title">Education</h2>
          {resumeData.education.map((edu, index) => (
            <div key={index} className="resume-item">
              <h3>{edu.degree} - {edu.institution}</h3>
              <p><strong>Graduation Year:</strong> {edu.graduationYear}</p>
              <ul>
                {edu.details.map((detail, idx) => (
                  <li key={idx}>{detail}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section className="resume-section">
          <h2 className="resume-section__title">Military Service</h2>
          <div className="resume-item">
            <h3>{resumeData.militaryService.branch}</h3>
            <p><strong>Years of Service:</strong> {resumeData.militaryService.serviceYears}</p>
            <p><strong>Rank:</strong> {resumeData.militaryService.rank}</p>
            <ul>
              {resumeData.militaryService.highlights.map((highlight, idx) => (
                <li key={idx}>{highlight}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="resume-section">
          <h2 className="resume-section__title">Work Experience</h2>
          {resumeData.workExperience.map((job, index) => (
            <div key={index} className="resume-item">
              <h3>{job.position} - {job.company}</h3>
              <p><strong>Years:</strong> {job.years}</p>
              <ul>
                {job.responsibilities.map((responsibility, idx) => (
                  <li key={idx}>{responsibility}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section className="resume-section">
          <h2 className="resume-section__title">Skills</h2>
          <ul className="resume-skills">
            {resumeData.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default Resume;
