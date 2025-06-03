
import { motion } from 'framer-motion';
import { QuoteIcon, Sparkles } from 'lucide-react';

interface TestimonialCardProps {
  quote: string;
  author: string;
  title: string;
  image?: string;
  index: number;
}

export default function TestimonialCard({
  quote,
  author,
  title,
  image,
  index
}: TestimonialCardProps) {
  return (
    <motion.div
      className="bg-secondary/30 rounded-lg p-6 backdrop-blur-sm relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
    >
      {/* Subtle tech pattern background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--primary)_0%,_transparent_60%)]"></div>
      </div>
      
      {/* Quote icon with subtle animation */}
      <motion.div
        initial={{ rotate: -10, opacity: 0.3 }}
        whileHover={{ rotate: 0, opacity: 0.6 }}
        transition={{ duration: 0.3 }}
        className="absolute top-4 right-4"
      >
        <QuoteIcon className="h-8 w-8 text-primary" />
      </motion.div>
      
      {/* Sparkle effect in top left */}
      <motion.div 
        className="absolute top-3 left-3 text-primary/40"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ 
          opacity: [0.4, 0.8, 0.4], 
          scale: [0.8, 1.2, 0.8],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <Sparkles size={16} />
      </motion.div>
      
      <p className="text-lg mb-6 relative z-10">{quote}</p>
      
      <div className="flex items-center">
        {image && (
          <div className="mr-4 h-12 w-12 rounded-full overflow-hidden border-2 border-primary/20">
            <img src={image} alt={author} className="h-full w-full object-cover" />
          </div>
        )}
        <div>
          <h4 className="font-semibold">{author}</h4>
          <p className="text-sm text-muted-foreground">{title}</p>
        </div>
      </div>
    </motion.div>
  );
}
