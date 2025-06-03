
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { motion } from 'framer-motion';

interface SkillBadgeProps {
  name: string;
  className?: string;
  level?: number; // Skill level from 1-10
}

export default function SkillBadge({ name, className, level }: SkillBadgeProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Determine the color based on skill category
  const getSkillInfo = () => {
    const lowerName = name.toLowerCase();
    
    if (['python', 'c++', 'java', 'sql'].includes(lowerName)) {
      return {
        color: 'from-blue-500/30 to-cyan-500/30 border-blue-500/30'
      };
    }
    if (['tensorflow', 'pytorch', 'langchain', 'langgraph', 'machine learning', 'deep learning', 'ml models', 'xgboost'].includes(lowerName)) {
      return {
        color: 'from-purple-500/30 to-pink-500/30 border-purple-500/30'
      };
    }
    if (['git', 'github', 'aws', 'flask', 'django', 'hugging face', 'streamlit'].includes(lowerName)) {
      return {
        color: 'from-orange-500/30 to-amber-500/30 border-orange-500/30'
      };
    }
    if (['google gemini', 'llms', 'natural language processing', 'computer vision'].includes(lowerName)) {
      return {
        color: 'from-blue-600/30 to-violet-500/30 border-blue-600/30'
      };
    }
    if (['data structures', 'oops', 'operating systems', 'dbms', 'computer networks'].includes(lowerName)) {
      return {
        color: 'from-gray-500/30 to-slate-500/30 border-gray-500/30'
      };
    }
    
    return {
      color: 'from-emerald-500/30 to-teal-500/30 border-emerald-500/30'
    };
  };

  const { color } = getSkillInfo();

  const renderSkillLevel = () => {
    if (!level) return null;
    
    return (
      <div className="mt-1 w-full bg-gray-700/50 rounded-full h-1">
        <motion.div 
          className="bg-gradient-to-r from-primary to-neon-blue h-1 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${(level / 10) * 100}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
    );
  };
  
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Badge
        className={cn(
          'relative overflow-hidden bg-gradient-to-r border py-1.5 px-4 text-sm',
          color,
          isHovered && 'shadow-glow neon-border',
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex flex-col items-center">
          <span className="flex items-center gap-1">
            {name}
          </span>
          {renderSkillLevel()}
        </div>
        <div className={cn(
          'absolute inset-0 bg-cyber-gradient opacity-0 blur-sm -z-10 transition-opacity duration-300',
          isHovered && 'opacity-30'
        )} />
        
        {/* Data flow animation when hovered */}
        {isHovered && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute w-20 h-1 bg-white/20 -left-10 top-1/2 transform -translate-y-1/2 rotate-45 animate-shimmer"></div>
            <div className="absolute w-20 h-1 bg-white/10 -right-10 bottom-1/3 transform -translate-y-1/2 -rotate-45 animate-shimmer" style={{animationDelay: "0.2s"}}></div>
          </div>
        )}
      </Badge>
    </motion.div>
  );
}
