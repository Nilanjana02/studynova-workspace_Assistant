import React from 'react'

function StudyNovaLogo() {
  return (   
    <div className="flex items-center space-x-3">
      {/* Star + Book Icon */}
      <svg
        width="40"
        height="40"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="32" cy="32" r="30" fill="url(#grad)" />
        <path
          d="M32 14L36 26H48L38 34L42 46L32 38L22 46L26 34L16 26H28L32 14Z"
          fill="white"
        />
        <defs>
          <linearGradient id="grad" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
            <stop stopColor="#8b5cf6" />
            <stop offset="1" stopColor="#ec4899" />
          </linearGradient>
        </defs>
      </svg>

      {/* Text */}
      <div>
        <h1 className="text-2xl font-bold gradient-text leading-tight">STUDYNOVA</h1>
        <p className="text-slate-400 text-sm">Ignite Your Learning Journey</p>
      </div>
    </div>
  );
};

export default StudyNovaLogo;
