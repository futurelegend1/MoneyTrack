export default function IconMoneyTrack({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Green wallet */}
      <rect x="2" y="6" width="20" height="14" rx="3" fill="#34D399" />
      {/* Wallet flap */}
      <rect x="2" y="6" width="20" height="4" rx="2" fill="#10B981" />
      {/* Coin popping out */}
      <circle cx="18" cy="5" r="3" fill="#FBBF24" />
      {/* Small highlight */}
      <circle cx="19" cy="4" r="0.5" fill="white" />
    </svg>
  );
}
