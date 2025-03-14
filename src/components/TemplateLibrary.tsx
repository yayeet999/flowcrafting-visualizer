
import React, { useState } from 'react';
import { getTemplatesByCategory, getAllCategories, getTemplateById } from '../lib/templates';
import useStore from '../lib/store';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { ChevronRight, Code, LayoutTemplate, MessageCircle } from 'lucide-react';
import { toast } from '../components/ui/use-toast';

interface TemplateLibraryProps {
  className?: string;
}

const TemplateLibrary: React.FC<TemplateLibraryProps> = ({ className }) => {
  const { setCode, triggerRender } = useStore();
  const [activeCategory, setActiveCategory] = useState('flowchart');
  const categories = getAllCategories();
  
  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      'flowchart': 'Flowcharts',
      'sequence': 'Sequence',
      'state': 'State',
      'class': 'Class',
      'er': 'ER Diagram',
      'other': 'Other'
    };
    return labels[category] || category;
  };
  
  const getCategoryIcon = (category: string) => {
    const icons: Record<string, React.ReactNode> = {
      'flowchart': <LayoutTemplate size={14} />,
      'sequence': <MessageCircle size={14} />,
      'state': <LayoutTemplate size={14} />,
      'class': <Code size={14} />,
      'er': <LayoutTemplate size={14} />,
      'other': <LayoutTemplate size={14} />
    };
    return icons[category] || <LayoutTemplate size={14} />;
  };
  
  const handleSelectTemplate = (templateId: string) => {
    const template = getTemplateById(templateId);
    if (template) {
      setCode(template.code);
      triggerRender();
      toast({
        title: "Template applied",
        description: `Applied template: ${template.name}`,
        duration: 2000,
      });
    }
  };
  
  return (
    <div className={`flex flex-col h-full ${className}`}>
      <div className="p-2 bg-secondary rounded-t-lg">
        <h3 className="text-sm font-medium">Template Library</h3>
      </div>
      
      <Tabs 
        defaultValue="flowchart" 
        value={activeCategory}
        onValueChange={setActiveCategory}
        className="flex-1 flex flex-col overflow-hidden"
      >
        <TabsList className="w-full justify-start px-2 pt-2 overflow-x-auto flex space-x-1 bg-card rounded-none border-b border-border">
          {categories.map((category) => (
            <TabsTrigger 
              key={category} 
              value={category}
              className="flex items-center space-x-1 px-2.5 py-1.5 text-xs"
            >
              {getCategoryIcon(category)}
              <span>{getCategoryLabel(category)}</span>
            </TabsTrigger>
          ))}
        </TabsList>
        
        {categories.map((category) => (
          <TabsContent 
            key={category} 
            value={category} 
            className="flex-1 overflow-y-auto p-3 space-y-2"
          >
            {getTemplatesByCategory(category).map((template) => (
              <div 
                key={template.id}
                className="group relative border border-border rounded-md p-3 hover:border-primary/40 
                           transition-all duration-200 hover:shadow-sm cursor-pointer card-hover"
                onClick={() => handleSelectTemplate(template.id)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-sm">{template.name}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{template.description}</p>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <ChevronRight size={16} className="text-primary" />
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default TemplateLibrary;
