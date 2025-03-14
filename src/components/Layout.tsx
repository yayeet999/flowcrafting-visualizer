
import React, { useState, useRef, useEffect } from 'react';
import useStore from '../lib/store';
import { cn } from '@/lib/utils';

interface LayoutProps {
  left: React.ReactNode;
  right: React.ReactNode;
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({ left, right, className }) => {
  const { splitPosition, setSplitPosition } = useStore();
  const [isResizing, setIsResizing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle resizing
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  };

  const handleMouseUp = () => {
    setIsResizing(false);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing || !containerRef.current) return;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const containerWidth = containerRect.width;
    const mouseX = e.clientX - containerRect.left;
    
    // Calculate new split position as percentage
    const newSplitPosition = (mouseX / containerWidth) * 100;
    setSplitPosition(newSplitPosition);
  };

  // Add and remove event listeners
  useEffect(() => {
    if (isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  return (
    <div 
      ref={containerRef}
      className={cn("flex h-full backdrop-blur-sm bg-gradient-to-br from-card to-card/80", className)}
    >
      {/* Left panel */}
      <div 
        className="overflow-hidden flex-shrink-0 transition-all duration-100 ease-out"
        style={{ width: `${splitPosition}%` }}
      >
        {left}
      </div>
      
      {/* Resizer */}
      <div 
        className={cn(
          "resizer flex-shrink-0 z-10 h-full w-1.5 cursor-col-resize mx-1 rounded-full hover:bg-accent transition-colors relative", 
          isResizing ? "bg-accent/80" : "bg-border/80",
          "before:absolute before:content-[''] before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-5 before:h-12 before:rounded-md before:bg-transparent"
        )}
        onMouseDown={handleMouseDown}
      />
      
      {/* Right panel */}
      <div 
        className="overflow-hidden flex-1 transition-all duration-100 ease-out"
        style={{ width: `${100 - splitPosition}%` }}
      >
        {right}
      </div>
    </div>
  );
};

export default Layout;
