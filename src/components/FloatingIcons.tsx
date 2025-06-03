
import { useEffect, useState } from 'react';
import { Code, Database, Brain, Cpu, Server, BarChart } from 'lucide-react';

interface FloatingIcon {
  id: number;
  Icon: React.ElementType;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
}

export default function FloatingIcons() {
  const [icons, setIcons] = useState<FloatingIcon[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Initialize fewer icons
    const iconComponents = [Code, Database, Brain, Cpu, Server, BarChart];
    const initialIcons: FloatingIcon[] = [];

    for (let i = 0; i < 5; i++) {
      initialIcons.push({
        id: i,
        Icon: iconComponents[i % iconComponents.length],
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 12 + 10,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 0.3,
      });
    }

    setIcons(initialIcons);

    // Animation loop
    const interval = setInterval(() => {
      setIcons(prevIcons => 
        prevIcons.map(icon => {
          let newX = icon.x + icon.speedX;
          let newY = icon.y + icon.speedY;
          let newRotation = icon.rotation + icon.rotationSpeed;

          // Bounce off edges
          if (newX <= 0 || newX >= window.innerWidth) {
            newX = Math.max(0, Math.min(newX, window.innerWidth));
            icon.speedX *= -1;
          }
          
          if (newY <= 0 || newY >= window.innerHeight) {
            newY = Math.max(0, Math.min(newY, window.innerHeight));
            icon.speedY *= -1;
          }

          return {
            ...icon,
            x: newX,
            y: newY,
            rotation: newRotation % 360,
          };
        })
      );
    }, 30);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {icons.map(({ id, Icon, x, y, size, rotation }) => (
        <div
          key={id}
          className="absolute text-primary/10"
          style={{
            left: `${x}px`,
            top: `${y}px`,
            transform: `rotate(${rotation}deg)`,
            transition: 'transform 0.3s ease-out'
          }}
        >
          <Icon size={size} strokeWidth={1} />
        </div>
      ))}
    </div>
  );
}
