import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useFirestore } from "@/hooks/useFirestore";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ContactInfoForm } from "@/components/ResumeBuilder/ContactInfoForm";
import { SummaryForm } from "@/components/ResumeBuilder/SummaryForm";
import { WorkExperienceForm } from "@/components/ResumeBuilder/WorkExperienceForm";
import { EducationForm } from "@/components/ResumeBuilder/EducationForm";
import { SkillsForm } from "@/components/ResumeBuilder/SkillsForm";
import { ProfessionalTemplate } from "@/components/ResumePreview/ProfessionalTemplate";
import { ModernTemplate } from "@/components/ResumePreview/ModernTemplate";
import { ATSTemplate } from "@/components/ResumePreview/ATSTemplate";
import { AIOptimizer } from "@/components/AIOptimizer";
import { ResumeData, ResumeTemplate } from "@/types/resume";
import { Download, FileText, LogOut, Moon, Sun } from "lucide-react";
import { toast } from "sonner";
import html2pdf from "html2pdf.js";

const Index = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { resumes, createResume, updateResume } = useFirestore();
  
  const [activeTab, setActiveTab] = useState("contact");
  const [template, setTemplate] = useState<ResumeTemplate>("professional");
  const [currentResumeId, setCurrentResumeId] = useState<string | null>(null);
  const [resumeData, setResumeData] = useState<ResumeData>({
    contactInfo: {
      fullName: "",
      email: "",
      phone: "",
      linkedin: "",
      location: "",
    },
    summary: "",
    workExperience: [],
    education: [],
    skills: [],
    certifications: [],
    languages: [],
  });

  // Load first resume or create new one
  useEffect(() => {
    if (resumes.length > 0 && !currentResumeId) {
      const firstResume = resumes[0];
      setCurrentResumeId(firstResume.id);
      
      // Ensure all work experience entries have location field
      const updatedData = {
        ...firstResume.data,
        workExperience: firstResume.data.workExperience.map(exp => ({
          ...exp,
          location: exp.location || ""
        }))
      };
      
      setResumeData(updatedData);
    } else if (resumes.length === 0 && user && !currentResumeId) {
      // Create initial resume
      createResume("My Resume", resumeData).then((id) => {
        setCurrentResumeId(id);
      });
    }
  }, [resumes, user, currentResumeId]);

  // Auto-save to Firestore with debouncing
  useEffect(() => {
    if (!currentResumeId) return;

    const timeoutId = setTimeout(() => {
      updateResume(currentResumeId, resumeData);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [resumeData, currentResumeId]);

  const handleDownloadPDF = () => {
    const element = document.getElementById('resume-preview');
    const templateName = template === 'ats' ? 'ATS' : template === 'modern' ? 'Modern' : 'Professional';
    const fileName = resumeData.contactInfo.fullName 
      ? `${resumeData.contactInfo.fullName.replace(/\s+/g, '_')}_Resume_${templateName}.pdf`
      : `Resume_${templateName}.pdf`;
    
    const opt = {
      margin: 0,
      filename: fileName,
      image: { type: 'jpeg' as const, quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' as const }
    };

    toast.promise(
      html2pdf().set(opt).from(element).save(),
      {
        loading: 'Generating PDF...',
        success: 'PDF downloaded successfully!',
        error: 'Failed to generate PDF. Please try again.',
      }
    );
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="bg-gradient-hero text-primary-foreground shadow-medium sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="h-8 w-8" />
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">CV Resume Builder</h1>
                <p className="text-sm opacity-90">{user?.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="text-primary-foreground hover:bg-primary-foreground/10"
              >
                {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              </Button>
              <Button
                onClick={handleDownloadPDF}
                className="bg-card text-foreground hover:bg-card/90 shadow-soft"
              >
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </Button>
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="text-primary-foreground hover:bg-primary-foreground/10"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form Section */}
          <div className="space-y-6 animate-fade-in">
            <Card className="p-6 shadow-medium border-border">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Build Your Resume</h2>
                <div className="w-48">
                  <Select value={template} onValueChange={(value: ResumeTemplate) => setTemplate(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select template" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="modern">Modern</SelectItem>
                      <SelectItem value="ats">ATS-Optimized</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                <TabsList className="grid w-full grid-cols-5 h-auto">
                  <TabsTrigger value="contact" className="text-xs md:text-sm py-2">Contact</TabsTrigger>
                  <TabsTrigger value="summary" className="text-xs md:text-sm py-2">Summary</TabsTrigger>
                  <TabsTrigger value="experience" className="text-xs md:text-sm py-2">Experience</TabsTrigger>
                  <TabsTrigger value="education" className="text-xs md:text-sm py-2">Education</TabsTrigger>
                  <TabsTrigger value="skills" className="text-xs md:text-sm py-2">Skills</TabsTrigger>
                </TabsList>

                <TabsContent value="contact" className="space-y-4">
                  <ContactInfoForm
                    data={resumeData.contactInfo}
                    onChange={(contactInfo) =>
                      setResumeData({ ...resumeData, contactInfo })
                    }
                  />
                </TabsContent>

                <TabsContent value="summary" className="space-y-4">
                  <SummaryForm
                    data={resumeData.summary}
                    onChange={(summary) => setResumeData({ ...resumeData, summary })}
                  />
                </TabsContent>

                <TabsContent value="experience" className="space-y-4">
                  <WorkExperienceForm
                    data={resumeData.workExperience}
                    onChange={(workExperience) =>
                      setResumeData({ ...resumeData, workExperience })
                    }
                  />
                </TabsContent>

                <TabsContent value="education" className="space-y-4">
                  <EducationForm
                    data={resumeData.education}
                    onChange={(education) => setResumeData({ ...resumeData, education })}
                  />
                </TabsContent>

                <TabsContent value="skills" className="space-y-4">
                  <SkillsForm
                    skills={resumeData.skills}
                    certifications={resumeData.certifications}
                    languages={resumeData.languages}
                    onSkillsChange={(skills) => setResumeData({ ...resumeData, skills })}
                    onCertificationsChange={(certifications) =>
                      setResumeData({ ...resumeData, certifications })
                    }
                    onLanguagesChange={(languages) =>
                      setResumeData({ ...resumeData, languages })
                    }
                  />
                </TabsContent>
              </Tabs>
            </Card>

            {/* AI Optimizer */}
            <Card className="p-6 shadow-medium border-border">
              <h3 className="text-lg font-semibold mb-3">AI-Powered Optimization</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Get intelligent suggestions to improve your resume's ATS compatibility and keyword optimization.
              </p>
              <AIOptimizer resumeData={resumeData} />
            </Card>
          </div>

          {/* Preview Section */}
          <div className="lg:sticky lg:top-24 h-fit animate-slide-in-right">
            <Card className="shadow-medium border-border overflow-hidden">
              <div className="bg-muted px-6 py-4 border-b border-border">
                <h2 className="text-xl font-bold">Live Preview</h2>
                <p className="text-sm text-muted-foreground">
                  {template === 'ats' 
                    ? 'ATS-Optimized: Single-column, no styling' 
                    : template === 'modern'
                    ? 'Modern: Colorful & professional'
                    : 'Professional: Clean & classic'}
                </p>
              </div>
              <div className="p-6 bg-muted/30 overflow-y-auto" style={{ maxHeight: "calc(100vh - 200px)" }}>
                <div className="bg-white shadow-lg" id="resume-preview">
                  {template === "professional" ? (
                    <ProfessionalTemplate data={resumeData} />
                  ) : template === "modern" ? (
                    <ModernTemplate data={resumeData} />
                  ) : (
                    <ATSTemplate data={resumeData} />
                  )}
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* ATS Tips Section */}
        <Card className="mt-8 p-6 shadow-medium border-border animate-fade-in">
          <h3 className="text-xl font-bold mb-4">📋 ATS Optimization Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
              <h4 className="font-semibold mb-2 text-accent">✓ Standard Section Titles</h4>
              <p className="text-sm text-muted-foreground">
                Use "Work Experience" or "Professional Experience" - avoid creative alternatives
              </p>
            </div>
            <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
              <h4 className="font-semibold mb-2 text-accent">✓ No Tables or Columns</h4>
              <p className="text-sm text-muted-foreground">
                Avoid tables, columns, or graphics - use single-column layout for ATS
              </p>
            </div>
            <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
              <h4 className="font-semibold mb-2 text-accent">✓ Use Keywords</h4>
              <p className="text-sm text-muted-foreground">
                Include terms from job descriptions: React, Firebase, ATS, authentication
              </p>
            </div>
            <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
              <h4 className="font-semibold mb-2 text-accent">✓ Action Verbs</h4>
              <p className="text-sm text-muted-foreground">
                Start bullets with: Developed, Led, Improved, Built, Integrated
              </p>
            </div>
            <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
              <h4 className="font-semibold mb-2 text-accent">✓ Include Metrics</h4>
              <p className="text-sm text-muted-foreground">
                Add % improvements, user growth, performance gains whenever possible
              </p>
            </div>
            <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
              <h4 className="font-semibold mb-2 text-accent">✓ Bullet Point Structure</h4>
              <p className="text-sm text-muted-foreground">
                Action verb + responsibility/achievement + tools/metrics used
              </p>
            </div>
          </div>
          
          <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
            <h4 className="font-semibold mb-2">💡 Example Bullet Point Format:</h4>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• <strong>Action verb + responsibility + tools/skills:</strong> "Developed responsive web applications using React and TypeScript"</li>
              <li>• <strong>Action verb + achievement + measurable outcome:</strong> "Led migration to Firebase, reducing database costs by 35%"</li>
              <li>• <strong>Action verb + what you learned/improved:</strong> "Improved code quality by implementing automated testing with Jest"</li>
            </ul>
          </div>
        </Card>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-12 py-6">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p className="text-sm">
            Built for ATS compliance • Auto-save to Firebase • 3 Professional templates
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
