
import { useState } from 'react';
import Section from '@/components/Section';
import { AnimatedCard } from '@/components/AnimatedCard';
import { ChevronDown, ChevronUp, Briefcase } from 'lucide-react';
import { cn } from '@/lib/utils';

const experiences = [
  {
    title: "Agentic AI Intern",
    company: "ValueDX",
    location: "Maharashtra, India",
    period: "Nov 2024 - Apr 2025",
    description: [
      "Working extensively on LangGraph Framework, designing and optimizing autonomous AI systems.",
      "Contributing to healthcare automation, including patient booking systems and medical workflow optimization.",
      "Developing AI-driven financial invoice processing for document handling and data extraction."
    ],
    icon: "🤖",
    color: "from-purple-500/20 to-blue-500/20"
  },
  {
    title: "Machine Learning Intern",
    company: "Civicraft",
    location: "Varanasi, India",
    period: "March 2024 - July 2024",
    description: [
      "Built Local Language Translation (LLT) models using TensorFlow & PyTorch.",
      "Integrated multi-lingual speech technology for seamless user interaction.",
      "Focused on making AI adaptive & user-friendly via voice interaction and multi-format support."
    ],
    icon: "🌐",
    color: "from-blue-500/20 to-cyan-500/20"
  },
  {
    title: "ML IoT Research Intern",
    company: "IIIT Sri City",
    location: "Andhra Pradesh, India",
    period: "Dec 2023 - Feb 2024",
    description: [
      "Developed a predictive model for infectious disease forecasting (87.4% accuracy).",
      "Built an IoT-based health monitoring prototype for real-time data processing.",
      "Improved model transparency using Eli5, SHAP, and LIME."
    ],
    icon: "🔬",
    color: "from-cyan-500/20 to-green-500/20"
  }
];

const positions = [
  {
    title: "Club Lead",
    organization: "Epoch (AI/ML Club, IIIT Sri City)",
    description: "Managing AI/ML events, industry collaborations.",
    icon: "🧠"
  },
  {
    title: "NSS Design Lead",
    organization: "IIIT Sri City",
    description: "Designed posters & content for college events.",
    icon: "🎨"
  },
  {
    title: "Sponsorship Lead",
    organization: "IIIT Sri City",
    description: "Led sponsorship outreach for annual fest Abhisarga.",
    icon: "💼"
  }
];

const Experience = () => {
  const [expandedExperience, setExpandedExperience] = useState<number | null>(0);

  const toggleExpand = (index: number) => {
    setExpandedExperience(expandedExperience === index ? null : index);
  };

  return (
    <Section title="Experience" subtitle="My professional journey in AI/ML research and development" id="experience">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          {/* Work Experience */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-8 flex items-center">
              <Briefcase className="mr-2 h-5 w-5" />
              Work Experience
            </h3>
            
            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <AnimatedCard 
                  key={index}
                  className="p-6 glass"
                  glowOnHover
                >
                  <div 
                    className="cursor-pointer flex justify-between items-start"
                    onClick={() => toggleExpand(index)}
                  >
                    <div className="flex items-start">
                      <div className={`w-12 h-12 rounded-full mr-4 flex items-center justify-center bg-gradient-to-r ${exp.color}`}>
                        <span className="text-xl">{exp.icon}</span>
                      </div>
                      <div>
                        <h4 className="text-xl font-bold">{exp.title}</h4>
                        <p className="text-muted-foreground">
                          {exp.company} • {exp.location}
                        </p>
                        <p className="text-sm text-muted-foreground/70">
                          {exp.period}
                        </p>
                      </div>
                    </div>
                    <div>
                      {expandedExperience === index ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </div>
                  </div>
                  
                  <div 
                    className={cn(
                      "mt-4 pl-16 transition-all duration-300 overflow-hidden",
                      expandedExperience === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    )}
                  >
                    <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                      {exp.description.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </AnimatedCard>
              ))}
            </div>
          </div>
          
          {/* Leadership Positions */}
          <div>
            <h3 className="text-2xl font-bold mb-8">Positions of Responsibility</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {positions.map((position, index) => (
                <AnimatedCard 
                  key={index}
                  className="p-6 h-full flex flex-col"
                  glowOnHover
                >
                  <div className="mb-4 text-3xl">{position.icon}</div>
                  <h4 className="text-xl font-bold mb-2">{position.title}</h4>
                  <p className="text-muted-foreground mb-2">{position.organization}</p>
                  <p className="text-sm text-muted-foreground/70 mt-auto">{position.description}</p>
                </AnimatedCard>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Experience;
