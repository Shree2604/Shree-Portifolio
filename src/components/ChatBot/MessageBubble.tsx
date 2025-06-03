
import React from 'react';
import { motion } from 'framer-motion';
import { Bot, User } from 'lucide-react';

interface MessageBubbleProps {
  content: string;
  isUser: boolean;
  isTyping?: boolean;
  links?: { text: string; url: string }[];
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ content, isUser, isTyping = false, links = [] }) => {
  return (
    <motion.div 
      className={`flex mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Avatar for bot */}
      {!isUser && (
        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary mr-2 flex items-center justify-center">
          <Bot className="h-5 w-5 text-primary-foreground" />
        </div>
      )}
      
      {/* Message content */}
      <div
        className={`max-w-[80%] p-3 rounded-lg ${
          isUser 
            ? 'bg-primary text-primary-foreground rounded-tr-none' 
            : 'bg-muted text-foreground rounded-tl-none'
        }`}
      >
        {isTyping ? (
          <div className="flex space-x-2 items-center h-6">
            <motion.span 
              className="block w-2 h-2 rounded-full bg-current"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
            />
            <motion.span 
              className="block w-2 h-2 rounded-full bg-current" 
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
            />
            <motion.span 
              className="block w-2 h-2 rounded-full bg-current" 
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
            />
          </div>
        ) : (
          <div>
            <p className="whitespace-pre-wrap text-sm">{content}</p>
            
            {/* Links if provided */}
            {links.length > 0 && (
              <div className="mt-2 flex flex-col gap-1">
                {links.map((link, index) => (
                  <a 
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs underline flex items-center hover:opacity-80 transition-opacity"
                  >
                    {link.text} <span className="inline-block ml-1">↗</span>
                  </a>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Avatar for user */}
      {isUser && (
        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-secondary ml-2 flex items-center justify-center">
          <User className="h-5 w-5 text-secondary-foreground" />
        </div>
      )}
    </motion.div>
  );
};

export default MessageBubble;
