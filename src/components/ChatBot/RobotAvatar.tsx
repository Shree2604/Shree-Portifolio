
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';

interface RobotAvatarProps {
  isOpen: boolean;
  isProcessing: boolean;
  onClick: () => void;
}

const RobotAvatar: React.FC<RobotAvatarProps> = ({ isOpen, isProcessing, onClick }) => {
  const [blink, setBlink] = useState(false);

  // Random eye blinking effect
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 200);
    }, Math.random() * 3000 + 2000);
    
    return () => clearInterval(blinkInterval);
  }, []);

  return (
    <motion.div 
      className={`fixed bottom-6 right-6 z-50 cursor-pointer select-none ${isOpen ? 'bg-transparent' : 'bg-primary shadow-lg shadow-primary/20'}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      style={{ borderRadius: isOpen ? '0' : '100%' }}
    >
      {isOpen ? (
        <div className="p-2.5 bg-primary rounded-full">
          <X className="w-5 h-5 text-primary-foreground" />
        </div>
      ) : (
        <div className="p-3 relative overflow-hidden">
          {/* Compact Robot Face */}
          <div className="relative w-10 h-10 flex items-center justify-center">
            {/* Robot Head - More modern, compact design */}
            <div className="w-full h-full rounded-full bg-gradient-to-br from-primary-foreground to-primary-foreground/80 flex flex-col items-center justify-center relative">
              {/* Robot face container */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                {/* Eyes Row */}
                <div className="flex space-x-2 mb-1">
                  {/* Left Eye - Smaller, more modern */}
                  <motion.div 
                    className="w-1.5 h-1.5 rounded-full bg-primary"
                    animate={{
                      scaleY: blink ? 0.1 : 1
                    }}
                    transition={{ duration: 0.1 }}
                  />
                  {/* Right Eye - Smaller, more modern */}
                  <motion.div 
                    className="w-1.5 h-1.5 rounded-full bg-primary"
                    animate={{
                      scaleY: blink ? 0.1 : 1
                    }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
                
                {/* Mouth - Simplified */}
                <motion.div 
                  className="w-4 h-1 rounded-full bg-primary"
                  animate={isProcessing ? {
                    scaleX: [1, 0.7, 1],
                  } : {}}
                  transition={{ duration: 0.5, repeat: Infinity }}
                />
              </div>
              
              {/* Decorative elements - Small circuit patterns */}
              <div className="absolute top-1 right-1 w-1 h-1 rounded-full border border-primary/30" />
              <div className="absolute bottom-1 left-1 w-1 h-1 rounded-full border border-primary/30" />
              
              {/* Notification dot - Always visible when closed */}
              {!isOpen && (
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
                />
              )}
            </div>
          </div>
          
          {/* Processing indicators around the robot when closed and processing */}
          {!isOpen && isProcessing && (
            <motion.div 
              className="absolute inset-0 rounded-full border-2 border-primary"
              animate={{ scale: [1, 1.3], opacity: [1, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          )}
        </div>
      )}
      
      {/* Message bubble when closed */}
      {!isOpen && (
        <motion.div 
          className="absolute -top-12 -left-24 bg-background/95 backdrop-blur-sm p-2.5 rounded-lg shadow-lg w-28 border border-primary/20"
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 1 }}
        >
          <p className="text-xs font-medium">Questions? Ask me!</p>
          <div className="absolute bottom-[-6px] right-5 w-3 h-3 bg-background/95 border-r border-b border-primary/20 transform rotate-45" />
        </motion.div>
      )}
    </motion.div>
  );
};

export default RobotAvatar;
