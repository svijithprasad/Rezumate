import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SignedIn, SignedOut, SignUpButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

const Hero = () => {
  const techStack = [
    { name: "React", icon: "⚛️" },
    { name: "TypeScript", icon: "📘" },
    { name: "Vite", icon: "⚡" },
    { name: "Tailwind CSS", icon: "🎨" },
    { name: "shadcn/ui", icon: "🎭" },
    { name: "React Router", icon: "🛣️" },
  ];

  return (
    <section className="relative min-h-screen pt-32 pb-20 px-6 bg-linear-to-b from-background to-secondary/30">
      <div className="container mx-auto max-w-6xl">
        {/* Announcement Badge */}
        <div className="flex justify-center mb-12 animate-fade-in">
          <Badge
            variant="outline"
            className="px-4 py-2 border-primary/20 bg-card shadow-soft"
          >
            <span className="bg-primary text-primary-foreground text-xs font-semibold px-2 py-1 rounded-full mr-2">
              New
            </span>
            <span className="text-sm font-medium">AI Feature Added</span>
          </Badge>
        </div>

        {/* Tagline */}
        <div
          className="flex justify-center mb-8 animate-fade-in"
          style={{ animationDelay: "0.1s" }}
        >
          <Badge variant="secondary" className="text-sm font-medium px-4 py-2">
            ✨ Your Career, Amplified by AI
          </Badge>
        </div>

        {/* Main Headline */}
        <div
          className="text-center mb-8 animate-fade-in"
          style={{ animationDelay: "0.2s" }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Land your dream job with{" "}
            <span className="text-primary">AI-Powered</span> resumes.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Create, edit and download professional resumes with AI-powered
            assistance.
          </p>
        </div>

        {/* CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 animate-fade-in"
          style={{ animationDelay: "0.3s" }}
        >
          <SignedOut>
            <SignUpButton mode="modal">
              <Button
                size="lg"
                className="text-base px-8 shadow-medium hover:shadow-lg transition-all cursor-pointer"
              >
                Get started
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <Link to={"/dashboard"}>
              <Button
                size="lg"
                className="text-base px-8 shadow-medium hover:shadow-lg transition-all cursor-pointer"
              >
                Go to Dashboard
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </SignedIn>
        </div>

        {/* Tech Stack Marquee */}
        <div
          className="animate-fade-in overflow-hidden"
          style={{ animationDelay: "0.4s" }}
        >
          <p className="text-center text-sm text-muted-foreground mb-6">
            Built with modern technologies
          </p>
          <div className="relative w-full overflow-hidden">
            <div className="flex animate-scroll-left">
              {/* First set of tech badges */}
              {[...techStack, ...techStack].map((tech, index) => (
                <Badge
                  key={`${tech.name}-${index}`}
                  variant="outline"
                  className="mx-4 px-6 py-3 text-base font-medium whitespace-nowrap border-border/50 bg-card/50 hover:bg-card hover:border-primary/30 transition-all shrink-0"
                >
                  <span className="mr-2 text-xl">{tech.icon}</span>
                  {tech.name}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
