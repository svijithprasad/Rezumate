import Hero from "@/components/common/Hero";
import Navbar from "@/components/common/Navbar";


const Landing = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Floating gradient blur orb */}
      <div 
        className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float pointer-events-none -z-10"
        style={{
          background: "radial-gradient(circle, hsl(160 84% 39% / 0.3) 0%, hsl(160 84% 39% / 0.1) 50%, transparent 100%)",
        }}
      />
      {/* Secondary orb for depth */}
      <div 
        className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-primary/15 rounded-full blur-3xl animate-float pointer-events-none -z-10"
        style={{
          background: "radial-gradient(circle, hsl(150 60% 50% / 0.25) 0%, hsl(150 60% 50% / 0.08) 50%, transparent 100%)",
          animationDelay: "-10s",
          animationDuration: "25s",
        }}
      />
      
      <Navbar />
      <Hero />
    </div>
  );
};

export default Landing;
