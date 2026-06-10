const SpringAiIcon = ({ size = 24, className = '', ...props }) => (
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
      d="M7.2 16.7c0-6 4.7-10.9 10.6-11.2 2.5-.1 4.9.6 6.8 2-1.7.3-3.2 1-4.4 2.1-1.9 1.7-2.9 4-2.9 6.5 0 3.3-2.7 6-6 6H7.6c-.3-1.1-.4-2.4-.4-5.4Z"
      fill="#dcfce7"
      stroke="#16a34a"
      strokeWidth="1.7"
      strokeLinejoin="round"
    />
    <path
      d="M7.7 22.1c2.6-5.1 6.1-8.6 11.2-11.1"
      stroke="#15803d"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <rect
      x="16.4"
      y="15.2"
      width="10"
      height="8.4"
      rx="2.2"
      fill="#eff6ff"
      stroke="#2563eb"
      strokeWidth="1.6"
    />
    <path
      d="M18.9 18.1h5M18.9 20.8h3.4"
      stroke="#1d4ed8"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
    <path
      d="M21.4 13.2v2M21.4 23.6v2"
      stroke="#2563eb"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <circle cx="13.4" cy="25.4" r="1.4" fill="#16a34a" />
    <circle cx="25.2" cy="9.1" r="1.4" fill="#2563eb" />
  </svg>
);

export default SpringAiIcon;
