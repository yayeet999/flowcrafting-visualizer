
import React, { useEffect } from 'react';
import Header from '../components/Header';
import Layout from '../components/Layout';
import Editor from '../components/Editor';
import Preview from '../components/Preview';
import TemplateLibrary from '../components/TemplateLibrary';
import { initializeMermaid } from '../lib/mermaid-utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Code, FileText } from 'lucide-react';

const Index = () => {
  // Initialize mermaid when component loads
  useEffect(() => {
    initializeMermaid();
  }, []);

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-background">
      <Header />
      
      <div className="flex flex-1 overflow-hidden p-6">
        <div className="flex flex-col w-72 mr-6 overflow-hidden animate-slide-in">
          <h2 className="text-lg font-semibold mb-3 text-foreground/90">Template Library</h2>
          <TemplateLibrary className="flex-1 shadow-md rounded-xl overflow-hidden border border-border/40 bg-card/50" />
        </div>
        
        <Layout 
          className="flex-1 animate-scale-in shadow-md rounded-xl overflow-hidden border border-border/40"
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
