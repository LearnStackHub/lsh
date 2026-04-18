import { Linkedin, Facebook, Instagram } from 'lucide-react';
import { SOCIAL_LINKS } from '../config/socialLinks';

const ITEMS = [
  { key: 'linkedin', href: SOCIAL_LINKS.linkedin, label: 'LinkedIn', Icon: Linkedin },
  { key: 'facebook', href: SOCIAL_LINKS.facebook, label: 'Facebook', Icon: Facebook },
  { key: 'instagram', href: SOCIAL_LINKS.instagram, label: 'Instagram', Icon: Instagram },
];

/**
 * Official LearnStackHub social links (LinkedIn, Facebook, Instagram).
 * @param {{ showLabels?: boolean, className?: string, iconSize?: number }} props
 */
function SocialOfficialLinks({ showLabels = false, className = '', iconSize = 22 }) {
  return (
    <div className={`social-official-links ${className}`.trim()} role="list">
      {ITEMS.map(({ key, href, label, Icon }) => (
        <a
          key={key}
          role="listitem"
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="social-official-links__a"
          aria-label={`LearnStackHub on ${label}`}
        >
          <Icon size={iconSize} aria-hidden />
          {showLabels ? <span>{label}</span> : null}
        </a>
      ))}
    </div>
  );
}

export default SocialOfficialLinks;
