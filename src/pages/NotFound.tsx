
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-hpe-darkGray text-white">
      <div className="text-center animate-fadeIn">
        <h1 className="text-6xl font-bold mb-4 text-hpe-green">404</h1>
        <p className="text-xl text-gray-400 mb-6">Oops! Page not found</p>
        <Button 
          onClick={() => navigate('/')} 
          className="bg-hpe-green hover:bg-hpe-green/90 text-white"
        >
          Return to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
