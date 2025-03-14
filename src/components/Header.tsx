
import React from 'react';
import { Button } from '../components/ui/button';
import { Download, Github, Info, BookMarked, Code2, Sparkles } from 'lucide-react';
import { useToast } from '../components/ui/use-toast';
import useStore from '../lib/store';

const Header: React.FC = () => {
  const { code } = useStore();
  const { toast } = useToast();

  const handleExportSVG = async () => {
    try {
      const svgElement = document.querySelector('.mermaid-container svg');
      if (!svgElement) {
        toast({
          title: "Export failed",
          description: "No diagram found to export.",
          variant: "destructive",
        });
        return;
      }
      
      // Create a blob from the SVG
      const svgData = new XMLSerializer().serializeToString(svgElement);
      const blob = new Blob([svgData], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      
      // Create a download link and trigger it
      const link = document.createElement('a');
      link.href = url;
      link.download = 'mermaid-diagram.svg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up
      URL.revokeObjectURL(url);
      
      toast({
        title: "Export successful",
        description: "Your diagram has been exported as an SVG file.",
      });
    } catch (error) {
      console.error('Export error:', error);
      toast({
        title: "Export failed",
        description: "An error occurred while exporting the diagram.",
        variant: "destructive",
      });
    }
  };

  const handleExportCode = () => {
    try {
      // Create a blob from the code
      const blob = new Blob([code], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      
      // Create a download link and trigger it
      const link = document.createElement('a');
      link.href = url;
      link.download = 'mermaid-code.txt';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up
      URL.revokeObjectURL(url);
      
      toast({
        title: "Export successful",
        description: "Your diagram code has been exported as a text file.",
      });
    } catch (error) {
      console.error('Export error:', error);
      toast({
        title: "Export failed",
        description: "An error occurred while exporting the code.",
        variant: "destructive",
      });
    }
  };

  return (
    <header className="bg-gradient-to-r from-card via-card/90 to-card border-b border-border/30 py-3 px-5 w-full flex items-center justify-between animate-fade-in backdrop-blur-sm shadow-sm">
      <div className="flex items-center space-x-3">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <Sparkles size={28} className="text-primary" />
            <div className="absolute -inset-1 bg-primary/20 blur-lg rounded-full -z-10 opacity-70"></div>
          </div>
          <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Mermaid Editor
          </h1>
        </div>
        <span className="text-xs font-medium bg-primary/15 text-primary px-2.5 py-1 rounded-full border border-primary/20">
          Beta
        </span>
      </div>
      
      <div className="flex items-center gap-3">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleExportCode}
          className="border-border/50 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300"
        >
          <Code2 size={14} className="mr-1.5" />
          Export Code
        </Button>
        <Button 
          variant="default" 
          size="sm" 
          onClick={handleExportSVG}
          className="shadow-sm hover:shadow-md transition-all duration-300 bg-gradient-to-r from-primary to-accent hover:opacity-90"
        >
          <Download size={14} className="mr-1.5" />
          Export SVG
        </Button>
      </div>
    </header>
  );
};

export default Header;
