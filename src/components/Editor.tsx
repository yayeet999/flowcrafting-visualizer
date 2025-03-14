
import React, { useRef, useEffect } from 'react';
import MonacoEditor from "@monaco-editor/react";
import useStore from '../lib/store';
import { Button } from '../components/ui/button';
import { validateMermaidCode } from '../lib/mermaid-utils';
import { toast } from '../components/ui/use-toast';
import { Play } from 'lucide-react';

interface EditorProps {
  className?: string;
}

const Editor: React.FC<EditorProps> = ({ className }) => {
  const { code, setCode, triggerRender } = useStore();
  const editorRef = useRef<any>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor;
    
    // Set up auto-focus
    editor.focus();
    
    // Add custom editor commands
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      handleRender();
    });
  };

  const handleChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCode(value);
      
      // Debounce validation
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      
      debounceRef.current = setTimeout(async () => {
        const isValid = await validateMermaidCode(value);
        if (isValid) {
          triggerRender();
        }
      }, 800);
    }
  };

  const handleRender = async () => {
    const isValid = await validateMermaidCode(code);
    if (isValid) {
      triggerRender();
      toast({
        title: "Diagram rendered",
        description: "Your changes have been applied to the diagram.",
        duration: 2000,
      });
    } else {
      toast({
        title: "Syntax Error",
        description: "Please check your diagram syntax and try again.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  // Clean up debounce timer
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  return (
    <div className={`flex flex-col h-full ${className}`}>
      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-t-xl border-b border-border/30">
        <div className="text-sm font-medium text-foreground/80">Mermaid Editor</div>
        <Button 
          size="sm" 
          onClick={handleRender}
          className="transition-transform active:scale-95 gap-1.5"
        >
          <Play size={14} />
          Render
        </Button>
      </div>
      <div className="flex-1 overflow-hidden border-x border-border/30">
        <MonacoEditor
          language="markdown"
          value={code}
          onChange={handleChange}
          onMount={handleEditorDidMount}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            fontFamily: 'JetBrains Mono, Menlo, Monaco, Consolas, monospace',
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            wordWrap: 'on',
            scrollbar: {
              verticalScrollbarSize: 8,
              horizontalScrollbarSize: 8
            },
            padding: {
              top: 16,
              bottom: 16
            }
          }}
          className="h-full w-full"
        />
      </div>
    </div>
  );
};

export default Editor;
