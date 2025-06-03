
import { useState } from 'react';
import Section from '@/components/Section';
import { AnimatedCard } from '@/components/AnimatedCard';
import { Button } from '@/components/ui/button';
import { ArrowRight, Clock, Calendar, Tag, BookOpen, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import Footer from '@/components/Footer';

// Blog post data type
interface Post {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  type: "publication" | "blog";
  image?: string;
  url: string;
}

// Sample publications and blog posts data
const posts: Post[] = [
  // Publications
  {
    id: 1,
    title: "Unveiling the Black Box: A Comprehensive Journey into Explainable AI",
    excerpt: "A detailed exploration of explainable AI methods and their applications.",
    content: "Full article available on Medium",
    date: "May 15, 2023",
    readTime: "10 min",
    category: "Explainable AI",
    tags: ["XAI", "AI Ethics", "Transparency"],
    type: "publication",
    url: "https://medium.com/epochiiits/unveiling-the-black-box-a-comprehensive-journey-into-explainable-ai-fd0bd017b70c"
  },
  {
    id: 2,
    title: "Creating Artistic Outlines: Combining Python, OpenCV, and Turtle Graphics",
    excerpt: "Innovative approach to artistic image processing with Python libraries.",
    content: "Full article available on Medium",
    date: "January 22, 2024",
    readTime: "8 min",
    category: "Computer Vision",
    tags: ["Python", "OpenCV", "Graphics"],
    type: "publication",
    url: "https://medium.com/epochiiits/creating-artistic-outlines-combining-python-opencv-and-turtle-graphics-178a1faab856"
  },
  {
    id: 3,
    title: "Explainable AI for Communicable Disease Prediction",
    excerpt: "A breakthrough approach using explainable AI for healthcare predictions.",
    content: "Full article available on Medium",
    date: "December 8, 2023",
    readTime: "12 min",
    category: "Healthcare",
    tags: ["XAI", "Healthcare", "Disease Prediction"],
    type: "publication",
    url: "https://medium.com/@shreeraj260405/explainable-ai-for-communicable-disease-prediction-a-breakthrough-in-healthcare-technology-662d66efcdb3"
  },
  
  // Blogs
  {
    id: 4,
    title: "Why Explainable AI Matters?: Bringing Transparency to Machine Learning",
    excerpt: "Understanding the importance of transparency in AI systems and decision-making.",
    content: "Full article available on Medium",
    date: "June 20, 2023",
    readTime: "7 min",
    category: "Explainable AI",
    tags: ["XAI", "Transparency", "Ethics"],
    type: "blog",
    url: "https://medium.com/@shreeraj260405/why-explainable-ai-matters-bringing-transparency-to-machine-learning-cbe1d9113746"
  },
  {
    id: 5,
    title: "Unveiling the Spectrum of Explainable AI: A Deep Dive into XAI Techniques",
    excerpt: "Exploring the range of techniques available for explaining AI models.",
    content: "Full article available on Medium",
    date: "July 5, 2023",
    readTime: "9 min",
    category: "Explainable AI",
    tags: ["XAI", "Techniques", "AI Models"],
    type: "blog",
    url: "https://medium.com/@shreeraj260405/unveiling-the-spectrum-of-explainable-ai-a-deep-dive-into-xai-techniques-1ccfa856ac96"
  },
  {
    id: 6,
    title: "LIME Unveiled: A Deep Dive into Explaining AI Models",
    excerpt: "Detailed analysis of LIME for explaining text, image, and tabular data models.",
    content: "Full article available on Medium",
    date: "August 12, 2023",
    readTime: "10 min",
    category: "Explainable AI",
    tags: ["LIME", "XAI", "Model Interpretation"],
    type: "blog",
    url: "https://medium.com/@shreeraj260405/lime-unveiled-a-deep-dive-into-explaining-ai-models-for-text-images-and-tabular-data-046c7c3b4e9f"
  },
  {
    id: 7,
    title: "Hands-On LIME: Practical Implementation for Image, Text, and Tabular Data",
    excerpt: "Step-by-step practical guide to implementing LIME across different data types.",
    content: "Full article available on Medium",
    date: "September 18, 2023",
    readTime: "11 min",
    category: "Explainable AI",
    tags: ["LIME", "Implementation", "Tutorial"],
    type: "blog",
    url: "https://medium.com/@shreeraj260405/hands-on-lime-practical-implementation-for-image-text-and-tabular-data-95566da87f57"
  },
  {
    id: 8,
    title: "SHAP Unveiled: A Deep Dive into Explaining AI Models for Machine Learning",
    excerpt: "Comprehensive analysis of SHAP methods for model interpretation.",
    content: "Full article available on Medium",
    date: "October 30, 2023",
    readTime: "10 min",
    category: "Explainable AI",
    tags: ["SHAP", "XAI", "Model Interpretation"],
    type: "blog",
    url: "https://medium.com/@shreeraj260405/shap-unveiled-a-deep-dive-into-explaining-ai-models-for-machine-learning-b48ae012e982"
  },
  {
    id: 9,
    title: "Hands-On SHAP: Practical Implementation for Image, Text, and Tabular Data",
    excerpt: "Practical tutorial on implementing SHAP for different data modalities.",
    content: "Full article available on Medium",
    date: "November 15, 2023",
    readTime: "12 min",
    category: "Explainable AI",
    tags: ["SHAP", "Implementation", "Tutorial"],
    type: "blog",
    url: "https://medium.com/@shreeraj260405/hands-on-shap-practical-implementation-for-image-text-and-tabular-data-f74b488f8d71"
  }
];

const Blog = () => {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  
  const filteredPosts = selectedType 
    ? posts.filter(post => post.type === selectedType)
    : posts;
  
  // Sort posts so publications appear first
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (a.type === "publication" && b.type === "blog") return -1;
    if (a.type === "blog" && b.type === "publication") return 1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <>
      <Section title="Publications & Blogs" subtitle="Research publications and insights on AI, machine learning, and technology" className="bg-gradient-to-b from-background to-secondary/5">
        <div className="container mx-auto px-4">
          {/* Type Selection */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex rounded-md shadow-sm">
              <Button
                variant={selectedType === null ? "default" : "outline"}
                className="rounded-l-md rounded-r-none"
                onClick={() => setSelectedType(null)}
              >
                All
              </Button>
              <Button
                variant={selectedType === "publication" ? "default" : "outline"}
                className="rounded-none border-x-0"
                onClick={() => setSelectedType("publication")}
              >
                <BookOpen className="mr-2 h-4 w-4" />
                Publications
              </Button>
              <Button
                variant={selectedType === "blog" ? "default" : "outline"}
                className="rounded-r-md rounded-l-none"
                onClick={() => setSelectedType("blog")}
              >
                <FileText className="mr-2 h-4 w-4" />
                Blogs
              </Button>
            </div>
          </div>
          
          {/* Display section heading if there are publications and viewing all or publications */}
          {(selectedType === "publication" || selectedType === null) && 
           posts.some(post => post.type === "publication") && (
            <div className="mb-6 mt-10">
              <h2 className="text-2xl font-bold text-gradient inline-block">Publications</h2>
              <div className="h-px bg-gradient-to-r from-primary/50 via-primary/20 to-transparent mt-2 mb-6"></div>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
            {sortedPosts
              .filter(post => selectedType === null || selectedType === "publication" ? post.type === "publication" : false)
              .map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <AnimatedCard className="h-full">
                    <div className="p-6 flex flex-col h-full">
                      <div className="mb-4 flex items-center justify-between">
                        <span className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 px-2 py-1 rounded text-xs">
                          {post.category}
                        </span>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{post.readTime} read</span>
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold mb-3">{post.title}</h3>
                      
                      <p className="text-muted-foreground mb-6 flex-grow">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map(tag => (
                          <span 
                            key={tag} 
                            className="bg-secondary/50 px-2 py-1 rounded text-xs"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex justify-between items-center mt-auto pt-4 border-t border-border/30">
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>{post.date}</span>
                        </div>
                        
                        <a
                          href={post.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                            Read on Medium <ArrowRight className="ml-2 h-3 w-3" />
                          </Button>
                        </a>
                      </div>
                    </div>
                  </AnimatedCard>
                </motion.div>
              ))}
          </div>
          
          {/* Display section heading if there are blogs and viewing all or blogs */}
          {(selectedType === "blog" || selectedType === null) && 
           posts.some(post => post.type === "blog") && (
            <div className="mb-6 mt-10">
              <h2 className="text-2xl font-bold text-gradient inline-block">Blog Posts</h2>
              <div className="h-px bg-gradient-to-r from-primary/50 via-primary/20 to-transparent mt-2 mb-6"></div>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedPosts
              .filter(post => selectedType === null || selectedType === "blog" ? post.type === "blog" : false)
              .map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <AnimatedCard className="h-full">
                    <div className="p-6 flex flex-col h-full">
                      <div className="mb-4 flex items-center justify-between">
                        <span className="bg-primary/20 text-primary px-2 py-1 rounded text-xs">
                          {post.category}
                        </span>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{post.readTime} read</span>
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold mb-3">{post.title}</h3>
                      
                      <p className="text-muted-foreground mb-6 flex-grow">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map(tag => (
                          <span 
                            key={tag} 
                            className="bg-secondary/50 px-2 py-1 rounded text-xs"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex justify-between items-center mt-auto pt-4 border-t border-border/30">
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>{post.date}</span>
                        </div>
                        
                        <a
                          href={post.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                            Read on Medium <ArrowRight className="ml-2 h-3 w-3" />
                          </Button>
                        </a>
                      </div>
                    </div>
                  </AnimatedCard>
                </motion.div>
              ))}
          </div>
        </div>
      </Section>
      <Footer />
    </>
  );
};

export default Blog;
