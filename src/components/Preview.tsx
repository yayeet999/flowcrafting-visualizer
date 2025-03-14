
import React, { useEffect, useRef, useState } from 'react';
import useStore from '../lib/store';
import { renderMermaid, initializeMermaid } from '../lib/mermaid-utils';
import { Button } from '../components/ui/button';
import { Slider } from '../components/ui/slider';
import { ZoomIn, ZoomOut, Maximize, Sun, Moon } from 'lucide-react';

interface PreviewProps {
  className?: string;
}

const Preview: React.FC<PreviewProps> = ({ className }) => {
  const { 
    code, 
    renderKey, 
    zoomLevel, 
    setZoomLevel, 
    isDarkTheme, 
    toggleTheme, 
    panOffset, 
    setPanOffset, 
    resetView 
  } = useStore();
  
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startDragPos, setStartDragPos] = useState({ x: 0, y: 0 });
  const [renderError, setRenderError] = useState<string | null>(null);

  // Initialize mermaid with theme
  useEffect(() => {
    initializeMermaid(isDarkTheme);
  }, [isDarkTheme]);

  // Render diagram when code changes or render is triggered
  useEffect(() => {
    const renderDiagram = async () => {
      if (!containerRef.current) return;
      
      try {
        setRenderError(null);
        const content = await renderMermaid(code, 'preview');
        
        if (content && containerRef.current) {
          containerRef.current.innerHTML = content;
          
          // Add event listeners to prevent drag on SVG elements
          const svgElement = containerRef.current.querySelector('svg');
          if (svgElement) {
            svgElement.style.maxWidth = '100%';
            svgElement.style.height = 'auto';
            svgElement.style.margin = '0 auto';
          }
        }
      } catch (error) {
        console.error('Error rendering diagram:', error);
        setRenderError('Failed to render diagram. Please check your syntax.');
      }
    };

    renderDiagram();
  }, [code, renderKey, isDarkTheme]);

  // Handle zoom in/out
  const handleZoomIn = () => setZoomLevel(zoomLevel + 0.1);
  const handleZoomOut = () => setZoomLevel(zoomLevel - 0.1);
  const handleZoomChange = (value: number[]) => setZoomLevel(value[0] / 100);
  
  // Handle pan functionality
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // Only handle left click
    setIsDragging(true);
    setStartDragPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const dx = e.clientX - startDragPos.x;
    const dy = e.clientY - startDragPos.y;
    
    setPanOffset({
      x: panOffset.x + dx,
      y: panOffset.y + dy
    });
    
    setStartDragPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Clean up event listeners
  useEffect(() => {
    const handleMouseUpGlobal = () => setIsDragging(false);
    window.addEventListener('mouseup', handleMouseUpGlobal);
    
    return () => {
      window.removeEventListener('mouseup', handleMouseUpGlobal);
    };
  }, []);

  return (
    <div className={`flex flex-col h-full ${className}`}>
      <div className="flex items-center justify-between p-2 bg-secondary rounded-t-lg">
        <div className="text-sm font-medium">Preview</div>
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTheme}
            className="transition-transform active:scale-95"
          >
            {isDarkTheme ? <Sun size={16} /> : <Moon size={16} />}
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={resetView}
            className="transition-transform active:scale-95"
          >
            <Maximize size={16} />
          </Button>
        </div>
      </div>
      
      <div 
        className={`flex-1 overflow-hidden border border-border rounded-b-lg bg-card relative ${
          isDarkTheme ? 'bg-zinc-900 text-white' : 'bg-white text-zinc-900'
        }`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        {renderError ? (
          <div className="flex items-center justify-center h-full p-4 text-center text-destructive">
            {renderError}
          </div>
        ) : (
          <div 
            className="w-full h-full overflow-auto flex items-center justify-center"
          >
            <div 
              ref={containerRef}
              className="mermaid-container transform transition-transform"
              style={{ 
                transform: `scale(${zoomLevel}) translate(${panOffset.x}px, ${panOffset.y}px)`,
                transformOrigin: 'center center',
              }}
            />
          </div>
        )}
      </div>
      
      <div className="flex items-center justify-between mt-2 px-2">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={handleZoomOut}
          disabled={zoomLevel <= 0.1}
          className="transition-transform active:scale-95"
        >
          <ZoomOut size={16} />
        </Button>
        
        <Slider
          value={[zoomLevel * 100]}
          min={10}
          max={200}
          step={5}
          onValueChange={handleZoomChange}
          className="w-48 mx-2"
        />
        
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={handleZoomIn}
          disabled={zoomLevel >= 2}
          className="transition-transform active:scale-95"
        >
          <ZoomIn size={16} />
        </Button>
      </div>
    </div>
  );
};

export default Preview;
