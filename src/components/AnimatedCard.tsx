
import { ReactNode, useState } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  glowOnHover?: boolean;
  flipOnHover?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  rotateOnScroll?: boolean;
  isometric?: boolean;
}

export function AnimatedCard({ 
  children, 
  className,
  glowOnHover = false,
  flipOnHover = false,
  onMouseEnter,
  onMouseLeave,
  rotateOnScroll = false,
  isometric = false
}: AnimatedCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (onMouseEnter) onMouseEnter();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
    if (onMouseLeave) onMouseLeave();
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isHovered || !glowOnHover) return;
    
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    setRotation({ x: rotateX, y: rotateY });
  };

  return (
    <div
      className={cn(
        'glass transition-all duration-300 overflow-hidden relative',
        glowOnHover && isHovered && 'neon-border',
        flipOnHover && 'perspective-1000',
        isometric && 'isometric-card',
        rotateOnScroll && 'transform-gpu',
        className
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={
        glowOnHover && isHovered
          ? {
              transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(1.03)`,
              transition: 'transform 0.1s ease'
            }
          : {}
      }
    >
      <div 
        className={cn(
          'h-full w-full transition-all duration-500',
          flipOnHover && isHovered && 'rotate-y-180'
        )}
      >
        {children}
      </div>
      
      {/* Subtle border gradient */}
      <div 
        className={cn(
          'absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-300 rounded-xl',
          isHovered && 'opacity-100'
        )}
        style={{
          background: 'linear-gradient(45deg, rgba(159, 0, 255, 0.5), rgba(0, 242, 255, 0.5))',
          filter: 'blur(1px)',
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
          padding: '1px'
        }}
      />

      {/* Additional glow effect */}
      {glowOnHover && (
        <div 
          className={cn(
            'absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-300 rounded-xl',
            isHovered && 'opacity-60'
          )}
          style={{
            background: 'radial-gradient(circle at center, rgba(0, 242, 255, 0.3) 0%, transparent 70%)',
            filter: 'blur(15px)'
          }}
        />
      )}
    </div>
  );
}

export function AnimatedFlipCard({ 
  frontContent,
  backContent,
  className
}: { 
  frontContent: ReactNode, 
  backContent: ReactNode,
  className?: string
}) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className={cn(
        'glass perspective-1000 cursor-pointer h-full',
        className
      )}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div 
        className={cn(
          'relative w-full h-full transition-transform duration-500 preserve-3d',
          isFlipped && 'rotate-y-180'
        )}
      >
        {/* Front */}
        <div className="absolute w-full h-full backface-hidden">
          {frontContent}
        </div>
        
        {/* Back */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180">
          {backContent}
        </div>
      </div>
    </div>
  );
}
