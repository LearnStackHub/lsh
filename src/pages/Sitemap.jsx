import { generateSitemap } from '../utils/generateSitemap';
import SEOHead from '../components/SEOHead';

function Sitemap() {
  const sitemap = generateSitemap();

  // Return XML directly - React will render it as text
  return (
    <>
      <SEOHead 
        title="Sitemap - LearnStackHub | All Tutorials & Pages"
        description="Complete sitemap of LearnStackHub - Browse all Java tutorials, courses, and pages. Find Core Java, JDBC, Servlets, JSP, Hibernate, and MySQL tutorials."
      />
      <pre style={{ 
      margin: 0,
      padding: 0,
      whiteSpace: 'pre',
      fontFamily: 'monospace',
      fontSize: '12px'
    }}>
      {sitemap}
    </pre>
    </>
  );
}

export default Sitemap;
