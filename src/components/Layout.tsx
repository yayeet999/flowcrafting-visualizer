
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
      className={cn("flex h-full", className)}
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
          "resizer flex-shrink-0 z-10 h-full cursor-col-resize hover:bg-primary/20", 
          isResizing && "bg-primary/40"
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
