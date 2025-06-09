
import { useState, useEffect } from 'react';
import Section from '@/components/Section';
import { AnimatedCard } from '@/components/AnimatedCard';
import SkillBadge from '@/components/SkillBadge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import Footer from '@/components/Footer';
import { RESUME_URL } from '@/config/constants';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";

const About = () => {
  const [activeTimelineItem, setActiveTimelineItem] = useState(0);
  const [autoPlayEnabled, setAutoPlayEnabled] = useState(true);

  // Array of profile images for the carousel
  const profileImages = [
    "/images/DSC_6794.JPG",
    "/images/DSC_0540.JPG",
    "/images/HI.JPG",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTimelineItem((prev) => (prev + 1) % timelineItems.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Auto-rotate carousel images
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (autoPlayEnabled) {
      interval = setInterval(() => {
        const carouselElement = document.querySelector('[data-carousel-next]');
        if (carouselElement) {
          (carouselElement as HTMLButtonElement).click();
        }
      }, 3000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoPlayEnabled]);

  const skillGroups = [
    {
      title: "Programming Languages",
      skills: ["Python", "C++", "Java", "SQL"]
    },
    {
      title: "Tools & Frameworks",
      skills: ["Git", "GitHub", "Matlab", "Linux", "AWS", "Flask", "Django", "Hugging Face", "Streamlit"]
    },
    {
      title: "Machine Learning & AI",
      skills: ["TensorFlow", "PyTorch", "Scikit-Learn", "NumPy", "Pandas", "LangChain", "LangGraph"]
    },
    {
      title: "Relevant Coursework",
      skills: ["Data Structures", "OOPS", "Operating Systems", "DBMS", "Computer Networks", "Cloud Computing"]
    }
  ];

  const timelineItems = [
    {
      year: "2022-2026",
      title: "Indian Institute Of Information Technology, Sricity",
      subtitle: "B.Tech in Computer Science and Engineering",
      details: "CGPA: 8.29/10",
      icon: "🎓"
    },
    {
      year: "Nov 2024-Apr 2025",
      title: "Agentic AI Intern",
      subtitle: "ValueDX, Maharashtra, India",
      details: "Working on LangGraph Framework and healthcare automation",
      icon: "💼"
    },
    {
      year: "Mar-Jul 2024",
      title: "Machine Learning Intern",
      subtitle: "Civicraft, Varanasi, India",
      details: "Built Local Language Translation models using TensorFlow & PyTorch",
      icon: "🤖"
    },
    {
      year: "Dec 2023-Feb 2024",
      title: "ML IoT Research Intern",
      subtitle: "IIIT Sri City, Andhra Pradesh, India",
      details: "Developed predictive model for infectious disease forecasting (87.4% accuracy)",
      icon: "🔬"
    }
  ];

  return (
    <>
      <Section title="About Me" id="about">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-1 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <AnimatedCard className="p-6 mb-6" glowOnHover>
                  <Carousel 
                    className="w-full" 
                    onMouseEnter={() => setAutoPlayEnabled(false)}
                    onMouseLeave={() => setAutoPlayEnabled(true)}
                  >
                    <CarouselContent className="h-full">
                      {profileImages.map((image, index) => (
                        <CarouselItem key={index} className="flex items-center justify-center">
                          <div className="aspect-[3/4] w-full max-h-[400px] rounded-lg relative overflow-hidden shadow-lg">
                            <img 
                              src={image} 
                              alt={`Shreeraj Mummidivarapu ${index + 1}`}
                              className="w-full h-full object-cover rounded-lg transition-transform duration-300 hover:scale-105"
                              loading="lazy"
                            />
                            <motion.div 
                              className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"
                              initial={{ opacity: 0 }}
                              whileInView={{ opacity: 0.6 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.5, delay: 0.3 }}
                            ></motion.div>
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <div className="absolute -bottom-6 left-0 right-0 flex justify-center gap-4 z-10">
                      <CarouselPrevious className="relative h-9 w-9 rounded-full bg-primary/80 hover:bg-primary text-white shadow-md" />
                      <CarouselNext className="relative h-9 w-9 rounded-full bg-primary/80 hover:bg-primary text-white shadow-md" data-carousel-next />
                    </div>
                  </Carousel>
                </AnimatedCard>
              </motion.div>
              
              <motion.div 
                className="mt-4 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h2 className="text-2xl font-bold mb-2">Shreeraj Mummidivarapu</h2>
                <p className="text-muted-foreground mb-4">
                  AI/ML Developer & Researcher
                </p>
                <div className="flex justify-center space-x-2">
                  <a 
                    href="tel:+918143272388" 
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    +91 8143272388
                  </a>
                  <span className="text-muted-foreground">|</span>
                  <a 
                    href="mailto:shreeraj.m22@iiits.in" 
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    shree.xai.dev@gmail.com
                  </a>
                </div>
                <div className="mt-4">
                  <a 
                    href={RESUME_URL} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block"
                  >
                    <Button size="sm" variant="outline" className="border-primary/50 hover:border-primary">
                      View Resume
                    </Button>
                  </a>
                </div>
              </motion.div>
            </div>
            
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <AnimatedCard className="p-8" glowOnHover>
                  <h3 className="text-2xl font-bold mb-4 text-gradient inline-block">My Journey</h3>
                  <p className="text-muted-foreground mb-6">
                    I'm a passionate AI/ML developer and researcher currently pursuing B.Tech in Computer Science and Engineering at IIIT Sricity. My journey in tech is focused on building intelligent systems that solve real-world problems.
                  </p>
                  <p className="text-muted-foreground mb-6">
                    Through my academic and professional experiences, I've developed expertise in machine learning, deep learning, and AI applications across various domains including healthcare and finance.
                  </p>
                  <p className="text-muted-foreground">
                    I'm particularly interested in working with cutting-edge technologies like LangGraph for autonomous AI systems and advancing healthcare automation through intelligent solutions.
                  </p>
                </AnimatedCard>
              </motion.div>
              
              <div className="mt-8">
                <motion.h3 
                  className="text-2xl font-bold mb-6 text-gradient inline-block"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  Skills & Expertise
                </motion.h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {skillGroups.map((group, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 * index }}
                    >
                      <AnimatedCard className="p-6" glowOnHover>
                        <h4 className="text-xl font-semibold mb-4">{group.title}</h4>
                        <div className="flex flex-wrap gap-2">
                          {group.skills.map((skill) => (
                            <SkillBadge key={skill} name={skill} />
                          ))}
                        </div>
                      </AnimatedCard>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-20">
            <motion.h3 
              className="text-2xl font-bold mb-10 text-center text-gradient inline-block"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Education & Experience Timeline
            </motion.h3>
            <div className="relative">
              {/* Timeline line */}
              <motion.div 
                className="absolute top-0 left-1/2 w-0.5 h-full bg-primary/30 transform -translate-x-1/2"
                initial={{ scaleY: 0, opacity: 0 }}
                whileInView={{ scaleY: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              ></motion.div>
              
              {/* Timeline items */}
              <div className="space-y-12">
                {timelineItems.map((item, index) => (
                  <div key={index} className="relative">
                    <motion.div 
                      className={cn(
                        "absolute left-1/2 w-10 h-10 rounded-full flex items-center justify-center -translate-x-1/2 z-10 transition-all duration-500",
                        activeTimelineItem === index 
                          ? "bg-primary text-white shadow-lg shadow-primary/30" 
                          : "bg-secondary text-primary"
                      )}
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                    >
                      {item.icon}
                    </motion.div>
                    <motion.div 
                      className={cn(
                        "ml-auto md:ml-0 md:mr-auto md:pr-12 md:text-right w-full md:w-1/2 pl-16 md:pl-0 relative transition-opacity duration-500",
                        index % 2 === 1 && "md:ml-auto md:mr-0 md:pr-0 md:pl-12 md:text-left",
                        activeTimelineItem === index ? "opacity-100" : "opacity-60"
                      )}
                      initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 * index }}
                    >
                      <AnimatedCard 
                        className="p-6" 
                        glowOnHover={activeTimelineItem === index}
                      >
                        <div className="text-sm font-semibold text-primary mb-2">{item.year}</div>
                        <h4 className="text-xl font-bold mb-1">{item.title}</h4>
                        <p className="text-muted-foreground">{item.subtitle}</p>
                        <p className="mt-2 text-sm">{item.details}</p>
                      </AnimatedCard>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>
      <Footer />
    </>
  );
};

export default About;
