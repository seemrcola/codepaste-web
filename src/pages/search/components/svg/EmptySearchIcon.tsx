interface EmptySearchIconProps {
  className?: string
  size?: number
}

function EmptySearchIcon({ className = "mx-auto mb-3", size = 80 }: EmptySearchIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* 搜索框 */}
      <circle
        cx="30"
        cy="30"
        r="15"
        stroke="#D1D5DB"
        strokeWidth="2.5"
        fill="none"
      />
      
      {/* 搜索柄 */}
      <line
        x1="42"
        y1="42"
        x2="55"
        y2="55"
        stroke="#D1D5DB"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      
      {/* 问号 */}
      <path
        d="M27 25 Q30 22 33 25 Q33 28 30 29 L30 32 M30 36 L30 37"
        stroke="#9CA3AF"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      
      {/* 装饰点 */}
      <circle cx="60" cy="20" r="1.5" fill="#E5E7EB" />
      <circle cx="65" cy="15" r="1" fill="#D1D5DB" />
      <circle cx="15" cy="60" r="2" fill="#E5E7EB" />
    </svg>
  )
}

export default EmptySearchIcon 
