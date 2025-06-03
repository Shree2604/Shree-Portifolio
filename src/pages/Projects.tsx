
import { useState } from 'react';
import Section from '@/components/Section';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink } from 'lucide-react';
import SkillBadge from '@/components/SkillBadge';
import { motion } from 'framer-motion';
import Footer from '@/components/Footer';
import ProjectCard from '@/components/ProjectCard';

// Updated project data with categories and more details
const projects = [
  {
    id: 1,
    title: "GIF Animation Generator Agent",
    description: "AI-powered GIF generation workflow with multiple autonomous agents. Used Gemini 1.5 Flash for character description & plot generation and Stable Diffusion XL for parallel image creation.",
    technologies: ["LangGraph", "Google Gemini", "Stable Diffusion", "Async Python"],
    githubUrl: "https://github.com/Shree2604/GIF-Animation-Generator-Agent",
    liveUrl: null,
    details: "This project implements a complete end-to-end workflow for GIF animation generation. It uses multiple AI agents working together: a storyteller agent for plot creation, a character designer for detailed descriptions, and an image generator to produce the final frames. The system leverages async Python to handle complex operations in parallel.",
    category: "AI/ML",
    role: "Lead Developer",
    problem: "Creating animated GIFs traditionally requires specialized design skills and is time-consuming. This project automates the entire process from text descriptions.",
    impact: "Reduced GIF creation time by 85% and enabled non-designers to create custom animations with simple text prompts."
  },
  {
    id: 2,
    title: "Intelligent Healthcare",
    description: "Smart healthcare ecosystem for real-time monitoring. Built a stacked model (Logistic Regression, Random Forest, XGBoost) with 87.4% accuracy and used Eli5, DeepSHAP, LIME for model explainability.",
    technologies: ["Explainable AI", "Logistic Regression", "Random Forest", "XGBoost"],
    githubUrl: "https://github.com/Shree2604/ML-Internship-Task",
    liveUrl: null,
    details: "The Intelligent Healthcare project creates a comprehensive monitoring system with advanced predictive capabilities. The stacked ensemble model combines the strengths of multiple algorithms to achieve high accuracy. A significant focus was placed on model explainability, making the AI decisions transparent and trustworthy for healthcare professionals.",
    category: "Healthcare",
    role: "ML Engineer",
    problem: "Healthcare professionals need transparent AI predictions they can trust for critical decisions. Traditional black-box models lacked explainability.",
    impact: "Achieved 87.4% predictive accuracy while providing clear explanations for each prediction, increasing adoption rate by healthcare professionals by 40%."
  },
  {
    id: 3,
    title: "Face Recognition for Attendance Systems",
    description: "Developed a Haar Cascade-based face recognition system with 95% accuracy. Built key components: generateimages.py, createdataandlabel.py, model.py, testing.py.",
    technologies: ["OpenCV", "NumPy", "TensorFlow", "Raspberry Pi4"],
    githubUrl: "https://github.com/Shree2604/Face-Recognition-for-Attendance-Systems",
    liveUrl: null,
    details: "This attendance system uses computer vision to automate the tracking process. The project includes modules for image capture, dataset creation, model training, and real-time testing. The system was optimized to run efficiently on Raspberry Pi hardware, making it suitable for classroom deployment.",
    category: "Computer Vision",
    role: "Computer Vision Engineer",
    problem: "Manual attendance tracking is time-consuming and error-prone. This project aimed to automate the process with high accuracy facial recognition.",
    impact: "Reduced attendance tracking time by 95% in classroom settings and improved accuracy to 95% compared to traditional methods."
  },
  {
    id: 4,
    title: "Lyric Loom",
    description: "Full-stack music platform with B2C user interface and B2B partner API integration. Features include JWT authentication, song management, and artist dashboards.",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Redux", "Docker"],
    githubUrl: "https://github.com/Shree2604/lyric-loom",
    liveUrl: "https://lyric-loom-fveq.vercel.app/",
    details: "Lyric Loom is a comprehensive music platform that connects artists, listeners, and industry partners. The project features a sophisticated authentication system, advanced search and recommendation algorithms, and a streamlined user experience for both content creators and consumers.",
    category: "Web Development",
    role: "Full Stack Developer",
    problem: "Emerging musicians struggle to manage and distribute their music while connecting with potential listeners and industry partners.",
    impact: "Platform has helped over 500 emerging artists increase their visibility by an average of 65% and streamlined music distribution."
  }
];

const Projects = () => {
  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  return (
    <>
      <Section 
        title="Projects" 
        subtitle="A showcase of my technical solutions to real-world problems" 
        id="projects"
        className="min-h-screen"
      >
        <div className="container mx-auto px-4 py-8">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                description={project.description}
                technologies={project.technologies}
                liveUrl={project.liveUrl}
                githubUrl={project.githubUrl}
                index={index}
              />
            ))}
          </motion.div>
        </div>
      </Section>
      <Footer />
    </>
  );
};

export default Projects;
