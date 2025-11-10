import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useFirestore } from "@/hooks/useFirestore";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ContactInfoForm } from "@/components/ResumeBuilder/ContactInfoForm";
import { SummaryForm } from "@/components/ResumeBuilder/SummaryForm";
import { WorkExperienceForm } from "@/components/ResumeBuilder/WorkExperienceForm";
import { EducationForm } from "@/components/ResumeBuilder/EducationForm";
import { SkillsForm } from "@/components/ResumeBuilder/SkillsForm";
import { ProjectsForm } from "@/components/ResumeBuilder/ProjectsForm";
import { ProfessionalTemplate } from "@/components/ResumePreview/ProfessionalTemplate";
import { ModernTemplate } from "@/components/ResumePreview/ModernTemplate";
import { ATSTemplate } from "@/components/ResumePreview/ATSTemplate";
import { AIOptimizer } from "@/components/AIOptimizer";
import { ResumeData, ResumeTemplate } from "@/types/resume";
import { Download, FileText, LogOut, Moon, Sun, Menu, Eye, Edit3, FolderOpen } from "lucide-react";
import { toast } from "sonner";
import html2pdf from "html2pdf.js";

const Index = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { resumes, createResume, updateResume } = useFirestore();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const [activeTab, setActiveTab] = useState("contact");
  const [template, setTemplate] = useState<ResumeTemplate>("professional");
  const [currentResumeId, setCurrentResumeId] = useState<string | null>(null);
  const [mobileView, setMobileView] = useState<"edit" | "preview">("edit");
  const [resumeData, setResumeData] = useState<ResumeData>({
    contactInfo: {
      fullName: "",
      email: "",
      phone: "",
      linkedin: "",
      location: "",
      customLinks: [],
    },
    summary: "",
    workExperience: [],
    education: [],
    projects: [],
    skills: [],
    certifications: [],
    languages: [],
  });

  // Load resume from URL parameter or first resume
  useEffect(() => {
    const resumeIdFromUrl = searchParams.get("resumeId");
    
    if (resumeIdFromUrl && resumes.length > 0) {
      const resume = resumes.find(r => r.id === resumeIdFromUrl);
      if (resume) {
        setCurrentResumeId(resume.id);
        const updatedData = {
          ...resume.data,
          workExperience: resume.data.workExperience.map(exp => ({
            ...exp,
            location: exp.location || ""
          }))
        };
        setResumeData(updatedData);
        return;
      }
    }
    
    if (resumes.length > 0 && !currentResumeId) {
      const firstResume = resumes[0];
      setCurrentResumeId(firstResume.id);
      
      const updatedData = {
        ...firstResume.data,
        workExperience: firstResume.data.workExperience.map(exp => ({
          ...exp,
          location: exp.location || ""
        }))
      };
      
      setResumeData(updatedData);
    } else if (resumes.length === 0 && user && !currentResumeId) {
      createResume("My Resume", resumeData).then((id) => {
        setCurrentResumeId(id);
      });
    }
  }, [resumes, user, currentResumeId, searchParams]);

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
      navigate("/auth");
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="bg-gradient-hero shadow-large sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="h-7 w-7 text-primary-foreground" />
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-primary-foreground">
                  Resume Builder
                </h1>
                <p className="text-xs text-primary-foreground/80 hidden sm:block">
                  {user?.email}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {/* Mobile menu */}
              <Sheet>
                <SheetTrigger asChild className="lg:hidden">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-primary-foreground hover:bg-primary-foreground/10"
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-64">
                  <div className="flex flex-col gap-4 mt-8">
                    <Button
                      onClick={() => navigate("/library")}
                      variant="ghost"
                      className="w-full justify-start"
                    >
                      <FolderOpen className="h-5 w-5 mr-2" />
                      My Resumes
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={toggleTheme}
                      className="w-full justify-start"
                    >
                      {theme === 'light' ? <Moon className="h-5 w-5 mr-2" /> : <Sun className="h-5 w-5 mr-2" />}
                      {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                    </Button>
                    <Button
                      onClick={handleDownloadPDF}
                      className="w-full"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download PDF
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={handleLogout}
                      className="w-full"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>

              {/* Desktop actions */}
              <div className="hidden lg:flex items-center gap-2">
                <Button
                  onClick={() => navigate("/library")}
                  variant="ghost"
                  className="text-primary-foreground hover:bg-primary-foreground/10"
                >
                  <FolderOpen className="mr-2 h-4 w-4" />
                  My Resumes
                </Button>
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
                  className="bg-white/10 text-primary-foreground hover:bg-white/20 backdrop-blur-sm border border-white/20"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download
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
        </div>
      </header>

      {/* Mobile View Toggle */}
      <div className="lg:hidden sticky top-[72px] z-40 bg-card border-b border-border shadow-soft">
        <div className="container mx-auto px-4 py-3">
          <Tabs value={mobileView} onValueChange={(v) => setMobileView(v as "edit" | "preview")} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="edit" className="gap-2">
                <Edit3 className="h-4 w-4" />
                Edit
              </TabsTrigger>
              <TabsTrigger value="preview" className="gap-2">
                <Eye className="h-4 w-4" />
                Preview
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form Section - Hidden on mobile when preview is active */}
          <div className={`space-y-6 animate-fade-in ${mobileView === "preview" ? "hidden lg:block" : ""}`}>
            <Card className="p-4 lg:p-6 shadow-medium border-border bg-gradient-card">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <h2 className="text-xl lg:text-2xl font-bold">Build Your Resume</h2>
                <div className="w-full sm:w-48">
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
                <TabsList className="grid w-full grid-cols-6 h-auto">
                  <TabsTrigger value="contact" className="text-xs md:text-sm py-2">Contact</TabsTrigger>
                  <TabsTrigger value="summary" className="text-xs md:text-sm py-2">Summary</TabsTrigger>
                  <TabsTrigger value="experience" className="text-xs md:text-sm py-2">Work</TabsTrigger>
                  <TabsTrigger value="projects" className="text-xs md:text-sm py-2">Projects</TabsTrigger>
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

                <TabsContent value="projects" className="space-y-4">
                  <ProjectsForm
                    data={resumeData.projects}
                    onChange={(projects) => setResumeData({ ...resumeData, projects })}
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
            <Card className="p-4 lg:p-6 shadow-medium border-border bg-gradient-card">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <span className="text-2xl">✨</span>
                AI-Powered Optimization
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Get intelligent suggestions to improve your resume's ATS compatibility and keyword optimization.
              </p>
              <AIOptimizer resumeData={resumeData} />
            </Card>
          </div>

          {/* Preview Section - Hidden on mobile when edit is active */}
          <div className={`lg:sticky lg:top-24 h-fit animate-slide-in-right ${mobileView === "edit" ? "hidden lg:block" : ""}`}>
            <Card className="shadow-large border-border overflow-hidden bg-gradient-card">
              <div className="bg-muted/50 px-4 lg:px-6 py-4 border-b border-border backdrop-blur-sm">
                <h2 className="text-lg lg:text-xl font-bold">Live Preview</h2>
                <p className="text-xs lg:text-sm text-muted-foreground">
                  {template === 'ats' 
                    ? 'ATS-Optimized: Single-column, no styling' 
                    : template === 'modern'
                    ? 'Modern: Colorful & professional'
                    : 'Professional: Clean & classic'}
                </p>
              </div>
              <div className="p-4 lg:p-6 bg-muted/20 overflow-y-auto" style={{ maxHeight: "calc(100vh - 200px)" }}>
                <div className="bg-white shadow-large" id="resume-preview">
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
        <Card className="mt-8 p-4 lg:p-6 shadow-medium border-border animate-fade-in bg-gradient-card">
          <h3 className="text-lg lg:text-xl font-bold mb-4 flex items-center gap-2">
            <span className="text-2xl">📋</span>
            ATS Optimization Tips
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-accent/10 rounded-lg border border-accent/20 transition-all hover:shadow-soft hover:scale-105">
              <h4 className="font-semibold mb-2 text-accent">✓ Standard Section Titles</h4>
              <p className="text-sm text-muted-foreground">
                Use "Work Experience" or "Professional Experience" - avoid creative alternatives
              </p>
            </div>
            <div className="p-4 bg-accent/10 rounded-lg border border-accent/20 transition-all hover:shadow-soft hover:scale-105">
              <h4 className="font-semibold mb-2 text-accent">✓ No Tables or Columns</h4>
              <p className="text-sm text-muted-foreground">
                Avoid tables, columns, or graphics - use single-column layout for ATS
              </p>
            </div>
            <div className="p-4 bg-accent/10 rounded-lg border border-accent/20 transition-all hover:shadow-soft hover:scale-105">
              <h4 className="font-semibold mb-2 text-accent">✓ Use Keywords</h4>
              <p className="text-sm text-muted-foreground">
                Include terms from job descriptions: React, Firebase, ATS, authentication
              </p>
            </div>
            <div className="p-4 bg-accent/10 rounded-lg border border-accent/20 transition-all hover:shadow-soft hover:scale-105">
              <h4 className="font-semibold mb-2 text-accent">✓ Action Verbs</h4>
              <p className="text-sm text-muted-foreground">
                Start bullets with: Developed, Led, Improved, Built, Integrated
              </p>
            </div>
            <div className="p-4 bg-accent/10 rounded-lg border border-accent/20 transition-all hover:shadow-soft hover:scale-105">
              <h4 className="font-semibold mb-2 text-accent">✓ Include Metrics</h4>
              <p className="text-sm text-muted-foreground">
                Add % improvements, user growth, performance gains whenever possible
              </p>
            </div>
            <div className="p-4 bg-accent/10 rounded-lg border border-accent/20 transition-all hover:shadow-soft hover:scale-105">
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
