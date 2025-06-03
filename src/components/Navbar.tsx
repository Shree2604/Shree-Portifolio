
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ThemeToggle, MobileThemeToggle } from './ThemeToggle';
import ResumeModal from './ResumeModal';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Projects', path: '/projects' },
  { name: 'Publications/Blogs', path: '/blog' },
  { name: 'Experience', path: '/experience' },
  { name: 'Achievements', path: '/achievements' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when navigating
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Function to open resume modal that will be used in the mobile menu
  const openResumeModal = () => setIsResumeOpen(true);

  return (
    <>
      <nav className={cn(
        'fixed top-0 left-0 w-full z-50 py-4 transition-all duration-300',
        scrolled 
          ? 'neo-blur dark:bg-black/40 light:bg-white/90 backdrop-blur-lg border-b border-border/10' 
          : 'bg-transparent'
      )}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link 
              to="/" 
              className="text-xl font-bold cyber-gradient-text"
            >
              ShreeRaj.Dev
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={cn(
                    'px-3 py-2 rounded-lg transition-all duration-300',
                    location.pathname === item.path
                      ? 'bg-primary/20 text-foreground font-medium'
                      : 'text-foreground/70 hover:text-foreground hover:bg-foreground/5'
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Theme Toggle - Desktop */}
            <div className="hidden md:flex items-center ml-4">
              <ThemeToggle />
            </div>

            {/* Mobile Menu Button and Theme Toggle */}
            <div className="md:hidden flex items-center space-x-2">
              <MobileThemeToggle />
              <Button
                variant="ghost"
                size="icon"
                className="text-foreground"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden neo-blur dark:bg-black/60 light:bg-white/90 backdrop-blur-lg mt-2 py-4 px-2 rounded-lg animate-fade-in">
              <div className="flex flex-col space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={cn(
                      'px-4 py-2 rounded-lg transition-all duration-300',
                      location.pathname === item.path
                        ? 'bg-primary/20 text-foreground font-medium'
                        : 'text-foreground/70 hover:text-foreground hover:bg-foreground/5'
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>
      
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </>
  );
}
