import React from 'react';

const Resume = () => {
  const resumeData = {
    contact: {
      name: 'David Stein',
    //   phone: '305-984-7004',
    //   email: 'Dstein131@gmail.com',
    },
    education: [
      {
        institution: 'University of North Florida - Full Stack Academy',
        degree: 'Full Stack Web Development',
        details: [
          'Relevant Coursework: HTML, CSS, JavaScript, React, Node.js, Express, MySQL.',
        ],
      },
      {
        institution: 'University of Denver',
        degree: 'UX/UI BOOT CAMP',
        details: [
          'Relevant Coursework: Responsive Design, Color Theory, User Experience, User Interface Design.',
        ],
      },
      {
        institution: 'Colorado State University – Global',
        degree: 'Masters in Finance (Business Intelligence Specialization)',
        details: [
          'Relevant Coursework: Foundations of 21st Century Finance, Corporate Finance, Financial Markets, Investments.',
        ],
      },
      {
        institution: 'Florida International University',
        degree: 'Bachelor of Business Administration',
        details: [
          'Relevant Coursework: Financial Management, Operations Management, Accounting, Marketing, Quantitative Methods.',
        ],
      },
    ],
    workExperience: [
      {
        company: 'SRI, Inc',
        position: 'Full Stack Developer and UX/UI Designer',
        years: '2021 – Present',
        responsibilities: [
          'Developed and maintained a React frontend for the SRI, Inc. web properties.',
          'Performed user testing and feedback sessions to refine the interface.',
          'DevOps: Created a CI/CD pipeline with GitHub Actions to Azure App Service.',
          'MySql creation and management.',
        ],
      },
      {
        company: 'University of Colorado – Anschutz',
        position: 'Grant PreAward Specialist',
        years: '2019 – 2021',
        responsibilities: [
          'Review and prepare research grants for submission to funding agencies.',
          'Experienced with National Institute of Health grant submission rules.',
          'Developed budgets and managed timelines for funding cycles.',
        ],
      },
    ],
    militaryService: {
      branch: 'United States Army',
      serviceYears: '2009 – 2016',
      roles: [
        {
          position: 'Signals Intelligence Analyst',
          responsibilities: [
            'Managed geosynchronous satellite resources for global defense.',
            'Deployed to Afghanistan for Operation Enduring Freedom.',
            'Collaborated with Pashtu linguists for actionable intelligence.',
          ],
        },
        {
          position: 'Operations Non-Commissioned Officer',
          responsibilities: [
            'Trained and managed personnel for a company of 133 service members.',
            'Ensured compliance with Army regulations, including fitness standards.',
          ],
        },
      ],
    },
    skills: [
      'Full-stack development: React, Node.js, Express',
      'Database management: MySQL, FusionAuth, PostgreSQL',
      'Cloud services: Azure Blob Storage, Azure Hosting, SendGrid',
      'Frontend libraries and tools: Material-UI, Bootstrap, TailwindCSS',
      'Backend APIs and middleware development',
      'Authentication and token management: FusionAuth, JWT',
      'Version control: Git, GitHub, Replit CI/CD',
      'Project management: Agile development workflows',
    ],
  };

//   const maskPhone = (phone) => {
//     return phone.replace(/(\d{3})-(\d{3})-(\d{4})/, '$1-***-****');
//   };

//   const obfuscateEmail = (email) => {
//     const [localPart, domain] = email.split('@');
//     return `${localPart.replace(/./g, '*')}@${domain}`;
//   };

  const buttonStyle = {
    backgroundColor: '#6A0DAD', // Purple color
    color: '#FFF',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
    fontWeight: 'bold',
    marginTop: '20px',
  };

  return (
    <div>
      <center>
      <a
          href="/resume/David_Stein-Resume.pdf"
          download="David_Stein_Resume.pdf"
          style={buttonStyle}
        >
          Download PDF
        </a>
      </center>
      <div className="resume-page">
        <header className="resume-page__header">
          <h3>{resumeData.contact.name}</h3>
          {/* <p>
            Phone: {resumeData.contact.phone} | Email: {resumeData.contact.email}
          </p> */}
        </header>
        <center>
          <main>
            <section className="resume-section">
              <h2 className="resume-section__title">Education</h2>
              {resumeData.education.map((edu, index) => (
                <div key={index} className="resume-item">
                  <h3>{edu.degree} - {edu.institution}</h3>
                  <ul>
                    {edu.details.map((detail, idx) => (
                      <li key={idx}>{detail}</li>
                    ))}
                  </ul>
                </div>
              ))}
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
              <h2 className="resume-section__title">Military Service</h2>
              <h3>{resumeData.militaryService.branch} ({resumeData.militaryService.serviceYears})</h3>
              {resumeData.militaryService.roles.map((role, index) => (
                <div key={index} className="resume-item">
                  <h4>{role.position}</h4>
                  <ul>
                    {role.responsibilities.map((responsibility, idx) => (
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
        </center>
      </div>
    </div>
  );
};

export default Resume;
