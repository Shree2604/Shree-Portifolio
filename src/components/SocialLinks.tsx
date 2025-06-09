
import { Github, Linkedin, Mail, FileText } from 'lucide-react';
import { AnimatedCard } from './AnimatedCard';
import { motion } from 'framer-motion';
import { RESUME_URL } from '@/config/constants';

interface SocialLinksProps {
  vertical?: boolean;
  openResumeModal?: () => void;
}

export default function SocialLinks({ vertical = false, openResumeModal }: SocialLinksProps) {
  const links = [
    { 
      icon: <Github className="h-5 w-5" />, 
      url: 'https://github.com/Shree2604',
      label: 'GitHub',
      isExternal: true
    },
    { 
      icon: <Linkedin className="h-5 w-5" />, 
      url: 'https://linkedin.com/in/m-shreeraj',
      label: 'LinkedIn',
      isExternal: true
    },
    { 
      icon: <Mail className="h-5 w-5" />, 
      url: 'mailto:shree.xai.dev@gmail.com',
      label: 'Email',
      isExternal: true
    },
    { 
      icon: <FileText className="h-5 w-5" />, 
      url: RESUME_URL,
      label: 'Resume',
      isExternal: true
    },
  ];

  return (
    <div className={`flex ${vertical ? 'flex-col space-y-3' : 'grid grid-cols-2 gap-4 sm:flex sm:flex-row sm:space-x-4 sm:gap-0'} justify-center items-center mx-auto`}>
      {links.map((link, index) => (
        <motion.div
          key={link.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.5,
            delay: index * 0.15,
            type: "spring",
            stiffness: 200
          }}
          whileHover={{ 
            y: -5,
            transition: { duration: 0.2 }
          }}
          whileTap={{ scale: 0.95 }}
        >
          {link.label === 'Resume' && openResumeModal ? (
            <a
              href={link.url}
              onClick={(e) => {
                e.preventDefault();
                openResumeModal();
              }}
              className="inline-block"
              aria-label={link.label}
            >
              <AnimatedCard className="p-3 bg-secondary/30 backdrop-blur-sm">
                <div className="flex items-center gap-2 relative">
                  {link.icon}
                  <span>{link.label}</span>
                  <motion.div 
                    className="absolute -right-1 -top-1 w-2 h-2 rounded-full bg-primary"
                    animate={{ 
                      opacity: [0, 1, 0],
                      scale: [0.8, 1.2, 0.8]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse",
                      delay: index * 0.3
                    }}
                  />
                </div>
              </AnimatedCard>
            </a>
          ) : (
            <a
              href={link.url}
              target={link.isExternal ? "_blank" : undefined}
              rel={link.isExternal ? "noopener noreferrer" : undefined}
              className="inline-block"
              aria-label={link.label}
            >
              <AnimatedCard className="p-3 bg-secondary/30 backdrop-blur-sm">
                <div className="flex items-center gap-2 relative">
                  {link.icon}
                  <span>{link.label}</span>
                  <motion.div 
                    className="absolute -right-1 -top-1 w-2 h-2 rounded-full bg-primary"
                    animate={{ 
                      opacity: [0, 1, 0],
                      scale: [0.8, 1.2, 0.8]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse",
                      delay: index * 0.3
                    }}
                  />
                </div>
              </AnimatedCard>
            </a>
          )}
        </motion.div>
      ))}
    </div>
  );
}
