'use client';

interface PulseLoaderProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

export default function PulseLoader({ size = 'medium', color = 'var(--blue-9)' }: PulseLoaderProps) {
  const dotSize = {
    small: 'w-2 h-2',
    medium: 'w-3 h-3',
    large: 'w-4 h-4',
  }[size];

  return (
    <div className="flex items-center gap-1">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`${dotSize} rounded-full animate-pulse`}
          style={{
            backgroundColor: color,
            animationDelay: `${i * 0.15}s`,
          }}
        />
      ))}
    </div>
  );
}
