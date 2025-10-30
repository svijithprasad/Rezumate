import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/common/Navbar";


const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-linear-to-b from-background to-secondary/30">
      <Navbar />
      <div className="flex min-h-[80vh] items-center justify-center px-6">
        <div className="text-center">
          <h1 className="mb-4 text-8xl font-bold text-primary">404</h1>
          <p className="mb-8 text-2xl font-semibold">Oops! Page not found</p>
          <p className="mb-8 text-muted-foreground">The page you're looking for doesn't exist.</p>
          <Link to="/">
            <Button size="lg">
              Return to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
