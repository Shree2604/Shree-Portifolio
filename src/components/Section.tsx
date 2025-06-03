
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionProps {
  children: ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  id?: string;
}

export default function Section({ 
  children, 
  className,
  title,
  subtitle,
  id 
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'min-h-screen py-20 px-4 md:px-8 relative overflow-hidden',
        className
      )}
    >
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-neon-blue/30 blur-3xl rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-neon-purple/30 blur-3xl rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-1/4 h-1/4 bg-neon-pink/30 blur-3xl rounded-full"></div>
      </div>
      
      {(title || subtitle) && (
        <div className="text-center mb-12 md:mb-16 relative z-10">
          {title && (
            <div className="relative inline-block">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 cyber-gradient-text glitch-text">
                {title}
              </h2>
              <div className="absolute -inset-1 bg-cyber-gradient opacity-30 blur-sm rounded-lg -z-10"></div>
            </div>
          )}
          {subtitle && (
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>
      )}
      <div className="relative z-10">
        {children}
      </div>
    </section>
  );
}
