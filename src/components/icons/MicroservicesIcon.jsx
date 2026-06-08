const MicroservicesIcon = ({ size = 24, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
    focusable="false"
    {...props}
  >
    <path
      d="M10.4 11.2 16 6.8l5.6 4.4M10.4 20.8 16 25.2l5.6-4.4M9.3 13.7l-3.7 3 3.7 2.9M22.7 13.7l3.7 3-3.7 2.9"
      stroke="#0f766e"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <rect
      x="11.1"
      y="3.9"
      width="9.8"
      height="6.9"
      rx="2"
      fill="#ecfeff"
      stroke="#0891b2"
      strokeWidth="1.7"
    />
    <rect
      x="3.7"
      y="13.1"
      width="9.2"
      height="7.2"
      rx="2"
      fill="#f0fdfa"
      stroke="#0f766e"
      strokeWidth="1.7"
    />
    <rect
      x="19.1"
      y="13.1"
      width="9.2"
      height="7.2"
      rx="2"
      fill="#eff6ff"
      stroke="#2563eb"
      strokeWidth="1.7"
    />
    <rect
      x="11.1"
      y="21.2"
      width="9.8"
      height="6.9"
      rx="2"
      fill="#f8fafc"
      stroke="#475569"
      strokeWidth="1.7"
    />
    <circle cx="16" cy="7.35" r="1.05" fill="#0891b2" />
    <circle cx="8.3" cy="16.7" r="1.05" fill="#0f766e" />
    <circle cx="23.7" cy="16.7" r="1.05" fill="#2563eb" />
    <circle cx="16" cy="24.65" r="1.05" fill="#475569" />
  </svg>
);

export default MicroservicesIcon;
