import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { AlertTriangle, Shield, FileText, Code, ExternalLink, BookOpen } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { GENAIXIS, LEARNSTACKHUB } from '../config/company';

function Disclaimer() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="tutorial-page" style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem' }}>
      <SEOHead 
        title="Disclaimer - LearnStackHub" 
        description="Disclaimer for LearnStackHub educational platform. Important information about content accuracy, code execution, and limitations of liability."
      />
      <h1 className="tutorial-title">Disclaimer</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
        Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
      </p>

      <div className="tutorial-content">
        {/* Critical Disclaimer Box */}
        <section style={{ marginBottom: '3rem' }}>
          <div style={{
            background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
            border: '3px solid #fcd34d',
            borderRadius: '16px',
            padding: '2rem',
            marginBottom: '2rem'
          }}>
            <h2 style={{ marginTop: 0, color: '#92400e', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <AlertTriangle size={28} />
              Important Disclaimer Notice
            </h2>
            <p style={{ marginBottom: '1rem', color: '#78350f', fontSize: '1.1rem', lineHeight: '1.8' }}>
              <strong>The information and materials on LearnStackHub are provided on an "as is" basis for educational purposes only.</strong> 
              While we strive to provide accurate and up-to-date content, we make no warranties or representations regarding the 
              completeness, accuracy, reliability, or suitability of the information contained on this website.
            </p>
            <p style={{ margin: 0, color: '#78350f', fontSize: '1.1rem', lineHeight: '1.8' }}>
              By using LearnStackHub, you acknowledge that you have read, understood, and agree to be bound by this disclaimer 
              and our <Link to="/terms" style={{ color: '#92400e', textDecoration: 'underline', fontWeight: '600' }}>Terms of Service</Link>.
            </p>
          </div>
        </section>

        {/* Educational Content Disclaimer */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <BookOpen size={24} />
            Educational Content Disclaimer
          </h2>
          <p>
            LearnStackHub is an educational platform designed to teach Java programming concepts, web development, database management, 
            and related technologies. All tutorials, code examples, documentation, and content are provided solely for educational 
            and informational purposes.
          </p>
          <div style={{
            background: 'var(--bg-tertiary)',
            borderLeft: '4px solid var(--accent-primary)',
            padding: '1.5rem',
            borderRadius: '8px',
            marginTop: '1.5rem'
          }}>
            <h3 style={{ marginTop: 0 }}>Content Accuracy</h3>
            <ul style={{ marginBottom: 0, paddingLeft: '1.5rem' }}>
              <li>We make every effort to ensure content accuracy, but technology evolves rapidly</li>
              <li>Code examples may require modification for your specific use case</li>
              <li>Best practices and recommendations may change over time</li>
              <li>Always verify information with official documentation</li>
              <li>Test code thoroughly before using in production environments</li>
            </ul>
          </div>
        </section>

        {/* Code Execution Disclaimer */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Code size={24} />
            Code Execution Disclaimer
          </h2>
          <p>
            LearnStackHub provides an interactive code execution feature that allows users to write and execute Java code directly 
            in the browser. Please read the following important information:
          </p>
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: '12px',
            padding: '1.5rem',
            marginTop: '1.5rem'
          }}>
            <h3 style={{ marginTop: 0 }}>Important Warnings:</h3>
            <ul style={{ marginBottom: '1rem', paddingLeft: '1.5rem' }}>
              <li><strong>Educational Purpose Only:</strong> Code execution is provided for learning and experimentation purposes only</li>
              <li><strong>No Warranty:</strong> We do not guarantee code execution accuracy, performance, or security</li>
              <li><strong>No Liability:</strong> We are not responsible for any damage, loss, or issues resulting from code execution</li>
              <li><strong>Prohibited Use:</strong> Do not execute malicious code, code that may harm systems, or code that violates laws</li>
              <li><strong>Limitations:</strong> Code execution may be subject to timeouts, memory limits, and other restrictions</li>
              <li><strong>Service Availability:</strong> We reserve the right to disable, modify, or restrict code execution at any time</li>
            </ul>
            <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              <strong>Production Use:</strong> Code examples provided on LearnStackHub are for educational purposes. Always review, 
              test, and modify code before using it in production environments. We strongly recommend following security best practices 
              and conducting thorough testing.
            </p>
          </div>
        </section>

        {/* No Professional Advice */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Shield size={24} />
            No Professional Advice
          </h2>
          <p>
            The content on LearnStackHub does not constitute professional, legal, financial, or technical advice. Information provided 
            is general in nature and may not be suitable for your specific circumstances.
          </p>
          <div style={{
            background: 'var(--bg-tertiary)',
            padding: '1.5rem',
            borderRadius: '10px',
            marginTop: '1.5rem'
          }}>
            <h3 style={{ marginTop: 0 }}>Before Making Decisions:</h3>
            <ul style={{ marginBottom: 0, paddingLeft: '1.5rem' }}>
              <li>Consult with qualified professionals for specific technical, legal, or business advice</li>
              <li>Verify information with official documentation and trusted sources</li>
              <li>Consider your specific requirements, constraints, and environment</li>
              <li>Conduct thorough research and testing before implementation</li>
              <li>Seek professional guidance for critical business decisions</li>
            </ul>
          </div>
        </section>

        {/* External Links Disclaimer */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ExternalLink size={24} />
            External Links Disclaimer
          </h2>
          <p>
            LearnStackHub may contain links to external websites, resources, or third-party services. These links are provided for 
            convenience and informational purposes only.
          </p>
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: '12px',
            padding: '1.5rem',
            marginTop: '1.5rem'
          }}>
            <h3 style={{ marginTop: 0 }}>We Are Not Responsible For:</h3>
            <ul style={{ marginBottom: 0, paddingLeft: '1.5rem' }}>
              <li>Content, accuracy, or availability of external websites</li>
              <li>Privacy practices or policies of third-party sites</li>
              <li>Products, services, or information offered by external sites</li>
              <li>Any damage or loss resulting from use of external links</li>
              <li>Changes to external websites that may affect linked content</li>
            </ul>
            <p style={{ marginTop: '1rem', marginBottom: 0, color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              We encourage users to review the terms of service and privacy policies of any external websites they visit.
            </p>
          </div>
        </section>

        {/* Limitation of Liability */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FileText size={24} />
            Limitation of Liability
          </h2>
          <p>
            To the fullest extent permitted by applicable law, {LEARNSTACKHUB.brand}, {GENAIXIS.legalName} (the operator of {LEARNSTACKHUB.brand}), its contributors, and affiliates 
            shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages, or any loss of 
            profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible 
            losses resulting from:
          </p>
          <ul style={{ paddingLeft: '1.5rem' }}>
            <li>Your use or inability to use LearnStackHub</li>
            <li>Any errors or omissions in content</li>
            <li>Any unauthorized access to or use of our servers</li>
            <li>Any interruption or cessation of transmission to or from LearnStackHub</li>
            <li>Any bugs, viruses, trojan horses, or similar harmful code</li>
            <li>Any user-generated content or conduct of third parties</li>
            <li>Any loss or damage resulting from code execution</li>
            <li>Any reliance on information obtained through LearnStackHub</li>
          </ul>
          <div style={{
            background: 'var(--bg-tertiary)',
            borderLeft: '4px solid var(--accent-primary)',
            padding: '1.5rem',
            borderRadius: '8px',
            marginTop: '1.5rem'
          }}>
            <p style={{ margin: 0, fontWeight: '600' }}>
              This limitation of liability applies regardless of the legal theory on which the claim is based, including but not 
              limited to contract, tort, negligence, strict liability, or any other theory.
            </p>
          </div>
        </section>

        {/* No Warranty */}
        <section style={{ marginBottom: '3rem' }}>
          <h2>No Warranties</h2>
          <p>
            LearnStackHub is provided "as is" and "as available" without any warranties of any kind, either express or implied. 
            We disclaim all warranties, including but not limited to:
          </p>
          <ul style={{ paddingLeft: '1.5rem' }}>
            <li>Warranties of merchantability</li>
            <li>Fitness for a particular purpose</li>
            <li>Non-infringement of intellectual property</li>
            <li>Accuracy, completeness, or reliability of content</li>
            <li>Uninterrupted or error-free operation</li>
            <li>Security or freedom from viruses or harmful code</li>
            <li>Compatibility with your hardware or software</li>
          </ul>
        </section>

        {/* User Responsibility */}
        <section style={{ marginBottom: '3rem' }}>
          <h2>User Responsibility</h2>
          <p>
            By using LearnStackHub, you acknowledge and agree that:
          </p>
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: '12px',
            padding: '1.5rem',
            marginTop: '1.5rem'
          }}>
            <ul style={{ marginBottom: 0, paddingLeft: '1.5rem' }}>
              <li>You are responsible for your use of the information and code provided</li>
              <li>You will verify information before implementing it in your projects</li>
              <li>You will test code thoroughly before using it in production</li>
              <li>You will follow security best practices and industry standards</li>
              <li>You will not hold LearnStackHub liable for any issues arising from code use</li>
              <li>You will use the platform responsibly and in accordance with our Terms of Service</li>
              <li>You understand that technology changes and content may become outdated</li>
            </ul>
          </div>
        </section>

        {/* Changes to Disclaimer */}
        <section style={{ marginBottom: '3rem' }}>
          <h2>Changes to This Disclaimer</h2>
          <p>
            We reserve the right to modify this disclaimer at any time. Changes will be effective immediately upon posting to 
            this page. Your continued use of LearnStackHub after any changes constitutes acceptance of the modified disclaimer.
          </p>
          <p style={{ color: 'var(--text-secondary)' }}>
            We encourage you to review this disclaimer periodically to stay informed about how we protect your interests and 
            clarify our limitations.
          </p>
        </section>

        {/* Contact for Questions */}
        <section style={{ marginBottom: '3rem' }}>
          <h2>Questions About This Disclaimer</h2>
          <p>
            If you have any questions about this disclaimer, please contact us:
          </p>
          <div style={{
            background: 'var(--bg-tertiary)',
            padding: '1.5rem',
            borderRadius: '10px',
            marginTop: '1.5rem'
          }}>
            <p style={{ marginBottom: '0.5rem' }}>
              <strong>Email:</strong>{' '}
              <a href={`mailto:${LEARNSTACKHUB.contactEmail}`} style={{ color: 'var(--accent-primary)' }}>
                {LEARNSTACKHUB.contactEmail}
              </a>
            </p>
            <p style={{ marginBottom: '0.5rem' }}>
              <strong>Operator:</strong>{' '}
              <a href={GENAIXIS.website} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-primary)' }}>
                {GENAIXIS.legalName}
              </a>
            </p>
            <p style={{ marginBottom: '0.5rem' }}>
              <strong>CIN:</strong> {GENAIXIS.cin}
            </p>
            <p style={{ margin: 0 }}>
              <Link to="/contact" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>
                Visit our Contact Page
              </Link>
            </p>
          </div>
        </section>

        {/* Related Links */}
        <section style={{ 
          marginTop: '3rem', 
          paddingTop: '2rem', 
          borderTop: '2px solid var(--border-color)',
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap'
        }}>
          <Link to="/terms" className="btn btn-secondary">
            <FileText size={18} />
            Terms of Service
          </Link>
          <Link to="/privacy" className="btn btn-secondary">
            <Shield size={18} />
            Privacy Policy
          </Link>
          <Link to="/about" className="btn btn-secondary">
            About Us
          </Link>
          <Link to="/" className="btn btn-primary">
            ← Back to Home
          </Link>
        </section>
      </div>
    </div>
  );
}

export default Disclaimer;


