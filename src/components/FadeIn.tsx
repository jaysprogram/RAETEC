import React from 'react';
import type { CSSProperties } from 'react';
import { useInView } from '../hooks/useInView';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: CSSProperties;
}

export function FadeIn({ children, delay = 0, className = '', style = {} }: FadeInProps) {
  const [ref, isVisible] = useInView(0.1);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}
