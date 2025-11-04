"use client";

import React, { useState, useEffect } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import {
  ChevronLeft,
  ChevronRight,
  Save,
  ArrowLeft,
  Download,
} from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "../ui/select";
import { useNavigate } from "react-router-dom";
import { ModeToggle } from "../common/mode-toggle";


// Sections
const SECTIONS = [
  "Personal Information",
  "Professional Summary",
  "Work Experience",
  "Education",
  "Skills",
  "Projects",
];

const ResumeBuilder = ({ resumeId, templateId }) => {
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState(0);

  const [accentColor, setAccentColor] = useState(
    localStorage.getItem("accentColor") || "blue"
  );
  const [selectedTemplate, setSelectedTemplate] = useState(
    localStorage.getItem("selectedTemplate") || "classic"
  );

  const [resumeTitle, setResumeTitle] = useState("Untitled Resume");

  const [resumeData, setResumeData] = useState({
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      portfolio: "",
    },
    summary: "",
    experience: [],
    education: [],
    skills: [],
    projects: [],
  });

  const updateResume = useMutation(api.resume.update);

  // Auto-save (every 2s)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (resumeId) handleSave();
    }, 2000);
    return () => clearTimeout(timer);
  }, [resumeData, resumeTitle]);

  const handleSave = async () => {
    try {
      await updateResume({
        id: resumeId,
        title: resumeTitle,
        content: JSON.stringify(resumeData),
      });
    } catch (error) {
      console.error("Failed to save:", error);
    }
  };

  // Store accent color and template locally
  useEffect(() => {
    localStorage.setItem("accentColor", accentColor);
    localStorage.setItem("selectedTemplate", selectedTemplate);
  }, [accentColor, selectedTemplate]);

  // ===================
  // RENDER SECTIONS (unchanged)
  // ===================
  const renderSection = () => {
    switch (currentSection) {
      case 0:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground">
              Personal Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Full Name</Label>
                <Input
                  value={resumeData.personalInfo.fullName}
                  onChange={(e) =>
                    setResumeData((prev) => ({
                      ...prev,
                      personalInfo: {
                        ...prev.personalInfo,
                        fullName: e.target.value,
                      },
                    }))
                  }
                  placeholder="John Doe"
                />
              </div>
              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  value={resumeData.personalInfo.email}
                  onChange={(e) =>
                    setResumeData((prev) => ({
                      ...prev,
                      personalInfo: {
                        ...prev.personalInfo,
                        email: e.target.value,
                      },
                    }))
                  }
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <Label>Phone</Label>
                <Input
                  value={resumeData.personalInfo.phone}
                  onChange={(e) =>
                    setResumeData((prev) => ({
                      ...prev,
                      personalInfo: {
                        ...prev.personalInfo,
                        phone: e.target.value,
                      },
                    }))
                  }
                  placeholder="+1 234 567 8900"
                />
              </div>
              <div>
                <Label>Location</Label>
                <Input
                  value={resumeData.personalInfo.location}
                  onChange={(e) =>
                    setResumeData((prev) => ({
                      ...prev,
                      personalInfo: {
                        ...prev.personalInfo,
                        location: e.target.value,
                      },
                    }))
                  }
                  placeholder="San Francisco, CA"
                />
              </div>
              <div>
                <Label>LinkedIn</Label>
                <Input
                  value={resumeData.personalInfo.linkedin}
                  onChange={(e) =>
                    setResumeData((prev) => ({
                      ...prev,
                      personalInfo: {
                        ...prev.personalInfo,
                        linkedin: e.target.value,
                      },
                    }))
                  }
                  placeholder="linkedin.com/in/johndoe"
                />
              </div>
              <div>
                <Label>Portfolio</Label>
                <Input
                  value={resumeData.personalInfo.portfolio}
                  onChange={(e) =>
                    setResumeData((prev) => ({
                      ...prev,
                      personalInfo: {
                        ...prev.personalInfo,
                        portfolio: e.target.value,
                      },
                    }))
                  }
                  placeholder="johndoe.com"
                />
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Professional Summary</h3>
            <Textarea
              value={resumeData.summary}
              onChange={(e) =>
                setResumeData((prev) => ({ ...prev, summary: e.target.value }))
              }
              rows={6}
              placeholder="Write a short summary about your experience and skills..."
            />
          </div>
        );

      default:
        return (
          <div className="text-muted-foreground">
            Section “{SECTIONS[currentSection]}” coming soon.
          </div>
        );
    }
  };

  // ===================
  // MAIN RETURN
  // ===================
  return (
    <div className="flex flex-col h-screen">
      {/* =================== Navbar =================== */}
      <header className="border-b bg-background flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <Input
            value={resumeTitle}
            onChange={(e) => setResumeTitle(e.target.value)}
            className="text-lg font-semibold border-none focus-visible:ring-0 w-64"
          />
        </div>

        <div className="flex items-center gap-4">
          {/* Accent color dropdown */}
          <Select
            value={accentColor}
            onValueChange={setAccentColor}
          >
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Accent Color" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="blue">Blue</SelectItem>
              <SelectItem value="green">Green</SelectItem>
              <SelectItem value="purple">Purple</SelectItem>
              <SelectItem value="rose">Rose</SelectItem>
              <SelectItem value="amber">Amber</SelectItem>
            </SelectContent>
          </Select>

          {/* Template dropdown */}
          <Select
            value={selectedTemplate}
            onValueChange={setSelectedTemplate}
          >
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Template" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="classic">Classic</SelectItem>
              <SelectItem value="modern">Modern</SelectItem>
              <SelectItem value="minimal">Minimal</SelectItem>
            </SelectContent>
          </Select>

          {/* Mode toggle and Export */}
          <ModeToggle/>
          <Button variant="default" size="sm">
            <Download className="w-4 h-4 mr-1" /> Export
          </Button>
        </div>
      </header>

      {/* =================== Builder Layout =================== */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left - Form */}
        <div className="w-[45%] border-r overflow-y-auto p-8">
          <div className="max-w-md mx-auto space-y-8">
            {/* Progress Bar */}
            <div>
              <div className="flex justify-between text-xs mb-2 text-muted-foreground">
                {SECTIONS.map((_, i) => (
                  <span
                    key={i}
                    className={`${i === currentSection ? "text-primary font-semibold" : ""
                      }`}
                  >
                    {i + 1}
                  </span>
                ))}
              </div>
              <div className="h-2 bg-secondary rounded-full">
                <div
                  className={`h-2 bg-${accentColor}-500 rounded-full transition-all`}
                  style={{
                    width: `${((currentSection + 1) / SECTIONS.length) * 100}%`,
                  }}
                />
              </div>
            </div>

            {renderSection()}

            {/* Navigation */}
            <div className="flex justify-between pt-4">
              <Button
                variant="outline"
                onClick={() =>
                  setCurrentSection((prev) => Math.max(0, prev - 1))
                }
                disabled={currentSection === 0}
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back
              </Button>

              {currentSection < SECTIONS.length - 1 ? (
                <Button
                  onClick={() =>
                    setCurrentSection((prev) =>
                      Math.min(SECTIONS.length - 1, prev + 1)
                    )
                  }
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              ) : (
                <Button onClick={handleSave}>
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Right - Preview */}
        <div className="w-[55%] bg-muted/30 p-8 overflow-y-auto">
          <div className="max-w-3xl mx-auto bg-background shadow-sm rounded-xl p-8">
            <ResumePreview
              data={resumeData}
              accentColor={accentColor}
              template={selectedTemplate}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// =================== PREVIEW ===================
const ResumePreview = ({ data, accentColor, template }) => {
  return (
    <div>
      <h1 className={`text-4xl font-bold text-${accentColor}-600`}>
        {data.personalInfo.fullName || "Your Name"}
      </h1>
      <p className="text-gray-500 text-sm mt-1">
        {data.personalInfo.email} | {data.personalInfo.phone} |{" "}
        {data.personalInfo.location}
      </p>
      {data.summary && (
        <div className="mt-6">
          <h2 className={`text-xl font-semibold text-${accentColor}-600`}>
            Professional Summary
          </h2>
          <p className="text-gray-700 mt-2">{data.summary}</p>
        </div>
      )}
      {/* You can add per-template custom render logic here */}
    </div>
  );
};

export default ResumeBuilder;
