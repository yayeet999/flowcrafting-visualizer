
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="w-full max-w-md text-center px-4">
        <h1 className="text-6xl font-bold mb-4 text-primary animate-fade-in">404</h1>
        <p className="text-xl text-foreground mb-8 animate-fade-in" style={{ animationDelay: "100ms" }}>
          The page you're looking for doesn't exist
        </p>
        <Button 
          onClick={() => window.location.href = '/'}
          className="inline-flex items-center gap-2 animate-fade-in"
          style={{ animationDelay: "200ms" }}
        >
          <ArrowLeft size={16} />
          <span>Return to Home</span>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
