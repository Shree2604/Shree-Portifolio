import { useState, useEffect, useRef } from 'react';
import Section from '@/components/Section';
import { AnimatedCard } from '@/components/AnimatedCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { File, Github, Linkedin, Mail, Phone, Send, MapPin } from 'lucide-react';
import { RESUME_URL, EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY } from '@/config/constants';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import Footer from '@/components/Footer';
import emailjs from '@emailjs/browser';

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
  
  // Initialize EmailJS with proper configuration for v4
  useEffect(() => {
    // Log all credentials for debugging
    console.log('Service ID:', EMAILJS_SERVICE_ID);
    console.log('Template ID:', EMAILJS_TEMPLATE_ID);
    console.log('Public Key:', EMAILJS_PUBLIC_KEY);
    
    // Initialize EmailJS with development options
    emailjs.init({
      publicKey: EMAILJS_PUBLIC_KEY,
      blockHeadless: false // Required for development testing
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Prepare the email data for direct API call
      const emailData = {
        service_id: EMAILJS_SERVICE_ID,
        template_id: EMAILJS_TEMPLATE_ID,
        user_id: EMAILJS_PUBLIC_KEY,
        template_params: {
          from_name: formData.name,
          reply_to: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_email: 'shree.xai.dev@gmail.com'
        }
      };

      console.log('Sending email with data:', JSON.stringify(emailData, null, 2));
      
      // Make a direct fetch call to EmailJS API
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(emailData)
      });
      
      // Log the raw response
      console.log('Raw API response status:', response.status);
      const responseText = await response.text();
      console.log('Raw API response text:', responseText);
      
      // Check if the response was successful
      if (!response.ok) {
        throw new Error(`EmailJS API error: ${response.status} ${responseText}`);
      }
      
      console.log('EmailJS Response:', response);
      
      // Display success toast
      toast({
        title: "Message sent!",
        description: "Your message has been sent successfully. I'll get back to you as soon as possible.",
        variant: "default",
      });
      
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      console.log('Email sent successfully!');
    } catch (error) {
      console.error("Error sending message:", error);
      
      // Display detailed error information in console
      console.error("Error details:", error.message || error);
      
      // Display error toast with more helpful message
      toast({
        title: "Failed to send message",
        description: "There was an error sending your message. Please check the console for details or try again later.",
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
                  <div>
                    <label htmlFor="from_name" className="block text-sm font-medium mb-2">
                      Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="bg-secondary/10 border-secondary/20 focus:border-primary"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="reply_to" className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your email address"
                      className="bg-secondary/10 border-secondary/20 focus:border-primary"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-2">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Subject of your message"
                      className="bg-secondary/10 border-secondary/20 focus:border-primary"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Your message"
                      className="bg-secondary/10 border-secondary/20 focus:border-primary resize-none"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </span>
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
