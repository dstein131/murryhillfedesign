import React from 'react';

const Resume = () => {
  const resumeData = {
    contact: {
      name: 'David Stein',
      address: '1530 Detroit St, Denver, CO 80206',
      phone: '305-984-7004',
      email: 'Dstein131@gmail.com',
    },
    education: [
      {
        institution: 'Colorado State University – Global',
        degree: 'Masters in Finance (Business Intelligence Specialization)',
        graduationYear: 'In Progress',
        gpa: 3.52,
        details: [
          'Relevant Coursework: Foundations of 21st Century Finance, Corporate Finance, Financial Markets, Investments.',
        ],
      },
      {
        institution: 'Florida International University',
        degree: 'Bachelor of Business Administration',
        graduationYear: 2016,
        gpa: 2.8,
        details: [
          'Relevant Coursework: Financial Management, Operations Management, Accounting, Marketing, Quantitative Methods.',
        ],
      },
    ],
    workExperience: [
      {
        company: 'University of Colorado – Anschutz',
        position: 'Grant PreAward Specialist',
        years: '2019 – Present',
        responsibilities: [
          'Review and prepare research grants for submission to funding agencies.',
          'Experienced with National Institute of Health grant submission rules.',
          'Developed budgets and managed timelines for funding cycles.',
        ],
      },
      {
        company: 'University of Colorado – Anschutz',
        position: 'CORE Business Operations Coordinator',
        years: '2017 – 2019',
        responsibilities: [
          'Managed business operations for the Mass Spectrometry CORE.',
          'Developed pricing structures and invoicing for analytical services.',
          'Organized national metabolomics courses for researchers.',
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
      'Grant management and submission processes',
      'Financial analysis and budget development',
      'Data analytics and project management',
      'Leadership and team coordination',
      'Software: React, Node.js, MySQL, and Azure',
    ],
  };

  return (
    <div className="resume-page">
      <header className="resume-page__header">
        <h1>{resumeData.contact.name}</h1>
        <p>{resumeData.contact.address}</p>
        <p>
          Phone: {resumeData.contact.phone} | Email: <a href={`mailto:${resumeData.contact.email}`}>{resumeData.contact.email}</a>
        </p>
      </header>

      <main>
        <section className="resume-section">
          <h2 className="resume-section__title">Education</h2>
          {resumeData.education.map((edu, index) => (
            <div key={index} className="resume-item">
              <h3>{edu.degree} - {edu.institution}</h3>
              <p><strong>Graduation Year:</strong> {edu.graduationYear}</p>
              <p><strong>GPA:</strong> {edu.gpa}</p>
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
    </div>
  );
};

export default Resume;
