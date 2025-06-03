
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Progress } from '@/components/ui/progress';
import { Infinity as InfinityIcon } from 'lucide-react';

const taglines = [
  "Where AI Vision Meets Human Creativity",
  "Transforming Data into Intelligence",
  "Harnessing AI to solve tomorrow's challenges"
];

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [taglineIndex, setTaglineIndex] = useState(0);
  
  useEffect(() => {
    // Cycle through taglines
    const taglineInterval = setInterval(() => {
      setTaglineIndex(prev => (prev + 1) % taglines.length);
    }, 3000);
    
    // Progress animation - simplified to be more linear and predictable
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        // More straightforward progress increment
        const newProgress = Math.min(100, prev + 1.5);
        return newProgress;
      });
    }, 50);
    
    return () => {
      clearInterval(taglineInterval);
      clearInterval(progressInterval);
    };
  }, []);
  
  // Complete loading when progress reaches 100%
  useEffect(() => {
    if (progress >= 100) {
      setTimeout(() => {
        onComplete();
      }, 500);
    }
  }, [progress, onComplete]);
  
  return (
    <motion.div 
      className="fixed inset-0 bg-gradient-to-b from-navy-dark to-background z-50 flex flex-col items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 }}}
    >
      <div className="w-full max-w-md flex flex-col items-center">
        {/* Enhanced infinity animation container */}
        <div className="relative h-32 w-32 mb-8">
          {/* Cosmic background effect */}
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-radial from-blue-500/10 to-transparent"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.7, 0.4]
            }}
            transition={{ 
              duration: 4, 
              repeat: Number.MAX_SAFE_INTEGER, 
              ease: "easeInOut" 
            }}
          />
          
          {/* Constellation-like particles */}
          <div className="absolute inset-0">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-1 w-1 rounded-full bg-primary/80"
                initial={{ 
                  x: Math.random() * 80 - 40,
                  y: Math.random() * 80 - 40,
                  opacity: Math.random() * 0.5 + 0.2
                }}
                animate={{ 
                  opacity: [0.2, 0.8, 0.2],
                  scale: [0.8, 1.2, 0.8]
                }}
                transition={{ 
                  duration: 2 + Math.random() * 3,
                  repeat: Number.MAX_SAFE_INTEGER,
                  delay: Math.random() * 2
                }}
              />
            ))}
          </div>
          
          {/* Energy field rings */}
          <motion.div 
            className="absolute inset-4 rounded-full border-2 border-primary/30"
            animate={{ 
              rotate: [0, 360],
              opacity: [0.4, 0.7, 0.4]
            }}
            transition={{ 
              rotate: { duration: 10, repeat: Number.MAX_SAFE_INTEGER, ease: "linear" },
              opacity: { duration: 3, repeat: Number.MAX_SAFE_INTEGER, ease: "easeInOut" }
            }}
          />
          
          <motion.div 
            className="absolute inset-8 rounded-full border border-teal-400/30"
            animate={{ 
              rotate: [360, 0],
              scale: [0.9, 1.1, 0.9],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ 
              rotate: { duration: 8, repeat: Number.MAX_SAFE_INTEGER, ease: "linear" },
              scale: { duration: 4, repeat: Number.MAX_SAFE_INTEGER, ease: "easeInOut" },
              opacity: { duration: 2, repeat: Number.MAX_SAFE_INTEGER, ease: "easeInOut" }
            }}
          />
          
          {/* Main infinity with 3D transformation */}
          <motion.div 
            className="absolute inset-0 flex items-center justify-center"
            style={{ perspective: '800px' }}
          >
            <motion.div
              animate={{ 
                rotateY: [0, 180, 360],
                rotateX: [10, -10, 10]
              }}
              transition={{ 
                duration: 8, 
                repeat: Number.MAX_SAFE_INTEGER, 
                ease: "easeInOut" 
              }}
              className="relative"
            >
              {/* Infinity symbol with dynamic glow */}
              <motion.div
                className="relative"
                animate={{ 
                  scale: [1, 1.1, 1],
                  filter: [
                    'drop-shadow(0 0 8px rgba(14, 165, 233, 0.5))', 
                    'drop-shadow(0 0 16px rgba(14, 165, 233, 0.8))', 
                    'drop-shadow(0 0 8px rgba(14, 165, 233, 0.5))'
                  ],
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Number.MAX_SAFE_INTEGER, 
                  ease: "easeInOut" 
                }}
              >
                {/* Glowing background effect */}
                <motion.div 
                  className="absolute inset-0 blur-md rounded-full bg-teal-400/30"
                  animate={{ 
                    opacity: [0.3, 0.7, 0.3]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Number.MAX_SAFE_INTEGER, 
                    ease: "easeInOut" 
                  }}
                />
                
                {/* Pulsing halo */}
                <motion.div
                  className="absolute -inset-4 bg-primary/5 rounded-full blur-xl"
                  animate={{ 
                    scale: [0.8, 1.2, 0.8], 
                    opacity: [0.2, 0.4, 0.2] 
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Number.MAX_SAFE_INTEGER, 
                    ease: "easeInOut" 
                  }}
                />
                
                {/* Flowing lines tracing the infinity path */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Number.MAX_SAFE_INTEGER, ease: "linear" }}
                >
                  {[...Array(2)].map((_, i) => (
                    <motion.div 
                      key={i} 
                      className="absolute h-1 w-1 rounded-full bg-blue-400"
                      initial={{ pathOffset: i * 0.5 }}
                      animate={{ 
                        pathOffset: [(i * 0.5), ((i * 0.5) + 1) % 1]
                      }}
                      transition={{ 
                        duration: 5, 
                        repeat: Number.MAX_SAFE_INTEGER, 
                        ease: "linear",
                        delay: i * 0.5
                      }}
                      style={{ offsetPath: "path('M 20,20 C 40,0 60,0 80,20 C 100,40 100,60 80,80 C 60,100 40,100 20,80 C 0,60 0,40 20,20 Z')" }}
                    />
                  ))}
                </motion.div>
                
                {/* Main infinity icon with layered effect */}
                <div className="relative">
                  {/* Glowing backdrop */}
                  <motion.div 
                    className="absolute inset-0 opacity-70"
                    animate={{ opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 2, repeat: Number.MAX_SAFE_INTEGER }}
                  >
                    <InfinityIcon className="h-16 w-16 text-primary-foreground/80 filter blur-[3px]" />
                  </motion.div>
                  
                  {/* Primary icon with shimmer effect */}
                  <motion.div
                    className="relative"
                    animate={{ 
                      background: [
                        'linear-gradient(90deg, transparent, rgba(94, 234, 212, 0.2), transparent)',
                        'linear-gradient(90deg, transparent, rgba(94, 234, 212, 0), transparent)'
                      ],
                      backgroundSize: ['200% 100%', '200% 100%'],
                      backgroundPosition: ['-100% 0', '200% 0']
                    }}
                    transition={{ 
                      duration: 2.5, 
                      repeat: Number.MAX_SAFE_INTEGER,
                      ease: "easeInOut"
                    }}
                  >
                    <InfinityIcon className="h-16 w-16 text-primary-foreground relative z-10" strokeWidth={1.5} />
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Name - more compact */}
        <motion.h1 
          className="text-xl font-bold mb-2 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Shreeraj Mummidivarapu
        </motion.h1>
        
        {/* Rotating taglines with better transition */}
        <div className="h-6 mb-6 overflow-hidden text-center">
          <motion.div
            key={taglineIndex}
            className="text-accent text-xs"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.7 }}
          >
            {taglines[taglineIndex]}
          </motion.div>
        </div>
        
        {/* Progress bar with percentage - enhanced styling */}
        <div className="w-full mb-4">
          <div className="flex justify-between items-center text-xs mb-1">
            <span className="text-muted-foreground">Loading portfolio</span>
            <span className="text-primary font-medium">{Math.round(progress)}%</span>
          </div>
          
          <div className="relative w-full">
            <Progress value={progress} className="h-1.5 overflow-hidden" />
            
            {/* Progress highlight effect */}
            <motion.div 
              className="absolute left-0 top-0 h-full bg-primary/30 blur-sm"
              style={{ width: `${progress}%` }}
              animate={{ opacity: [0.2, 0.7, 0.2] }}
              transition={{ duration: 1.5, repeat: Number.MAX_SAFE_INTEGER }}
            />
          </div>
        </div>
        
        {/* Status message - with animation */}
        <motion.div 
          className="flex items-center justify-center space-x-2 text-xs text-muted-foreground"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Number.MAX_SAFE_INTEGER }}
        >
          <span>
            {progress < 30 ? "Initializing systems..." : 
             progress < 60 ? "Loading portfolio data..." : 
             progress < 90 ? "Preparing user interface..." : 
             "Almost ready..."}
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
