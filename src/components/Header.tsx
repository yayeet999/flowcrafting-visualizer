
import React from 'react';
import { Button } from '../components/ui/button';
import { Download, Github, Info } from 'lucide-react';
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
    <header className="bg-card border-b border-border py-3 px-4 w-full flex items-center justify-between animate-fade-in">
      <div className="flex items-center space-x-3">
        <h1 className="text-xl font-semibold tracking-tight">
          Mermaid Diagram Editor
        </h1>
        <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-full">
          Beta
        </span>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="sm" onClick={handleExportCode}>
          Export Code
        </Button>
        <Button 
          variant="default" 
          size="sm" 
          onClick={handleExportSVG}
          className="flex items-center gap-1"
        >
          <Download size={14} />
          <span>Export SVG</span>
        </Button>
      </div>
    </header>
  );
};

export default Header;
