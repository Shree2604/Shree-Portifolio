
import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Index from "./pages/Index";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Experience from "./pages/Experience";
import Achievements from "./pages/Achievements";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import NotFound from "./pages/NotFound";
import LoadingScreen from "@/components/LoadingScreen";
import ParticlesBackground from "@/components/ParticlesBackground";
import ImmersiveExperience from "@/components/ImmersiveExperience";
import CustomCursor from "@/components/CustomCursor";


const queryClient = new QueryClient();

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

const MainApp = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  
  return (
    <>
      {isHomePage && <CustomCursor />}
      <ParticlesBackground />
      {isHomePage && <ImmersiveExperience />}
      <Navbar />
      <main className="pt-16">
        <Routes>
          <Route path="/" element={
            <PageTransition>
              <Index />
            </PageTransition>
          } />
          <Route path="/about" element={
            <PageTransition>
              <About />
            </PageTransition>
          } />
          <Route path="/projects" element={
            <PageTransition>
              <Projects />
            </PageTransition>
          } />
          <Route path="/experience" element={
            <PageTransition>
              <Experience />
            </PageTransition>
          } />
          <Route path="/achievements" element={
            <PageTransition>
              <Achievements />
            </PageTransition>
          } />
          <Route path="/blog" element={
            <PageTransition>
              <Blog />
            </PageTransition>
          } />
          <Route path="/contact" element={
            <PageTransition>
              <Contact />
            </PageTransition>
          } />
          <Route path="*" element={
            <PageTransition>
              <NotFound />
            </PageTransition>
          } />
        </Routes>
      </main>
      

    </>
  );
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Ensure loading screen shows for at least 3.5 seconds for a good UX
  useEffect(() => {
    // Force loading screen for minimum time even if app loads faster
    const minLoadingTime = setTimeout(() => {
      setIsLoading(false);
    }, 3500); // 3.5 seconds minimum loading time
    
    return () => clearTimeout(minLoadingTime);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <AnimatePresence mode="wait">
            {isLoading ? (
              <LoadingScreen onComplete={() => setIsLoading(false)} />
            ) : (
              <BrowserRouter>
                <MainApp />
              </BrowserRouter>
            )}
          </AnimatePresence>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
