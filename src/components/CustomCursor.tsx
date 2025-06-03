
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [trails, setTrails] = useState<{ x: number, y: number, id: number }[]>([]);
  const [nextId, setNextId] = useState(0);
  
  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsActive(true);
      
      // Add trail points when mouse moves
      if (trails.length < 10) {
        setTrails(prev => [...prev, { x: e.clientX, y: e.clientY, id: nextId }]);
        setNextId(prev => prev + 1);
      } else {
        setTrails(prev => [...prev.slice(1), { x: e.clientX, y: e.clientY, id: nextId }]);
        setNextId(prev => prev + 1);
      }
    };
    
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsActive(false);
    const handleMouseEnter = () => setIsActive(true);
    
    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mouseenter', handleMouseEnter);
    
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [nextId, trails.length]);
  
  // Generate random ML code snippets for the cursor trails
  const getRandomCodeSnippet = () => {
    const snippets = [
      "model.train()",
      "x = torch.tensor()",
      "def predict():",
      "loss = mse(y, y_pred)",
      "accuracy = 98.5%",
      "epochs: 100",
      "batch_size: 32",
      "learning_rate: 0.001"
    ];
    return snippets[Math.floor(Math.random() * snippets.length)];
  };
  
  if (!isActive) return null;
  
  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-50"
        style={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
        }}
        animate={{
          scale: isClicking ? 0.8 : 1,
        }}
        transition={{ duration: 0.15 }}
      >
        <div className="w-full h-full rounded-full border-2 border-primary flex items-center justify-center">
          <div className={`w-2 h-2 bg-primary rounded-full ${isClicking ? 'scale-150' : ''} transition-transform duration-150`} />
        </div>
      </motion.div>
      
      {/* Trail effects */}
      {trails.map((trail, index) => (
        <motion.div
          key={trail.id}
          className="fixed top-0 left-0 pointer-events-none z-50 text-xs font-mono text-primary/60"
          initial={{ opacity: 0.8, x: trail.x + 10, y: trail.y + 10 }}
          animate={{ opacity: 0, x: trail.x + 10 + (Math.random() * 40 - 20), y: trail.y + 10 + (Math.random() * 20 - 10) }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          {index % 2 === 0 && getRandomCodeSnippet()}
        </motion.div>
      ))}
    </>
  );
};

export default CustomCursor;
