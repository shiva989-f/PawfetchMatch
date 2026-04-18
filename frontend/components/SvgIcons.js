export const PawIcon = ({ size = 24, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <ellipse cx="6" cy="7" rx="2" ry="2.8" />
    <ellipse cx="10.5" cy="4.5" rx="1.8" ry="2.5" />
    <ellipse cx="15" cy="5" rx="1.8" ry="2.5" />
    <ellipse cx="19" cy="7.5" rx="1.8" ry="2.5" />
    <path d="M12 10c-3.5 0-7 2.5-6.5 6.5.3 2.2 2 4 4.5 4.5 1.3.3 2.7 0 4 0s2.7.3 4 0c2.5-.5 4.2-2.3 4.5-4.5C23 12.5 15.5 10 12 10z" />
  </svg>
);

export const HeartIcon = ({ filled = false }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);
