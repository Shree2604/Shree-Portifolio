import { useState } from 'react';
import Section from '@/components/Section';
import { AnimatedCard } from '@/components/AnimatedCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { File, Github, Linkedin, Mail, Phone, Send } from 'lucide-react';
import { RESUME_URL } from '@/config/constants';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import Footer from '@/components/Footer';
import emailjs from '@emailjs/browser';

// EmailJS configuration - update these with your actual values from EmailJS dashboard
const EMAILJS_SERVICE_ID = 'service_id'; // Replace with your EmailJS service ID
const EMAILJS_TEMPLATE_ID = 'template_id'; // Replace with your EmailJS template ID
const EMAILJS_PUBLIC_KEY = 'public_key'; // Replace with your EmailJS public key

const socialLinks = [
  {
    icon: <Github className="h-5 w-5" />,
    label: 'GitHub',
    value: 'github.com/Shree2604',
    href: 'https://github.com/Shree2604',
    color: 'bg-gray-800'
  },
  {
    icon: <Linkedin className="h-5 w-5" />,
    label: 'LinkedIn',
    value: 'linkedin.com/in/m-shreeraj',
    href: 'https://linkedin.com/in/m-shreeraj',
    color: 'bg-blue-600'
  },
  {
    icon: <Mail className="h-5 w-5" />,
    label: 'Email',
    value: 'shree.xai.dev@gmail.com',
    href: 'mailto:shree.xai.dev@gmail.com',
    color: 'bg-red-500'
  },
  {
    icon: <Phone className="h-5 w-5" />,
    label: 'Phone',
    value: '+91 8143272388',
    href: 'tel:+918143272388',
    color: 'bg-green-600'
  },
  {
    icon: <File className="h-5 w-5" />,
    label: 'Resume',
    value: 'View/Download Resume',
    href: RESUME_URL,
    color: 'bg-purple-600'
  }
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Form validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast({
        title: "Missing information",
        description: "Please fill out all fields in the form.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }
    
    try {
      // Prepare parameters for EmailJS
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        to_email: 'shree.xai.dev@gmail.com', // Your email address
        subject: formData.subject,
        message: formData.message
      };
      
      // Send email using EmailJS
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );
      
      // Success notification
      toast({
        title: "Message sent successfully!",
        description: "Your message has been sent. Thank you for reaching out!",
      });
      
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error sending message",
        description: "Please try again or contact directly via email at shree.xai.dev@gmail.com",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <>
      <Section 
        title="Contact Me" 
        subtitle="Let's connect and discuss how we can work together" 
        id="contact"
        className="bg-gradient-to-b from-background via-background to-secondary/10"
      >
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1 }
                }
              }}
              className="flex justify-center"
            >
              <AnimatedCard className="p-8 w-full max-w-md" glowOnHover>
                <motion.h3 
                  className="text-2xl font-bold mb-6 text-gradient text-center"
                  variants={fadeInUp}
                >
                  Get In Touch 🚀
                </motion.h3>
                <motion.p 
                  className="text-muted-foreground mb-8 text-center"
                  variants={fadeInUp}
                >
                  I'm always open to discussing new projects, opportunities, or partnerships. Feel free to reach out through any of the channels below.
                </motion.p>
                
                <div className="space-y-4">
                  {socialLinks.map((link, index) => (
                    <motion.div key={index} variants={fadeInUp} className="flex justify-center">
                      <a 
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full"
                      >
                        <AnimatedCard className="p-4 hover:bg-primary/5 transition-all duration-300">
                          <div className="flex items-center">
                            <div className={`${link.color} p-2 rounded-full mr-4`}>
                              {link.icon}
                            </div>
                            <div>
                              <div className="font-medium">{link.label}</div>
                              <div className="text-sm text-muted-foreground">{link.value}</div>
                            </div>
                          </div>
                        </AnimatedCard>
                      </a>
                    </motion.div>
                  ))}
                </div>
                
                <motion.div 
                  className="mt-8 text-center"
                  variants={fadeInUp}
                >
                  <h4 className="text-lg font-semibold mb-3">Current Availability 📅</h4>
                  <p className="text-muted-foreground">
                    I'm currently open to internship opportunities in the AI/ML domain, particularly in 
                    <span className="text-primary font-medium"> Agentic AI</span>, 
                    <span className="text-primary font-medium"> GenAI</span>, and 
                    <span className="text-primary font-medium"> Research Projects</span>. 
                    Looking for part-time collaborations that allow me to contribute to innovative AI solutions.
                  </p>
                </motion.div>
              </AnimatedCard>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex justify-center"
            >
              <AnimatedCard className="p-8 w-full max-w-md" glowOnHover>
                <h3 className="text-2xl font-bold mb-6 text-gradient text-center">Send a Message</h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        required
                        className="bg-secondary/10 border-secondary/20 focus:border-primary"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Your email"
                        required
                        className="bg-secondary/10 border-secondary/20 focus:border-primary"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="What's this about?"
                      required
                      className="bg-secondary/10 border-secondary/20 focus:border-primary"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Your message..."
                      rows={5}
                      required
                      className="bg-secondary/10 border-secondary/20 focus:border-primary resize-none"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full group"
                  >
                    {isLoading ? 'Sending...' : (
                      <>
                        Send Message
                        <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </Button>
                  
                  <div className="text-xs text-center text-muted-foreground pt-2">
                    Your message will be sent directly to shree.xai.dev@gmail.com.
                    Please fill out all fields to ensure your message is delivered.
                  </div>
                </form>
              </AnimatedCard>
            </motion.div>
          </div>
        </div>
      </Section>
      <Footer />
    </>
  );
};

export default Contact;
