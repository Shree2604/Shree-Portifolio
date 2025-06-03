
import { useEffect, useRef } from 'react';

const MatrixRainEffect = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Characters to use in the rain
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノ';
    
    let drops: number[] = []; // array of drop positions
    let fontSize = 14; // font size
    let columns = 0; // number of columns
    let animationFrameId: number;
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Calculate columns based on canvas width and font size
      columns = Math.floor(canvas.width / fontSize);
      
      // Initialize all drops at random positions above the canvas
      drops = [];
      for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -canvas.height;
      }
    };
    
    // Draw the rain
    const draw = () => {
      // Semi-transparent black to create fade effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Set text style
      ctx.fillStyle = '#0ea5e9'; // Use accent color from theme
      ctx.font = `${fontSize}px monospace`;
      
      // Loop over each column
      for (let i = 0; i < drops.length; i++) {
        // Pick a random character
        const text = chars[Math.floor(Math.random() * chars.length)];
        
        // Calculate x position based on column and y position from drops array
        const x = i * fontSize;
        const y = drops[i];
        
        // Draw the character
        ctx.fillText(text, x, y);
        
        // Move the drop down
        drops[i] += fontSize;
        
        // Send the drop back to the top randomly
        if (drops[i] > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
      }
      
      animationFrameId = requestAnimationFrame(draw);
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    draw();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 z-0 opacity-10" 
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default MatrixRainEffect;
