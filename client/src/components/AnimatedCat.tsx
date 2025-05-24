import { useState, useEffect } from "react";

export function AnimatedCat() {
  const [eyeBlink, setEyeBlink] = useState(false);
  const [tailWag, setTailWag] = useState(false);

  useEffect(() => {
    // Piscar os olhos aleatoriamente
    const blinkInterval = setInterval(() => {
      setEyeBlink(true);
      setTimeout(() => setEyeBlink(false), 150);
    }, 2000 + Math.random() * 3000);

    // Mexer o rabo
    const tailInterval = setInterval(() => {
      setTailWag(true);
      setTimeout(() => setTailWag(false), 600);
    }, 1500 + Math.random() * 2000);

    return () => {
      clearInterval(blinkInterval);
      clearInterval(tailInterval);
    };
  }, []);

  return (
    <div className="relative w-20 h-16 mx-auto mb-4">
      <svg
        viewBox="0 0 80 64"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Rabo */}
        <path
          d="M65 45 Q75 35 72 25 Q70 20 65 22"
          stroke="#E91E63"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          className={`transform origin-[65px_45px] transition-transform duration-300 ${
            tailWag ? "rotate-12" : "rotate-0"
          }`}
        />
        
        {/* Corpo */}
        <ellipse
          cx="40"
          cy="45"
          rx="22"
          ry="16"
          fill="#FFB6C1"
          stroke="#E91E63"
          strokeWidth="2"
        />
        
        {/* Cabeça */}
        <circle
          cx="40"
          cy="25"
          r="18"
          fill="#FFB6C1"
          stroke="#E91E63"
          strokeWidth="2"
        />
        
        {/* Orelhas */}
        <path
          d="M28 15 L32 5 L36 15 Z"
          fill="#FFB6C1"
          stroke="#E91E63"
          strokeWidth="2"
        />
        <path
          d="M44 15 L48 5 L52 15 Z"
          fill="#FFB6C1"
          stroke="#E91E63"
          strokeWidth="2"
        />
        
        {/* Orelhas internas */}
        <path
          d="M30 13 L32 8 L34 13 Z"
          fill="#E91E63"
        />
        <path
          d="M46 13 L48 8 L50 13 Z"
          fill="#E91E63"
        />
        
        {/* Olhos */}
        <ellipse
          cx="35"
          cy="22"
          rx="3"
          ry={eyeBlink ? "0.5" : "4"}
          fill="#2D3748"
          className="transition-all duration-150"
        />
        <ellipse
          cx="45"
          cy="22"
          rx="3"
          ry={eyeBlink ? "0.5" : "4"}
          fill="#2D3748"
          className="transition-all duration-150"
        />
        
        {/* Brilho nos olhos */}
        {!eyeBlink && (
          <>
            <ellipse cx="36" cy="20" rx="1" ry="1.5" fill="white" />
            <ellipse cx="46" cy="20" rx="1" ry="1.5" fill="white" />
          </>
        )}
        
        {/* Nariz */}
        <path
          d="M38 28 L40 26 L42 28 L40 30 Z"
          fill="#E91E63"
        />
        
        {/* Boca */}
        <path
          d="M40 30 Q35 35 30 32"
          stroke="#E91E63"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M40 30 Q45 35 50 32"
          stroke="#E91E63"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        
        {/* Bigodes */}
        <line x1="20" y1="25" x2="28" y2="27" stroke="#E91E63" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="20" y1="30" x2="28" y2="30" stroke="#E91E63" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="52" y1="27" x2="60" y2="25" stroke="#E91E63" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="52" y1="30" x2="60" y2="30" stroke="#E91E63" strokeWidth="1.5" strokeLinecap="round" />
        
        {/* Patas */}
        <ellipse cx="30" cy="58" rx="4" ry="6" fill="#FFB6C1" stroke="#E91E63" strokeWidth="2" />
        <ellipse cx="40" cy="58" rx="4" ry="6" fill="#FFB6C1" stroke="#E91E63" strokeWidth="2" />
        <ellipse cx="50" cy="58" rx="4" ry="6" fill="#FFB6C1" stroke="#E91E63" strokeWidth="2" />
        
        {/* Manchinhas */}
        <circle cx="32" cy="20" r="2" fill="#E91E63" opacity="0.6" />
        <circle cx="48" cy="35" r="1.5" fill="#E91E63" opacity="0.6" />
        <circle cx="25" cy="40" r="1" fill="#E91E63" opacity="0.6" />
      </svg>
      
      {/* Coração flutuante ocasional */}
      <div className="absolute -top-2 -right-2 animate-bounce">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
          <path
            d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
            fill="#E91E63"
            className="animate-pulse"
          />
        </svg>
      </div>
    </div>
  );
}