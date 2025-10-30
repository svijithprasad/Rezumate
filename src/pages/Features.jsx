import { Sparkles, FileText, Download, Zap } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/common/Navbar";

const Features = () => {
  const features = [
    {
      icon: Sparkles,
      title: "AI-Powered Writing",
      description: "Let our AI help you craft compelling resume content that stands out to employers.",
    },
    {
      icon: FileText,
      title: "Professional Templates",
      description: "Choose from dozens of ATS-friendly templates designed by career experts.",
    },
    {
      icon: Download,
      title: "Easy Export",
      description: "Download your resume in PDF, Word, or other formats with one click.",
    },
    {
      icon: Zap,
      title: "Quick & Simple",
      description: "Create a professional resume in minutes, not hours. No design skills needed.",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-background to-secondary/30">
      <Navbar />
      <main className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Powerful Features for <span className="text-primary">Your Success</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to create the perfect resume and land your dream job.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="border-border/50 hover:border-primary/30 transition-all hover:shadow-medium group overflow-hidden"
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <Badge variant="secondary" className="text-xs">Featured</Badge>
                  </div>
                  <CardTitle className="text-xl mt-4">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Features;
