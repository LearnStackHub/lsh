import logoImage from '../../assets/LSH.png';
import { BRAND } from '../../config/brand';

export default function RecruitmentLogo({ className = '', size = 'md' }) {
  return (
    <img
      src={logoImage}
      alt={BRAND.name}
      className={['recruitment-logo', `recruitment-logo--${size}`, className].filter(Boolean).join(' ')}
    />
  );
}
