import { generateSitemap } from '../utils/generateSitemap';

function Sitemap() {
  const sitemap = generateSitemap();

  // Return XML directly - React will render it as text
  return (
    <pre style={{ 
      margin: 0,
      padding: 0,
      whiteSpace: 'pre',
      fontFamily: 'monospace',
      fontSize: '12px'
    }}>
      {sitemap}
    </pre>
  );
}

export default Sitemap;
