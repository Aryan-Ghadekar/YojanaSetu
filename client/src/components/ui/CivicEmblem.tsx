interface CivicEmblemProps {
  className?: string;
  size?: number;
}

const CivicEmblem = ({ className = 'w-7 h-7', size = 28 }: CivicEmblemProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Outer subtle shield */}
      <path
        d="M24 4L7 11V22C7 32.5 14.3 42.1 24 44.8C33.7 42.1 41 32.5 41 22V11L24 4Z"
        fill="#0F172A"
      />
      {/* Saffron accent arc */}
      <path
        d="M14 17C17 14 31 14 34 17"
        stroke="#F59E0B"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Ashoka Chakra 8-spoke stylized digital core */}
      <circle cx="24" cy="25" r="7" stroke="#38BDF8" strokeWidth="2" strokeDasharray="3 2" />
      <circle cx="24" cy="25" r="2.5" fill="#38BDF8" />
      {/* Green base foundation arch */}
      <path
        d="M16 33C19 35.5 29 35.5 32 33"
        stroke="#10B981"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default CivicEmblem;
