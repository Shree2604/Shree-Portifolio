
import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { CalendarIcon, MapPinIcon, BriefcaseIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface WorkExperience {
  company: string;
  position: string;
  period: string;
  location: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

interface WorkTimelineProps {
  experiences: WorkExperience[];
}

export default function WorkTimeline({ experiences }: WorkTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="timeline-container py-4">
      {experiences.map((exp, index) => (
        <motion.div
          key={`${exp.company}-${index}`}
          className="timeline-item"
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: index * 0.2 }}
        >
          <div className="ml-4">
            <div className="card-3d bg-secondary/30 rounded-lg p-6 backdrop-blur-sm mb-4">
              <h3 className="text-xl font-semibold">{exp.position}</h3>
              <h4 className="text-lg text-primary mb-2">{exp.company}</h4>
              
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center">
                  <CalendarIcon className="h-4 w-4 mr-1" />
                  {exp.period}
                </div>
                <div className="flex items-center">
                  <MapPinIcon className="h-4 w-4 mr-1" />
                  {exp.location}
                </div>
              </div>
              
              <p className="mb-4">{exp.description}</p>
              
              {exp.achievements.length > 0 && (
                <div className="mb-4">
                  <h5 className="text-sm font-medium mb-2">Key Achievements</h5>
                  <ul className="list-disc pl-5 space-y-1">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className="text-sm">{achievement}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className="flex flex-wrap gap-2">
                {exp.technologies.map((tech, i) => (
                  <Badge key={i} variant="secondary" className="text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
