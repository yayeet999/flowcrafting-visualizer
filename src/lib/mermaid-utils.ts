
import mermaid from 'mermaid';

// Initialize mermaid with default configuration
export const initializeMermaid = (isDarkTheme: boolean = false) => {
  const config = {
    startOnLoad: true,
    theme: isDarkTheme ? 'dark' : 'default',
    logLevel: 'error',
    securityLevel: 'loose',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    fontSize: 14,
    flowchart: {
      htmlLabels: true,
      curve: 'linear',
      diagramPadding: 8,
    },
    themeCSS: `
      .node rect { 
        fill: ${isDarkTheme ? '#2d333b' : '#f4f4f4'}; 
        stroke: ${isDarkTheme ? '#555' : '#999'}; 
        stroke-width: 1px; 
      }
      .node polygon { 
        fill: ${isDarkTheme ? '#2d333b' : '#f4f4f4'}; 
        stroke: ${isDarkTheme ? '#555' : '#999'}; 
        stroke-width: 1px; 
      }
      .node circle { 
        fill: ${isDarkTheme ? '#2d333b' : '#f4f4f4'}; 
        stroke: ${isDarkTheme ? '#555' : '#999'}; 
        stroke-width: 1px; 
      }
      .node .label { 
        color: ${isDarkTheme ? '#f8f8f8' : '#333'}; 
      }
      .edgeLabel { 
        background-color: ${isDarkTheme ? '#2d333b' : '#f4f4f4'}; 
        color: ${isDarkTheme ? '#f8f8f8' : '#333'}; 
      }
      .cluster rect { 
        fill: ${isDarkTheme ? '#1e2329' : '#f9f9f9'}; 
        stroke: ${isDarkTheme ? '#555' : '#999'}; 
        stroke-width: 1px; 
      }
    `,
  };

  mermaid.initialize(config);
};

// Render mermaid diagram to SVG
export const renderMermaid = async (
  code: string,
  containerId: string
): Promise<string | null> => {
  try {
    const { svg } = await mermaid.render(`mermaid-${containerId}`, code);
    return svg;
  } catch (error) {
    console.error('Mermaid rendering error:', error);
    return null;
  }
};

// Check if mermaid code is valid
export const validateMermaidCode = async (code: string): Promise<boolean> => {
  try {
    await mermaid.parse(code);
    return true;
  } catch (error) {
    console.error('Mermaid validation error:', error);
    return false;
  }
};

// Extract syntax error from mermaid parser
export const extractSyntaxError = (error: any): string => {
  if (!error) return 'Unknown error';
  
  // Handle different error formats
  if (typeof error === 'string') {
    return error;
  }
  
  if (error.str) {
    return error.str;
  }
  
  if (error.message) {
    return error.message;
  }
  
  return 'Syntax error in diagram';
};

// Format error message to be more user-friendly
export const formatErrorMessage = (error: string): string => {
  // Remove technical details and stack traces
  let message = error.split('\n')[0];
  
  // Replace cryptic error codes
  message = message.replace(/^Error: /, '');
  
  // Add suggestions for common errors
  if (message.includes('Expected')) {
    message += '. Check your syntax for missing elements.';
  }
  
  return message;
};
