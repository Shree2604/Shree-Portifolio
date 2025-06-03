
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

interface Skill {
  name: string;
  level: number;
  category: 'languages' | 'frameworks' | 'tools' | 'soft';
}

interface SkillDisplayProps {
  skills: Skill[];
}

export default function SkillDisplay({ skills }: SkillDisplayProps) {
  const [filter, setFilter] = useState<string | null>(null);
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

  const filteredSkills = filter ? skills.filter(skill => skill.category === filter) : skills;
  
  const categories = [
    { id: 'languages', name: 'Programming Languages' },
    { id: 'frameworks', name: 'Frameworks & Libraries' },
    { id: 'tools', name: 'Tools & Platforms' },
    { id: 'soft', name: 'Soft Skills' }
  ];

  return (
    <div ref={containerRef} className="py-8">
      <div className="flex flex-wrap gap-3 mb-6 justify-center">
        <Badge 
          className={`px-4 py-2 cursor-pointer ${!filter ? 'bg-primary' : 'bg-secondary hover:bg-secondary/80'}`}
          onClick={() => setFilter(null)}
        >
          All
        </Badge>
        {categories.map((category) => (
          <Badge
            key={category.id}
            className={`px-4 py-2 cursor-pointer ${filter === category.id ? 'bg-primary' : 'bg-secondary hover:bg-secondary/80'}`}
            onClick={() => setFilter(category.id as any)}
          >
            {category.name}
          </Badge>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSkills.map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-secondary/30 rounded-lg p-4 backdrop-blur-sm hover:shadow-md hover:shadow-primary/20 transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium text-lg">{skill.name}</h4>
              <span className="text-sm text-muted-foreground">{skill.level}/10</span>
            </div>
            <div className="skill-bar">
              <motion.div 
                className="skill-progress"
                initial={{ width: 0 }}
                animate={isInView ? { width: `${skill.level * 10}%` } : {}}
                transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
