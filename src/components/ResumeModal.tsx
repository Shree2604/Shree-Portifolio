import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Github, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogFooter } from '@/components/ui/dialog';
import { RESUME_URL } from '@/config/constants';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);
  
  const handleDownload = () => {
    window.open(RESUME_URL, '_blank');
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] p-0 gap-0 flex flex-col">
        <DialogHeader className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm p-4 border-b">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg">Shreeraj's Resume</DialogTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="flex-1 min-h-[500px] overflow-hidden relative">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-sm text-muted-foreground">Loading resume from GitHub...</p>
              </div>
            </div>
          )}
          
          <iframe 
            src={RESUME_URL}
            className="w-full h-full border-0"
            onLoad={() => setIsLoading(false)}
          />
        </div>
        
        <DialogFooter className="sticky bottom-0 bg-background/95 backdrop-blur-sm p-4 border-t">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <Github className="h-4 w-4" />
              <span className="text-sm text-muted-foreground">Hosted on GitHub</span>
            </div>
            <Button onClick={handleDownload} className="gap-2">
              <Download className="h-4 w-4" />
              Download
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ResumeModal;
