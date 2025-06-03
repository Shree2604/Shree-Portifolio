
import { useState } from 'react';
import { Github, ExternalLink, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl?: string | null;
  githubUrl?: string | null;
  index: number;
}

export default function ProjectCard({ 
  title,
  description,
  image,
  technologies,
  liveUrl,
  githubUrl,
  index
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="project-card bg-card rounded-lg border border-border overflow-hidden shadow-sm h-full flex flex-col transition-all duration-300 hover:shadow-md"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
    >
      <div 
        className="relative h-52 overflow-hidden"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className={`absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent flex flex-col justify-end p-4 transition-opacity duration-300 ${isHovered ? 'opacity-90' : 'opacity-70'}`}>
          <div className="flex gap-2 mb-2">
            {githubUrl && (
              <Button size="icon" variant="secondary" className="rounded-full bg-background/80 backdrop-blur-sm" asChild>
                <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" />
                </a>
              </Button>
            )}
            
            {liveUrl && (
              <Button size="icon" variant="secondary" className="rounded-full bg-background/80 backdrop-blur-sm" asChild>
                <a href={liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
      
      <div className="p-5 flex-grow flex flex-col">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-4 text-sm line-clamp-3 flex-grow">{description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4 mt-auto">
          {technologies.map((tech, i) => (
            <Badge key={i} variant="outline" className="text-xs bg-primary/10 border-primary/20">
              {tech}
            </Badge>
          ))}
        </div>
        
        <div className="flex gap-3 mt-2">
          {githubUrl && (
            <Button variant="outline" size="sm" className="gap-2 flex-1" asChild>
              <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" /> Code
              </a>
            </Button>
          )}
          
          {liveUrl && (
            <Button size="sm" className="gap-2 flex-1" asChild>
              <a href={liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" /> Demo
              </a>
            </Button>
          )}
          
          {/* Project Details Dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" variant="secondary" className="flex-1 gap-1">
                <Info className="h-4 w-4" /> Details
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold">{title}</DialogTitle>
                <DialogDescription className="text-foreground/90">{description}</DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-1 text-sm">Role</h4>
                    <p className="text-sm text-muted-foreground">Lead Developer</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-1 text-sm">Category</h4>
                    <p className="text-sm text-muted-foreground">AI/ML</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-1 text-sm">Problem & Approach</h4>
                  <p className="text-sm text-muted-foreground">Creating animated GIFs traditionally requires specialized design skills and is time-consuming. This project automates the entire process from text descriptions.</p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-1 text-sm">Impact</h4>
                  <p className="text-sm text-muted-foreground">Reduced GIF creation time by 85% and enabled non-designers to create custom animations with simple text prompts.</p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-1 text-sm">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {technologies.map((tech, i) => (
                      <Badge key={i} className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  {githubUrl && (
                    <Button variant="outline" size="sm" className="gap-2" asChild>
                      <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" /> View Code
                      </a>
                    </Button>
                  )}
                  {liveUrl && (
                    <Button size="sm" className="gap-2" asChild>
                      <a href={liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </motion.div>
  );
}
