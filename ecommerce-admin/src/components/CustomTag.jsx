import './CustomTag.css';

// 커스텀 인풋 컴포넌트
export const Input = ({ className = "", ...props }) => {
  return (
    <input
      className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  )
}

// 아이콘 컴포넌트들
export const SearchIcon = ({ className = "" }) => (
  <svg className={`h-4 w-4 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="11" cy="11" r="8"></circle>
    <path d="m21 21-4.35-4.35"></path>
  </svg>
)

export const BellIcon = ({ className = "" }) => (
  <svg className={`h-5 w-5 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
  </svg>
)

export const UserIcon = ({ className = "" }) => (
  <svg className={`h-5 w-5 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
)

export const HeartIcon = ({ className = "" }) => (
  <svg className={`h-5 w-5 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
)

export const HeartFillIcon = ({ className = "" }) => (
  <svg className={`h-5 w-5 ${className}`} fill="currentColor" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
)

export const HomeIcon = ({ className = "" }) => (
  <svg className={`h-5 w-5 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9,22 9,12 15,12 15,22"></polyline>
  </svg>
)

// 커스텀 버튼 컴포넌트
export const Button = ({ children, className = "", variant = "default", size = "default", onClick, ...props }) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"

  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    ghost: "hover:bg-gray-100 hover:text-gray-900 focus:ring-gray-500",
  }

  const sizes = {
    default: "h-10 py-2 px-4",
    sm: "h-9 px-3 text-sm",
  }

  return (
    <button className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`} onClick={onClick} {...props}>
      {children}
    </button>
  )
}

export const AvatarCustom = ({ children, className = "" }) => {
  return <div className={`relative flex shrink-0 overflow-hidden rounded ${className}`}>{children}</div>
}

// 아바타 컴포넌트
export const Avatar = ({ children, className = "" }) => {
  return <div className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded ${className}`}>{children}</div>
}

export const AvatarFallback = ({ children, className = "" }) => {
  return (
    <div className={`flex h-full w-full items-center justify-center rounded-full bg-gray-100 ${className}`}>
      {children}
    </div>
  )
}

export const MenuIcon = ({ className = "" }) => (
  <svg className={`h-4 w-4 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
)

export const ChevronRightIcon = ({ className = "" }) => (
  <svg className={`h-4 w-4 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <polyline points="9,18 15,12 9,6"></polyline>
  </svg>
)

export const ChevronDownIcon = ({ className = "" }) => (
  <svg className={`h-4 w-4 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <polyline points="6,9 12,15 18,9"></polyline>
  </svg>
)

export const CheckIcon = ({ className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="35" fill="#0E1F5B" stroke="#FFFFFF" stroke-width="5" />
    <path d="M30 50 L45 65 L70 40" fill="none" stroke="#FFFFFF" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
)

export const DownloadIcon = ({ className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 2v12" />
    <path d="m18 8-6 6-6-6" />
    <path d="M4 20h16" />
  </svg>
)

// 작성자 아이콘 (User/Author)
export const AuthorIcon = ({ className = "" }) => (
  <svg className={`h-4 w-4 ${className}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
)

// 등록일 아이콘 (Calendar/Date)
export const CalendarIcon = ({ className = "" }) => (
  <svg className={`h-4 w-4 ${className}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
)

// 조회수 아이콘 (Eye/Views)
export const EyeIcon = ({ className = "" }) => (
  <svg className={`h-4 w-4 ${className}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
)

// 에디터 컴포넌트
export const AlignLeftIcon = ({ className = "" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="15" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

export const AlignCenterIcon = ({ className = "" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="6" y1="12" x2="18" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

export const AlignRightIcon = ({ className = "" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="9" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

export const LinkIcon = ({ className = "" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M10 13a5 5 0 0 1 0-7l1.5-1.5a5 5 0 0 1 7 7L17 13" />
    <path d="M14 11a5 5 0 0 1 0 7L12.5 19.5a5 5 0 0 1-7-7L7 11" />
  </svg>
);

export const ImageIcon = ({ className = "" }) => (
  <svg
    className={className}
    viewBox="0 1 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="5" width="18" height="16" rx="2" ry="2" />
    <circle cx="9" cy="10" r="1.5" />
    <path d="M21 16l-5-5-4 4-2-2-5 5" />
  </svg>
);

export const OrderedListIcon = ({ className = "" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* 1 */}
    <line x1="4.5" y1="5" x2="4.5" y2="7" />
    <line x1="3.8" y1="5.6" x2="4.5" y2="5" />

    {/* 2 */}
    <path d="M3.6 11.2c0-.7.6-1.2 1.3-1.2.7 0 1.3.5 1.3 1.2 0 .5-.3.9-.8 1.2l-1.8 1.1h2.6" />

    {/* 3 */}
    <path d="M3.8 17.1c.3-.3.7-.5 1.1-.5.8 0 1.4.5 1.4 1.1 0 .4-.2.7-.6.9.4.2.7.6.7 1 0 .7-.7 1.2-1.5 1.2-.5 0-1-.2-1.3-.6" />

    {/* 라인 */}
    <line x1="9" y1="6" x2="21" y2="6" />
    <line x1="9" y1="12" x2="21" y2="12" />
    <line x1="9" y1="18" x2="21" y2="18" />
  </svg>
);

export const BulletListIcon = ({ className = "" }) => (
  <svg
    className={className}
    viewBox="0 0 24 22"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* 점 */}
    <circle cx="5" cy="6" r="1.5" fill="currentColor" />
    <circle cx="5" cy="12" r="1.5" fill="currentColor" />
    <circle cx="5" cy="18" r="1.5" fill="currentColor" />

    {/* 라인 */}
    <line x1="9" y1="6" x2="21" y2="6" />
    <line x1="9" y1="12" x2="21" y2="12" />
    <line x1="9" y1="18" x2="21" y2="18" />
  </svg>
);

// 아이콘 컴포넌트
export const CameraIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
      <circle cx="12" cy="13" r="4"></circle>
  </svg>
);

export const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000000ff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);