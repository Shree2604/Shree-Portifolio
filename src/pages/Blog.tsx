
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
}

// Sample publications and blog posts data
const posts: Post[] = [
  // Publications
  {
    id: 1,
    title: "Advancements in Autonomous AI Agent Architecture",
    excerpt: "Research findings on optimizing agent-based systems for complex tasks and decision-making processes.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi.",
    date: "April 10, 2025",
    readTime: "8 min",
    category: "Research",
    tags: ["AI Agents", "Research", "Architecture"],
    type: "publication"
  },
  {
    id: 2,
    title: "Novel Approach to Explainable AI in Healthcare",
    excerpt: "A framework for making complex healthcare AI models interpretable for medical professionals.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi.",
    date: "March 20, 2025",
    readTime: "10 min",
    category: "Research",
    tags: ["XAI", "Healthcare", "Research"],
    type: "publication"
  },
  
  // Blogs
  {
    id: 3,
    title: "Building Autonomous Agents with LangGraph",
    excerpt: "Explore the architecture and implementation details of creating autonomous AI agents using LangGraph and LangChain.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi.",
    date: "April 2, 2025",
    readTime: "5 min",
    category: "Machine Learning",
    tags: ["LangGraph", "AI Agents", "LangChain"],
    type: "blog"
  },
  {
    id: 4,
    title: "Optimizing Transformer Models for Low-Resource Languages",
    excerpt: "Techniques and strategies for building effective NLP models for languages with limited data resources.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi.",
    date: "March 15, 2025",
    readTime: "7 min",
    category: "NLP",
    tags: ["NLP", "Transformers", "Low-resource Languages"],
    type: "blog"
  },
  {
    id: 5,
    title: "AI-Driven Early Disease Detection Systems",
    excerpt: "How machine learning models are revolutionizing healthcare by enabling early detection of various diseases.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi.",
    date: "February 28, 2025",
    readTime: "6 min",
    category: "Healthcare AI",
    tags: ["Healthcare", "Disease Detection", "ML Models"],
    type: "blog"
  },
  {
    id: 6,
    title: "Understanding Diffusion Models for Image Generation",
    excerpt: "A deep dive into how diffusion models work and their applications in creative image generation.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi.",
    date: "February 10, 2025",
    readTime: "8 min",
    category: "Computer Vision",
    tags: ["Diffusion Models", "Image Generation", "Computer Vision"],
    type: "blog"
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
                        
                        <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                          Read More <ArrowRight className="ml-2 h-3 w-3" />
                        </Button>
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
                        
                        <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                          Read More <ArrowRight className="ml-2 h-3 w-3" />
                        </Button>
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
