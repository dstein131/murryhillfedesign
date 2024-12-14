import React from 'react';

const Resume = () => {
  const resumeData = {
    contact: {
      name: 'David Stein',
      address: '1530 Detroit St, Denver, CO 80206',
      phone: '305-984-7004',
      email: 'Dstein131@gmail.com',
    },
    availability: {
      jobType: 'Permanent',
      workSchedule: 'Full-Time',
      desiredLocation: 'United States – CO – Denver',
    },
    education: [
      {
        institution: 'Colorado State University – Global',
        program: 'Masters in Finance (MSF)',
        specialization: 'Business Intelligence',
        gpa: 3.52,
        coursework: [
          'Foundations of 21st Century Finance – Certificate',
          'Fundamentals of Quantitative Analysis',
          'Corporate Finance',
          'Financial Markets and Institutions',
        ],
      },
      {
        institution: 'Florida International University',
        program: 'Bachelors in Business Administration',
        gpa: 2.8,
        coursework: [
          'Introduction to Information Systems',
          'Financial Management',
          'Operations Management',
          'Accounting',
        ],
      },
    ],
    workExperience: [
      {
        position: 'Grant PreAward Specialist',
        company: 'University of Colorado – Anschutz',
        location: 'Aurora, CO',
        years: '02/2019 – Present',
        responsibilities: [
          'Reviewed research grants prior to submission to funding agencies.',
          'Experienced with National Institute of Health rules and regulations for grant submissions.',
          'Developed budgets and managed timelines for funding cycles.',
        ],
      },
      {
        position: 'CORE Business Operations Coordinator',
        company: 'University of Colorado – Anschutz',
        location: 'Aurora, CO',
        years: '02/2017 – 02/2019',
        responsibilities: [
          'Managed business operations for a Mass Spectrometry CORE.',
          'Developed pricing structures for analytical chemistry assays.',
          'Implemented project management systems for researchers.',
        ],
      },
      {
        position: 'INTAKE MANAGER',
        company: 'University of Colorado – Addiction Resource & Treatment Services',
        location: 'Denver, CO',
        years: '07/2016 – 01/2017',
        responsibilities: [
          'Managed intake for four clinics serving over 1200 clients.',
          'Coordinated with state and county agencies for billing and new client programs.',
        ],
      },
    ],
    militaryService: {
      branch: 'United States Army',
      years: '2009 – 2016',
      roles: [
        {
          position: 'Signals Intelligence Analyst',
          responsibilities: [
            'Managed geosynchronous satellite resources for global early warning systems.',
            'Deployed to Afghanistan as a Signals Intelligence Geospatial Analyst.',
            'Collaborated with Pashtu linguists to disseminate actionable intelligence.',
          ],
        },
        {
          position: 'Operations Non-Commissioned Officer',
          responsibilities: [
            'Managed training and personnel for 133 service members.',
            'Ensured compliance with Army regulations, including the Army Body Fat Composition Program.',
          ],
        },
        {
          position: 'Human Resource Specialist',
          responsibilities: [
            'Handled financial concerns for over 300 service members.',
            'Managed life insurance policies and travel reimbursements.',
          ],
        },
      ],
    },
    skills: [
      'Grant management and submission processes',
      'Financial analysis and budget development',
      'Project management and business operations',
      'Data analytics and intelligence processing',
      'Leadership and team management',
    ],
    awards: [
      'Joint Service Commendation Medal',
      'Army Commendation Medal',
      'Army Achievement Medal (3rd Award)',
      'Afghanistan Campaign Medal (2nd Award)',
    ],
  };

  return (
    <div className="resume-page">
      <header className="resume-header">
        <h1>{resumeData.contact.name}</h1>
        <p>{resumeData.contact.address}</p>
        <p>
          Phone: {resumeData.contact.phone} | Email: <a href={`mailto:${resumeData.contact.email}`}>{resumeData.contact.email}</a>
        </p>
      </header>

      <main>
        <section>
          <h2>Availability</h2>
          <p>Job Type: {resumeData.availability.jobType}</p>
          <p>Work Schedule: {resumeData.availability.workSchedule}</p>
          <p>Desired Location: {resumeData.availability.desiredLocation}</p>
        </section>

        <section>
          <h2>Education</h2>
          {resumeData.education.map((edu, index) => (
            <div key={index}>
              <h3>{edu.program} - {edu.institution}</h3>
              <p>GPA: {edu.gpa}</p>
              <ul>
                {edu.coursework.map((course, idx) => (
                  <li key={idx}>{course}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section>
          <h2>Work Experience</h2>
          {resumeData.workExperience.map((job, index) => (
            <div key={index}>
              <h3>{job.position} - {job.company}</h3>
              <p>{job.location} | {job.years}</p>
              <ul>
                {job.responsibilities.map((responsibility, idx) => (
                  <li key={idx}>{responsibility}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section>
          <h2>Military Service</h2>
          <h3>{resumeData.militaryService.branch} ({resumeData.militaryService.years})</h3>
          {resumeData.militaryService.roles.map((role, index) => (
            <div key={index}>
              <h4>{role.position}</h4>
              <ul>
                {role.responsibilities.map((responsibility, idx) => (
                  <li key={idx}>{responsibility}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section>
          <h2>Skills</h2>
          <ul>
            {resumeData.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2>Awards</h2>
          <ul>
            {resumeData.awards.map((award, index) => (
              <li key={index}>{award}</li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default Resume;
