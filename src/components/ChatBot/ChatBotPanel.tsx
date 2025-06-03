
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Brain, Github, SendHorizontal, ShieldCheck, XCircle, Mic, MicOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import MessageBubble from './MessageBubble';
import RobotAvatar from './RobotAvatar';

const sampleQuestions = [
  "Tell me about Shreeraj's experience.",
  "What AI/ML skills does Shreeraj have?",
  "Describe the GIF Animation Generator project.",
  "What is Shreeraj's background in healthcare AI?",
  "Which frameworks does Shreeraj work with?"
];

const knowledgeBase = {
  experience: {
    valuedx: "Shreeraj works as an Agentic AI Intern at ValueDX (November 2024 - Present) where he works extensively with the LangGraph Framework to design and optimize autonomous AI systems. He contributes to healthcare automation, including patient booking systems and medical workflow optimization, and develops AI-driven financial invoice processing for document handling and data extraction.",
    civicraft: "At Civicraft (March 2024 - July 2024), Shreeraj worked as a Machine Learning Intern building Local Language Translation (LLT) models using TensorFlow & PyTorch. He integrated multi-lingual speech technology for seamless user interaction and focused on making AI adaptive & user-friendly via voice interaction and multi-format support.",
    iiit: "During his ML IoT Research Internship at IIIT Sri City (December 2023 - February 2024), Shreeraj developed a predictive model for infectious disease forecasting with 87.4% accuracy, built an IoT-based health monitoring prototype for real-time data processing, and improved model transparency using Eli5, SHAP, and LIME."
  },
  skills: {
    programming: "Shreeraj is proficient in Python, C++, Java, and SQL programming languages.",
    tools: "He has experience with Git, GitHub, Matlab, Linux, AWS, Flask, Django, Hugging Face, and Streamlit.",
    ml: "His machine learning and AI skills include TensorFlow, PyTorch, Scikit-Learn, NumPy, Pandas, LangChain, and LangGraph.",
    courses: "Relevant coursework includes Data Structures, OOPS, Operating Systems, DBMS, Computer Networks, and Cloud Computing."
  },
  projects: {
    gif: "The GIF Animation Generator Agent is an AI-powered GIF generation workflow with multiple autonomous agents. It uses Gemini 1.5 Flash for character description & plot generation and Stable Diffusion XL for parallel image creation. The project implements a complete end-to-end workflow leveraging async Python to handle complex operations in parallel.",
    healthcare: "The Intelligent Healthcare project is a smart healthcare ecosystem for real-time monitoring. It features a stacked model (Logistic Regression, Random Forest, XGBoost) with 87.4% accuracy and uses Eli5, DeepSHAP, and LIME for model explainability. It creates a comprehensive monitoring system with advanced predictive capabilities while making AI decisions transparent and trustworthy for healthcare professionals.",
    face: "The Face Recognition for Attendance Systems project is a Haar Cascade-based face recognition system with 95% accuracy. Built key components include generateimages.py, createdataandlabel.py, model.py, and testing.py. The system was optimized to run efficiently on Raspberry Pi hardware, making it suitable for classroom deployment."
  },
  achievements: "Shreeraj has collaborated and organized 'BIT N BUILD', an international hackathon at IIIT Sricity. He achieved a Top 1% ranking in GCCP Cloud Campaign 2024 and placed in the Top 10 in the Thryve Digital National Healthcare Hackathon 2023.",
  positions: "Shreeraj serves as the Club Lead at Epoch, the AI/ML Club of IIIT Sri City. He is also the NSS Design Lead at IIIT Sri City and Sponsorship Lead at IIIT Sri City.",
  education: "Shreeraj studies at the Indian Institute of Information Technology, Sricity (2022-2026) with a CGPA of 8.29/10.",
  intro: "Greetings! I'm ShreeBot, your AI assistant for exploring Shreeraj's portfolio. I can answer questions about his AI/ML projects, technical skills, and professional experience. Feel free to ask me anything about Shreeraj's expertise in machine learning, autonomous agents, or his portfolio projects!"
};

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  links?: { text: string; url: string }[];
}

const ChatbotPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasShownIntro, setHasShownIntro] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechRecognition, setSpeechRecognition] = useState<SpeechRecognition | null>(null);
  
  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && !hasShownIntro && messages.length === 0) {
      setIsTyping(true);
      
      setTimeout(() => {
        setMessages([
          { 
            id: Date.now().toString(), 
            content: knowledgeBase.intro,
            isUser: false 
          }
        ]);
        setIsTyping(false);
        setHasShownIntro(true);
      }, 1500);
    }
  }, [isOpen, hasShownIntro, messages.length]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Initialize speech recognition with proper TypeScript checks
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
      
      if (SpeechRecognitionAPI) {
        const recognition = new SpeechRecognitionAPI();
        
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = 'en-US';
        
        recognition.onresult = (event) => {
          const transcript = Array.from(event.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('');
          
          setInputValue(transcript);
          
          // Auto-send the message if it's a final result and not empty
          if (event.results[0].isFinal && transcript.trim() !== '') {
            sendMessage(transcript);
            stopListening();
          }
        };
        
        recognition.onend = () => {
          setIsListening(false);
        };
        
        recognition.onerror = (event) => {
          console.error('Speech recognition error', event.error);
          setIsListening(false);
        };
        
        setSpeechRecognition(recognition);
      }
    }
  }, []);

  const toggleChat = () => {
    setIsOpen(prev => !prev);
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };
  
  const startListening = () => {
    if (speechRecognition) {
      try {
        speechRecognition.start();
        setIsListening(true);
      } catch (error) {
        console.error('Speech recognition start error:', error);
      }
    }
  };
  
  const stopListening = () => {
    if (speechRecognition && isListening) {
      speechRecognition.stop();
      setIsListening(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleQuestionClick = (question: string) => {
    sendMessage(question);
  };

  const sendMessage = (content: string = inputValue) => {
    if (!content.trim()) return;
    
    const userMessageId = Date.now().toString();
    setMessages(prev => [
      ...prev, 
      { id: userMessageId, content, isUser: true }
    ]);
    
    setInputValue("");
    setIsTyping(true);
    setIsProcessing(true);
    
    setTimeout(() => {
      const response = generateResponse(content.toLowerCase());
      setMessages(prev => [
        ...prev,
        { 
          id: (Date.now() + 1).toString(), 
          content: response.message,
          isUser: false,
          links: response.links
        }
      ]);
      setIsTyping(false);
      setIsProcessing(false);
    }, Math.random() * 1000 + 1500);
  };

  const generateResponse = (query: string): { message: string; links?: { text: string; url: string }[] } => {
    if (query.includes("gif") || query.includes("animation") || query.includes("generator")) {
      return {
        message: knowledgeBase.projects.gif,
        links: [{
          text: "View GIF Generator Project on GitHub",
          url: "https://github.com/Shree2604/GIF-Animation-Generator-Agent"
        }]
      };
    }
    
    if (query.includes("healthcare") || query.includes("health") || query.includes("medical") || query.includes("xgboost")) {
      return {
        message: knowledgeBase.projects.healthcare,
        links: [{
          text: "View Intelligent Healthcare Project on GitHub",
          url: "https://github.com/Shree2604/ML-Internship-Task"
        }]
      };
    }
    
    if (query.includes("face") || query.includes("recognition") || query.includes("attendance")) {
      return {
        message: knowledgeBase.projects.face,
        links: [{
          text: "View Face Recognition Project on GitHub",
          url: "https://github.com/Shree2604/Face-Recognition-for-Attendance-Systems"
        }]
      };
    }
    
    if (query.includes("experience") || query.includes("work") || query.includes("career")) {
      return {
        message: `PROCESSING QUERY... Here's Shreeraj's work experience:\n\n1. ${knowledgeBase.experience.valuedx}\n\n2. ${knowledgeBase.experience.civicraft}\n\n3. ${knowledgeBase.experience.iiit}`
      };
    }
    
    if (query.includes("skill") || query.includes("know") || query.includes("technologies") || 
        query.includes("framework") || query.includes("language")) {
      return {
        message: `TECHNICAL SKILLS FOUND: ${knowledgeBase.skills.ml}\n\nProgramming Languages: ${knowledgeBase.skills.programming}\n\nTools & Frameworks: ${knowledgeBase.skills.tools}`
      };
    }
    
    if (query.includes("achievement") || query.includes("award") || query.includes("recognition") || 
        query.includes("accomplishment") || query.includes("hackathon")) {
      return {
        message: `ACHIEVEMENT DATA: ${knowledgeBase.achievements}`
      };
    }
    
    if (query.includes("education") || query.includes("college") || query.includes("university") || 
        query.includes("degree") || query.includes("study") || query.includes("cgpa") || query.includes("gpa")) {
      return {
        message: `EDUCATION INFORMATION: ${knowledgeBase.education}`
      };
    }
    
    if (query.includes("position") || query.includes("role") || query.includes("responsibility") || 
        query.includes("lead") || query.includes("club")) {
      return {
        message: `LEADERSHIP ROLES: ${knowledgeBase.positions}`
      };
    }
    
    return {
      message: "I'm specialized in answering questions about Shreeraj's AI/ML experience, projects, and skills. Could you rephrase your question about his portfolio, or ask me about his projects like the GIF Animation Generator, Intelligent Healthcare, or Face Recognition system?"
    };
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <>
      <RobotAvatar 
        isOpen={isOpen}
        isProcessing={isProcessing} 
        onClick={toggleChat}
      />
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 right-6 w-80 sm:w-96 h-[500px] max-h-[calc(100vh-120px)] bg-background/95 backdrop-blur-md shadow-xl rounded-xl border border-primary/20 overflow-hidden z-50 flex flex-col"
          >
            <div className="p-4 border-b border-border flex items-center justify-between bg-gradient-to-r from-primary/10 to-transparent">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <Bot className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-medium text-sm">ShreeBot</h3>
                  <p className="text-xs text-muted-foreground">AI Assistant</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-primary cursor-pointer"
                >
                  <ShieldCheck className="h-4 w-4" />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleChat}
                  className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-primary cursor-pointer"
                >
                  <XCircle className="h-4 w-4" />
                </motion.div>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-primary/10 scrollbar-track-transparent">
              {messages.length === 0 && !isTyping && (
                <div className="h-full flex items-center justify-center flex-col p-4">
                  <Brain className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-center text-muted-foreground text-sm mb-2">
                    Ask me anything about Shreeraj's AI/ML projects, skills, or experience!
                  </p>
                  <div className="mt-3 flex flex-wrap justify-center gap-2">
                    {sampleQuestions.map((question, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="text-xs"
                        onClick={() => handleQuestionClick(question)}
                      >
                        {question.length > 25 ? question.substring(0, 25) + '...' : question}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
              
              {messages.map((message) => (
                <MessageBubble 
                  key={message.id}
                  content={message.content}
                  isUser={message.isUser}
                  links={message.links}
                />
              ))}
              
              {isTyping && (
                <MessageBubble content="" isUser={false} isTyping />
              )}
              
              <div ref={messageEndRef} />
            </div>
            
            <div className="p-4 border-t border-border">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder={isListening ? "Listening..." : "Ask about projects, skills, etc..."}
                  className={`flex-1 ${isListening ? 'border-primary animate-pulse' : ''}`}
                />
                <Button
                  size="icon"
                  variant={isListening ? "destructive" : "outline"}
                  onClick={toggleListening}
                  className="transition-colors"
                  title={isListening ? "Stop listening" : "Start voice input"}
                >
                  {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </Button>
                <Button
                  size="icon"
                  onClick={() => sendMessage()}
                  disabled={inputValue.trim() === "" || isTyping}
                >
                  <SendHorizontal className="h-4 w-4" />
                </Button>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Github className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    <a href="https://github.com/Shree2604" target="_blank" rel="noopener noreferrer" className="hover:underline">
                      Shree2604
                    </a>
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">Powered by ShreeBot</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatbotPanel;
