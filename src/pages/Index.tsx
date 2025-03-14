
import React, { useEffect } from 'react';
import Header from '../components/Header';
import Layout from '../components/Layout';
import Editor from '../components/Editor';
import Preview from '../components/Preview';
import TemplateLibrary from '../components/TemplateLibrary';
import { initializeMermaid } from '../lib/mermaid-utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Code, FileText, LayoutPanelLeft, LayoutPanelRight } from 'lucide-react';

const Index = () => {
  // Initialize mermaid when component loads
  useEffect(() => {
    initializeMermaid();
  }, []);

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-gradient-to-br from-background to-background/80">
      <Header />
      
      <div className="flex flex-1 overflow-hidden p-6 gap-6">
        <div className="flex flex-col w-72 overflow-hidden animate-slide-in">
          <h2 className="flex items-center gap-2 text-lg font-semibold mb-3 text-foreground/90 pl-1">
            <LayoutPanelLeft size={18} className="text-primary/80" />
            <span>Template Library</span>
          </h2>
          <TemplateLibrary className="flex-1 shadow-xl rounded-xl overflow-hidden border border-border/40 bg-card/50 backdrop-blur-sm" />
        </div>
        
        <Layout 
          className="flex-1 animate-scale-in shadow-xl rounded-xl overflow-hidden border border-border/40 backdrop-blur-sm"
          left={
            <Editor className="h-full" />
          }
          right={
            <Preview className="h-full" />
          }
        />
      </div>
    </div>
  );
};

export default Index;
