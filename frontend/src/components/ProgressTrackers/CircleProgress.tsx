import React from 'react';

interface CircleProgressProps {
  score: number;
  maxScore?: number;
  size?: number;
  strokeWidth?: number;
}

const CircleProgress: React.FC<CircleProgressProps> = ({
  score,
  maxScore = 10,
  size = 80,
  strokeWidth = 4,
}) => {
  // Calculate percentage and parameters for SVG
  const percentage = (score / maxScore) * 100;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  // Function to determine stroke color based on score
  const getStrokeColor = (score: number): string => {
    if (score >= 9) return '#4CAF50'; // Green
    if (score >= 7) return '#FFC107'; // Amber/Yellow
    if (score >= 5) return '#FF9800'; // Orange
    return '#F44336'; // Red
  };

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg
        className="transform -rotate-90"
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#1e293b"
          strokeWidth={strokeWidth}
        />

        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={getStrokeColor(score)}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-500 ease-in-out"
        />
      </svg>

      {/* Score text */}
      <span className="absolute text-lg font-bold text-white">
        {score}
      </span>
    </div>
  );
};

export default CircleProgress;
