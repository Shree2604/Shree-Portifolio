
import { useEffect, useRef } from 'react';

interface Neuron {
  x: number;
  y: number;
  connections: number[];
  velocity: { x: number; y: number };
  originalX: number;
  originalY: number;
}

interface CodeSnippet {
  text: string;
  x: number;
  y: number;
  opacity: number;
  duration: number;
  startTime: number;
}

const NeuralNetworkAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initNetwork();
    };
    
    // Neural network parameters
    const layers = 4;
    const neuronsPerLayer = [5, 8, 8, 4];
    const neurons: Neuron[] = [];
    const connectionStrength: number[] = [];
    let animationFrameId: number;
    let mousePosition = { x: 0, y: 0 };
    let mouseActive = false;
    const influence = 100; // Mouse influence radius
    
    // ML code snippets for microtext animations
    const codeSnippets = [
      "model = tf.keras.Sequential()",
      "x = torch.randn(3, 224, 224)",
      "def train_step(x_batch, y_batch):",
      "loss = tf.reduce_mean(tf.nn.softmax_cross_entropy_with_logits(y, y_pred))",
      "optimizer = optim.Adam(model.parameters())",
      "accuracy = tf.reduce_mean(tf.cast(correct_prediction, tf.float32))",
      "y_pred = model(x, training=True)",
      "class CNNModel(nn.Module):",
      "@tf.function",
      "x = F.relu(self.conv1(x))",
      "embedding = model.encode(input_text)",
      "precision, recall = evaluate_model(test_data)"
    ];
    
    const activeCodeSnippets: CodeSnippet[] = [];
    
    // Initialize neural network
    const initNetwork = () => {
      neurons.length = 0;
      connectionStrength.length = 0;
      
      const width = canvas.width;
      const height = canvas.height;
      const horizontalGap = width / (layers + 1);
      
      let neuronIndex = 0;
      
      // Create neurons for each layer
      for (let layer = 0; layer < layers; layer++) {
        const neuronsInLayer = neuronsPerLayer[layer];
        const verticalGap = height / (neuronsInLayer + 1);
        
        for (let i = 0; i < neuronsInLayer; i++) {
          const x = horizontalGap * (layer + 1);
          const y = verticalGap * (i + 1);
          
          neurons.push({
            x,
            y,
            originalX: x,
            originalY: y,
            velocity: { x: 0, y: 0 },
            connections: []
          });
          
          // Connect to previous layer
          if (layer > 0) {
            // Changed from const to let since we need to modify this value
            let prevLayerStart = 0;
            for (let l = 0; l < layer; l++) {
              prevLayerStart += neuronsPerLayer[l];
            }
            prevLayerStart -= neuronsPerLayer[layer - 1];
            
            // Connect to each neuron in previous layer
            for (let j = 0; j < neuronsPerLayer[layer - 1]; j++) {
              const prevNeuronIndex = prevLayerStart + j;
              
              neurons[neuronIndex].connections.push(prevNeuronIndex);
              connectionStrength.push(Math.random());
            }
          }
          
          neuronIndex++;
        }
      }
    };
    
    // Create new code snippet animation
    const createCodeSnippet = () => {
      if (activeCodeSnippets.length > 5) return; // Limit number of simultaneous snippets
      
      const snippet = {
        text: codeSnippets[Math.floor(Math.random() * codeSnippets.length)],
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        opacity: 0,
        duration: 3000 + Math.random() * 3000, // 3-6 seconds lifetime
        startTime: Date.now()
      };
      
      activeCodeSnippets.push(snippet);
    };
    
    // Mouse move event handler
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition = {
        x: e.clientX,
        y: e.clientY
      };
      mouseActive = true;
      
      // Reset mouse activity after 2 seconds of inactivity
      clearTimeout(mouseTimeout);
      mouseTimeout = setTimeout(() => {
        mouseActive = false;
      }, 2000) as unknown as number; // Type assertion to fix TypeScript error
    };
    
    // Handle touch events for mobile
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mousePosition = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY
        };
        mouseActive = true;
        
        // Reset mouse activity after 2 seconds of inactivity
        clearTimeout(mouseTimeout);
        mouseTimeout = setTimeout(() => {
          mouseActive = false;
        }, 2000) as unknown as number; // Type assertion to fix TypeScript error
      }
    };
    
    let mouseTimeout: number;
    
    // Draw the neural network
    const drawNetwork = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const now = Date.now();
      
      // Maybe create a new code snippet
      if (Math.random() < 0.01) {
        createCodeSnippet();
      }
      
      // Draw and update code snippets
      ctx.font = '12px monospace';
      for (let i = activeCodeSnippets.length - 1; i >= 0; i--) {
        const snippet = activeCodeSnippets[i];
        const elapsed = now - snippet.startTime;
        
        // Fade in/out animation
        if (elapsed < 1000) {
          snippet.opacity = elapsed / 1000; // Fade in during first second
        } else if (elapsed > snippet.duration - 1000) {
          snippet.opacity = (snippet.duration - elapsed) / 1000; // Fade out during last second
        } else {
          snippet.opacity = 1;
        }
        
        // Draw snippet
        ctx.fillStyle = `rgba(14, 165, 233, ${snippet.opacity * 0.6})`;
        ctx.fillText(snippet.text, snippet.x, snippet.y);
        
        // Remove expired snippets
        if (elapsed > snippet.duration) {
          activeCodeSnippets.splice(i, 1);
        }
      }
      
      // Update neurons - respond to mouse movement
      neurons.forEach((neuron) => {
        if (mouseActive) {
          const dx = mousePosition.x - neuron.x;
          const dy = mousePosition.y - neuron.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Apply force if mouse is close enough
          if (distance < influence) {
            // Repel or attract based on layer (creates interesting effect)
            const force = 0.2 * (influence - distance) / influence;
            neuron.velocity.x -= dx * force / distance;
            neuron.velocity.y -= dy * force / distance;
          }
        }
        
        // Apply velocity
        neuron.x += neuron.velocity.x;
        neuron.y += neuron.velocity.y;
        
        // Damping
        neuron.velocity.x *= 0.95;
        neuron.velocity.y *= 0.95;
        
        // Spring back to original position
        const springFactor = 0.03;
        neuron.velocity.x += (neuron.originalX - neuron.x) * springFactor;
        neuron.velocity.y += (neuron.originalY - neuron.y) * springFactor;
      });
      
      // Draw connections
      let connectionIndex = 0;
      
      neurons.forEach((neuron) => {
        neuron.connections.forEach((connectedNeuronIdx) => {
          const connectedNeuron = neurons[connectedNeuronIdx];
          
          // Animate connection strength
          const strength = Math.abs(Math.sin(connectionStrength[connectionIndex] * Date.now() * 0.0005));
          connectionStrength[connectionIndex] += 0.001;
          
          // Draw connection line
          ctx.beginPath();
          ctx.moveTo(neuron.x, neuron.y);
          ctx.lineTo(connectedNeuron.x, connectedNeuron.y);
          ctx.strokeStyle = `rgba(59, 130, 246, ${strength * 0.3})`;
          ctx.lineWidth = strength * 1.8;
          ctx.stroke();
          
          connectionIndex++;
        });
      });
      
      // Draw neurons
      neurons.forEach((neuron) => {
        ctx.beginPath();
        ctx.arc(neuron.x, neuron.y, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(14, 165, 233, 0.8)';
        ctx.fill();
        
        // Add glow effect
        ctx.beginPath();
        ctx.arc(neuron.x, neuron.y, 5, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(
          neuron.x, neuron.y, 0,
          neuron.x, neuron.y, 5
        );
        gradient.addColorStop(0, 'rgba(14, 165, 233, 0.5)');
        gradient.addColorStop(1, 'rgba(14, 165, 233, 0)');
        ctx.fillStyle = gradient;
        ctx.fill();
      });
      
      animationFrameId = requestAnimationFrame(drawNetwork);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    drawNetwork();
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', resizeCanvas);
      clearTimeout(mouseTimeout);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  return <canvas ref={canvasRef} className="w-full h-full" />;
};

export default NeuralNetworkAnimation;
