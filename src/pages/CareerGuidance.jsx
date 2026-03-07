import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Target, TrendingUp, BookOpen, Code, Cloud, Settings, 
  Shield, Layers, TestTube, ArrowRight, CheckCircle2,
  GraduationCap, Briefcase, Users, Lightbulb
} from 'lucide-react';
import SEOHead from '../components/SEOHead';

function CareerGuidance() {
  const [activeRoadmap, setActiveRoadmap] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const careerRoadmaps = {
    'java-backend': {
      title: 'Java Backend Developer',
      icon: <Code size={24} />,
      color: '#E76F00',
      skills: [
        'Core Java',
        'Object Oriented Programming',
        'Data Structures',
        'JDBC (Java Database Connectivity)',
        'J2EE (Servlets, JSP)',
        'Git Version Control',
        'Spring Framework',
        'Spring Boot',
        'REST APIs',
        'Databases (MySQL / PostgreSQL)',
        'Microservices',
        'System Design'
      ],
      roles: [
        'Junior Backend Developer',
        'Backend Developer',
        'Senior Backend Developer',
        'Software Architect'
      ]
    },
    'frontend': {
      title: 'Frontend Developer',
      icon: <Layers size={24} />,
      color: '#61DAFB',
      skills: [
        'HTML',
        'CSS',
        'JavaScript',
        'Responsive Design',
        'React / Angular / Vue',
        'REST API integration',
        'UI/UX principles'
      ],
      roles: [
        'Frontend Developer',
        'UI Developer',
        'Senior Frontend Engineer'
      ]
    },
    'aws': {
      title: 'AWS / Cloud Engineer',
      icon: <Cloud size={24} />,
      color: '#FF9900',
      skills: [
        'Linux basics',
        'Networking',
        'AWS core services',
        'Cloud architecture',
        'Infrastructure automation',
        'Security practices'
      ],
      roles: [
        'Cloud Engineer',
        'Cloud Architect',
        'Cloud Solutions Architect'
      ]
    },
    'devops': {
      title: 'DevOps Engineer',
      icon: <Settings size={24} />,
      color: '#00D8FF',
      skills: [
        'Linux',
        'Git',
        'CI/CD pipelines',
        'Docker',
        'Kubernetes',
        'Cloud platforms',
        'Infrastructure as Code'
      ],
      roles: [
        'DevOps Engineer',
        'Senior DevOps Engineer',
        'DevOps Architect'
      ]
    },
    'devsecops': {
      title: 'DevSecOps',
      icon: <Shield size={24} />,
      color: '#4CAF50',
      skills: [
        'DevOps fundamentals',
        'Security testing',
        'Secure coding',
        'Vulnerability management',
        'Cloud security',
        'Compliance automation'
      ],
      roles: [
        'DevSecOps Engineer',
        'Security Engineer',
        'Security Architect'
      ]
    },
    'automation-testing': {
      title: 'Automation Testing',
      icon: <TestTube size={24} />,
      color: '#9C27B0',
      skills: [
        'Testing fundamentals',
        'Java / Python',
        'Selenium',
        'Test frameworks',
        'API testing',
        'CI/CD integration'
      ],
      roles: [
        'QA Engineer',
        'Automation Test Engineer',
        'QA Lead'
      ]
    },
    'fullstack': {
      title: 'Full Stack Developer',
      icon: <Layers size={24} />,
      color: '#FF6B6B',
      skills: [
        'Frontend: HTML, CSS, JavaScript, React/Angular',
        'Backend: Java/Node.js, Spring Boot, REST APIs',
        'Database: SQL, NoSQL',
        'DevOps basics: Docker, CI/CD'
      ],
      roles: [
        'Full Stack Developer',
        'Senior Full Stack Developer',
        'Full Stack Architect'
      ]
    }
  };

  return (
    <div className="tutorial-page" style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem' }}>
      <SEOHead 
        title="Career Guidance & Technology Roadmaps - LearnStackHub" 
        description="Career guidance and technology roadmaps for students. Learn about different IT career paths, skills required, and how to progress from beginner to expert in software development."
        keywords="career guidance, technology roadmap, java backend, frontend, aws, devops, devsecops, full stack, automation testing, software career, L1 L2 L3 L4 levels"
      />
      
      <h1 className="tutorial-title" style={{ marginBottom: '1rem' }}>
        Career Guidance & Technology Roadmaps
      </h1>
      <p style={{ 
        color: 'var(--text-secondary)', 
        marginBottom: '1.5rem', 
        fontSize: '1.1rem',
        lineHeight: '1.8'
      }}>
        Choosing the right career path in the technology industry can be confusing for many students. 
        With so many technologies, tools, and job roles available, students often struggle to decide where to begin and how to grow in their careers.
      </p>
      <p style={{ 
        color: 'var(--text-secondary)', 
        marginBottom: '1.5rem', 
        fontSize: '1.1rem',
        lineHeight: '1.8'
      }}>
        This page is designed to help students understand:
      </p>
      <ul style={{ 
        color: 'var(--text-secondary)', 
        marginBottom: '3rem',
        paddingLeft: '2rem',
        lineHeight: '2',
        fontSize: '1.05rem'
      }}>
        <li>Why career confusion happens</li>
        <li>How to choose the right career path</li>
        <li>Technology roadmaps for different IT domains</li>
        <li>Career levels and designations in the software industry</li>
        <li>How to progress from beginner to expert</li>
      </ul>

      {/* Why Students Feel Confused Section */}
      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{ 
          marginBottom: '2rem', 
          fontSize: '2rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <Lightbulb size={32} color="var(--accent-primary)" />
          Why Students Feel Confused About Their Career
        </h2>
        <p style={{ 
          color: 'var(--text-secondary)', 
          marginBottom: '2rem',
          fontSize: '1.05rem',
          lineHeight: '1.8'
        }}>
          There are several reasons why students struggle to make career decisions.
        </p>
        
        <div style={{ display: 'grid', gap: '2rem' }}>
          <div style={{ 
            background: 'var(--bg-tertiary)', 
            padding: '2rem', 
            borderRadius: '12px',
            border: '1px solid var(--border-color)'
          }}>
            <h3 style={{ marginBottom: '1rem', fontSize: '1.3rem', color: 'var(--text-primary)' }}>
              1. Lack of Career Guidance
            </h3>
            <p style={{ color: 'var(--text-secondary)', margin: 0, lineHeight: '1.8' }}>
              Many students do not receive proper guidance about career options while studying. 
              Colleges often focus more on theoretical knowledge than industry exposure.
            </p>
          </div>
          
          <div style={{ 
            background: 'var(--bg-tertiary)', 
            padding: '2rem', 
            borderRadius: '12px',
            border: '1px solid var(--border-color)'
          }}>
            <h3 style={{ marginBottom: '1rem', fontSize: '1.3rem', color: 'var(--text-primary)' }}>
              2. Too Many Options
            </h3>
            <p style={{ color: 'var(--text-secondary)', margin: 0, marginBottom: '1rem', lineHeight: '1.8' }}>
              Today there are many career paths such as:
            </p>
            <ul style={{ 
              color: 'var(--text-secondary)', 
              margin: 0,
              paddingLeft: '2rem',
              lineHeight: '2'
            }}>
              <li>Software Development</li>
              <li>Data Analysis</li>
              <li>Cloud Engineering</li>
              <li>DevOps</li>
              <li>Cybersecurity</li>
              <li>Digital Marketing</li>
              <li>Finance</li>
              <li>Government Jobs</li>
            </ul>
            <p style={{ color: 'var(--text-secondary)', margin: '1rem 0 0 0', lineHeight: '1.8' }}>
              Having too many options can make decision-making difficult.
            </p>
          </div>
          
          <div style={{ 
            background: 'var(--bg-tertiary)', 
            padding: '2rem', 
            borderRadius: '12px',
            border: '1px solid var(--border-color)'
          }}>
            <h3 style={{ marginBottom: '1rem', fontSize: '1.3rem', color: 'var(--text-primary)' }}>
              3. Peer and Family Pressure
            </h3>
            <p style={{ color: 'var(--text-secondary)', margin: 0, lineHeight: '1.8' }}>
              Students often feel pressured by family expectations or influenced by what their friends are choosing.
            </p>
          </div>
          
          <div style={{ 
            background: 'var(--bg-tertiary)', 
            padding: '2rem', 
            borderRadius: '12px',
            border: '1px solid var(--border-color)'
          }}>
            <h3 style={{ marginBottom: '1rem', fontSize: '1.3rem', color: 'var(--text-primary)' }}>
              4. Lack of Practical Exposure
            </h3>
            <p style={{ color: 'var(--text-secondary)', margin: 0, lineHeight: '1.8' }}>
              Most students learn theoretical concepts in college but do not understand how real software projects work in companies.
            </p>
          </div>
        </div>
      </section>

      {/* How to Decide Section */}
      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{ 
          marginBottom: '2rem', 
          fontSize: '2rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <Target size={32} color="var(--accent-primary)" />
          How Students Can Decide the Right Career Path
        </h2>
        
        <div style={{ display: 'grid', gap: '2rem' }}>
          <div style={{ 
            background: 'var(--bg-tertiary)', 
            padding: '2rem', 
            borderRadius: '12px',
            border: '1px solid var(--border-color)'
          }}>
            <h3 style={{ marginBottom: '1rem', fontSize: '1.3rem', color: 'var(--text-primary)' }}>
              1. Identify Your Interests
            </h3>
            <p style={{ color: 'var(--text-secondary)', margin: 0, marginBottom: '1rem', lineHeight: '1.8' }}>
              Think about the subjects or activities you enjoy learning the most.
            </p>
            <p style={{ color: 'var(--text-secondary)', margin: 0, lineHeight: '1.8' }}>
              <strong>For example:</strong>
            </p>
            <ul style={{ 
              color: 'var(--text-secondary)', 
              margin: '1rem 0 0 0',
              paddingLeft: '2rem',
              lineHeight: '2'
            }}>
              <li>If you enjoy coding → Software Development</li>
              <li>If you enjoy infrastructure → Cloud / DevOps</li>
              <li>If you enjoy automation → Testing / DevOps</li>
            </ul>
          </div>
          
          <div style={{ 
            background: 'var(--bg-tertiary)', 
            padding: '2rem', 
            borderRadius: '12px',
            border: '1px solid var(--border-color)'
          }}>
            <h3 style={{ marginBottom: '1rem', fontSize: '1.3rem', color: 'var(--text-primary)' }}>
              2. Understand Industry Demand
            </h3>
            <p style={{ color: 'var(--text-secondary)', margin: 0, marginBottom: '1rem', lineHeight: '1.8' }}>
              Research technologies that are currently in high demand.
            </p>
            <p style={{ color: 'var(--text-secondary)', margin: 0, lineHeight: '1.8' }}>
              <strong>Examples:</strong>
            </p>
            <ul style={{ 
              color: 'var(--text-secondary)', 
              margin: '1rem 0 0 0',
              paddingLeft: '2rem',
              lineHeight: '2'
            }}>
              <li>Java Backend Development</li>
              <li>Frontend Development</li>
              <li>Cloud Computing</li>
              <li>DevOps</li>
              <li>Automation Testing</li>
            </ul>
          </div>
          
          <div style={{ 
            background: 'var(--bg-tertiary)', 
            padding: '2rem', 
            borderRadius: '12px',
            border: '1px solid var(--border-color)'
          }}>
            <h3 style={{ marginBottom: '1rem', fontSize: '1.3rem', color: 'var(--text-primary)' }}>
              3. Start Learning Practical Skills
            </h3>
            <p style={{ color: 'var(--text-secondary)', margin: 0, marginBottom: '1rem', lineHeight: '1.8' }}>
              Degrees provide knowledge, but skills create career opportunities.
            </p>
            <p style={{ color: 'var(--text-secondary)', margin: 0, lineHeight: '1.8' }}>
              <strong>Examples of valuable skills:</strong>
            </p>
            <ul style={{ 
              color: 'var(--text-secondary)', 
              margin: '1rem 0 0 0',
              paddingLeft: '2rem',
              lineHeight: '2'
            }}>
              <li>Programming</li>
              <li>System Design</li>
              <li>Cloud Platforms</li>
              <li>Databases</li>
              <li>Automation</li>
            </ul>
          </div>
          
          <div style={{ 
            background: 'var(--bg-tertiary)', 
            padding: '2rem', 
            borderRadius: '12px',
            border: '1px solid var(--border-color)'
          }}>
            <h3 style={{ marginBottom: '1rem', fontSize: '1.3rem', color: 'var(--text-primary)' }}>
              4. Work on Real Projects
            </h3>
            <p style={{ color: 'var(--text-secondary)', margin: 0, lineHeight: '1.8' }}>
              Practical projects help you understand how real software systems are built.
            </p>
          </div>
          
          <div style={{ 
            background: 'var(--bg-tertiary)', 
            padding: '2rem', 
            borderRadius: '12px',
            border: '1px solid var(--border-color)'
          }}>
            <h3 style={{ marginBottom: '1rem', fontSize: '1.3rem', color: 'var(--text-primary)' }}>
              5. Take Time to Explore
            </h3>
            <p style={{ color: 'var(--text-secondary)', margin: 0, lineHeight: '1.8' }}>
              Many professionals discover their true career path after experimenting with different technologies.
            </p>
          </div>
        </div>
      </section>

      {/* Technology Career Roadmaps Section */}
      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{ 
          marginBottom: '2rem', 
          fontSize: '2rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <Briefcase size={32} color="var(--accent-primary)" />
          Technology Career Roadmaps
        </h2>
        <p style={{ 
          color: 'var(--text-secondary)', 
          marginBottom: '2rem',
          fontSize: '1.05rem',
          lineHeight: '1.8'
        }}>
          Below are some popular technology career paths students can explore.
        </p>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '1.5rem',
          marginBottom: '3rem'
        }}>
          {Object.entries(careerRoadmaps).map(([key, roadmap]) => (
            <div
              key={key}
              onClick={() => setActiveRoadmap(activeRoadmap === key ? null : key)}
              style={{
                background: 'var(--bg-tertiary)',
                padding: '2rem',
                borderRadius: '12px',
                cursor: 'pointer',
                border: `2px solid ${activeRoadmap === key ? roadmap.color : 'var(--border-color)'}`,
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                if (activeRoadmap !== key) {
                  e.currentTarget.style.borderColor = roadmap.color;
                }
              }}
              onMouseLeave={(e) => {
                if (activeRoadmap !== key) {
                  e.currentTarget.style.borderColor = 'var(--border-color)';
                }
              }}
            >
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '1rem', 
                marginBottom: '1rem',
                color: roadmap.color
              }}>
                {roadmap.icon}
                <h3 style={{ margin: 0, fontSize: '1.3rem' }}>{roadmap.title} Roadmap</h3>
              </div>
              <p style={{ color: 'var(--text-secondary)', margin: 0, marginBottom: '1rem' }}>
                Click to view skills and roles
              </p>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem',
                color: roadmap.color,
                fontWeight: '600'
              }}>
                {activeRoadmap === key ? 'Hide Details' : 'View Details'}
                <ArrowRight size={16} />
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Roadmap View */}
        {activeRoadmap && careerRoadmaps[activeRoadmap] && (
          <div style={{
            background: 'var(--bg-secondary)',
            borderRadius: '20px',
            padding: '3rem',
            border: `2px solid ${careerRoadmaps[activeRoadmap].color}`,
            marginTop: '2rem'
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '1rem', 
              marginBottom: '2rem',
              color: careerRoadmaps[activeRoadmap].color
            }}>
              {careerRoadmaps[activeRoadmap].icon}
              <h2 style={{ margin: 0, fontSize: '2rem' }}>
                {careerRoadmaps[activeRoadmap].title} Roadmap
              </h2>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ marginBottom: '1rem', fontSize: '1.3rem', color: 'var(--text-primary)' }}>
                Skills to learn:
              </h3>
              <ul style={{ 
                margin: 0, 
                paddingLeft: '2rem', 
                color: 'var(--text-secondary)',
                lineHeight: '2'
              }}>
                {careerRoadmaps[activeRoadmap].skills.map((skill, idx) => (
                  <li key={idx}>{skill}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 style={{ marginBottom: '1rem', fontSize: '1.3rem', color: 'var(--text-primary)' }}>
                Typical roles:
              </h3>
              <ul style={{ 
                margin: 0, 
                paddingLeft: '2rem', 
                color: 'var(--text-secondary)',
                lineHeight: '2'
              }}>
                {careerRoadmaps[activeRoadmap].roles.map((role, idx) => (
                  <li key={idx}>{role}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </section>

      {/* Career Levels Section */}
      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{ 
          marginBottom: '2rem', 
          fontSize: '2rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <Users size={32} color="var(--accent-primary)" />
          Career Levels in the IT Industry
        </h2>
        <p style={{ 
          color: 'var(--text-secondary)', 
          marginBottom: '2rem',
          fontSize: '1.05rem',
          lineHeight: '1.8'
        }}>
          Most software companies have different career levels.
        </p>
        
        <div style={{ display: 'grid', gap: '2rem' }}>
          <div style={{
            background: 'var(--bg-tertiary)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid var(--border-color)'
          }}>
            <h3 style={{ 
              margin: 0, 
              marginBottom: '1rem',
              fontSize: '1.5rem',
              color: 'var(--text-primary)'
            }}>
              L1 – Entry Level
            </h3>
            <p style={{ 
              margin: 0, 
              marginBottom: '1rem',
              color: 'var(--text-secondary)',
              fontWeight: '600'
            }}>
              Typical roles:
            </p>
            <ul style={{ 
              margin: 0, 
              paddingLeft: '2rem', 
              color: 'var(--text-secondary)',
              lineHeight: '2',
              marginBottom: '1rem'
            }}>
              <li>Intern</li>
              <li>Junior Developer</li>
              <li>Associate Engineer</li>
            </ul>
            <p style={{ 
              margin: 0,
              color: 'var(--text-secondary)',
              lineHeight: '1.8'
            }}>
              <strong>Focus:</strong> Learning fundamentals and contributing to small tasks.
            </p>
          </div>

          <div style={{
            background: 'var(--bg-tertiary)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid var(--border-color)'
          }}>
            <h3 style={{ 
              margin: 0, 
              marginBottom: '1rem',
              fontSize: '1.5rem',
              color: 'var(--text-primary)'
            }}>
              L2 – Mid Level
            </h3>
            <p style={{ 
              margin: 0, 
              marginBottom: '1rem',
              color: 'var(--text-secondary)',
              fontWeight: '600'
            }}>
              Typical roles:
            </p>
            <ul style={{ 
              margin: 0, 
              paddingLeft: '2rem', 
              color: 'var(--text-secondary)',
              lineHeight: '2',
              marginBottom: '1rem'
            }}>
              <li>Software Engineer</li>
              <li>Backend Developer</li>
              <li>Frontend Developer</li>
            </ul>
            <p style={{ 
              margin: 0,
              color: 'var(--text-secondary)',
              lineHeight: '1.8'
            }}>
              <strong>Focus:</strong> Building features and contributing to product development.
            </p>
          </div>

          <div style={{
            background: 'var(--bg-tertiary)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid var(--border-color)'
          }}>
            <h3 style={{ 
              margin: 0, 
              marginBottom: '1rem',
              fontSize: '1.5rem',
              color: 'var(--text-primary)'
            }}>
              L3 – Senior Level
            </h3>
            <p style={{ 
              margin: 0, 
              marginBottom: '1rem',
              color: 'var(--text-secondary)',
              fontWeight: '600'
            }}>
              Typical roles:
            </p>
            <ul style={{ 
              margin: 0, 
              paddingLeft: '2rem', 
              color: 'var(--text-secondary)',
              lineHeight: '2',
              marginBottom: '1rem'
            }}>
              <li>Senior Software Engineer</li>
              <li>Technical Lead</li>
            </ul>
            <p style={{ 
              margin: 0,
              color: 'var(--text-secondary)',
              lineHeight: '1.8'
            }}>
              <strong>Focus:</strong> System design and mentoring junior developers.
            </p>
          </div>

          <div style={{
            background: 'var(--bg-tertiary)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid var(--border-color)'
          }}>
            <h3 style={{ 
              margin: 0, 
              marginBottom: '1rem',
              fontSize: '1.5rem',
              color: 'var(--text-primary)'
            }}>
              L4 – Expert Level
            </h3>
            <p style={{ 
              margin: 0, 
              marginBottom: '1rem',
              color: 'var(--text-secondary)',
              fontWeight: '600'
            }}>
              Typical roles:
            </p>
            <ul style={{ 
              margin: 0, 
              paddingLeft: '2rem', 
              color: 'var(--text-secondary)',
              lineHeight: '2',
              marginBottom: '1rem'
            }}>
              <li>Software Architect</li>
              <li>Principal Engineer</li>
            </ul>
            <p style={{ 
              margin: 0,
              color: 'var(--text-secondary)',
              lineHeight: '1.8'
            }}>
              <strong>Focus:</strong> Designing complex systems and technical strategy.
            </p>
          </div>
        </div>
      </section>

      {/* How to Reach Your Career Goal */}
      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{ 
          marginBottom: '2rem', 
          fontSize: '2rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <TrendingUp size={32} color="var(--accent-primary)" />
          How to Reach Your Career Goal
        </h2>
        <p style={{ 
          color: 'var(--text-secondary)', 
          marginBottom: '1.5rem',
          fontSize: '1.05rem',
          lineHeight: '1.8'
        }}>
          To grow successfully in the software industry:
        </p>
        <ul style={{ 
          color: 'var(--text-secondary)', 
          margin: 0,
          paddingLeft: '2rem',
          lineHeight: '2',
          fontSize: '1.05rem'
        }}>
          <li>Learn strong fundamentals</li>
          <li>Build real-world projects</li>
          <li>Understand system design</li>
          <li>Gain practical experience</li>
          <li>Continuously update your skills</li>
        </ul>
        <p style={{ 
          color: 'var(--text-secondary)', 
          marginTop: '1.5rem',
          fontSize: '1.05rem',
          lineHeight: '1.8'
        }}>
          The technology industry evolves rapidly, and continuous learning is the key to long-term success.
        </p>
      </section>

      {/* Final Thoughts */}
      <section style={{
        background: 'var(--bg-tertiary)',
        borderRadius: '20px',
        padding: '3rem',
        border: '1px solid var(--border-color)'
      }}>
        <h2 style={{ 
          marginBottom: '1.5rem', 
          fontSize: '2rem',
          color: 'var(--text-primary)'
        }}>
          Final Thoughts
        </h2>
        <p style={{ 
          fontSize: '1.1rem', 
          lineHeight: '1.8', 
          margin: 0,
          color: 'var(--text-secondary)'
        }}>
          Career confusion is a normal part of the student journey. Instead of worrying too much about choosing the perfect path, 
          focus on learning valuable skills and gaining practical experience.
        </p>
        <p style={{ 
          fontSize: '1.1rem', 
          lineHeight: '1.8', 
          margin: '1.5rem 0 0 0',
          color: 'var(--text-secondary)'
        }}>
          Your degree is just the beginning. Your skills, curiosity, and persistence will shape your future career.
        </p>
      </section>
    </div>
  );
}

export default CareerGuidance;
