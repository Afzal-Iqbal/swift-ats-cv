import { useState } from "react";
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
import { ResumeData, ResumeTemplate } from "@/types/resume";
import { Download, FileText } from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  const [activeTab, setActiveTab] = useState("contact");
  const [template, setTemplate] = useState<ResumeTemplate>("professional");
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

  const handleDownloadPDF = () => {
    toast.info("PDF download feature coming soon! For now, use your browser's print function (Ctrl/Cmd + P) and save as PDF.");
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="bg-gradient-hero text-white shadow-medium sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="h-8 w-8" />
              <h1 className="text-2xl md:text-3xl font-bold">ATS CV Resume Builder</h1>
            </div>
            <Button
              onClick={handleDownloadPDF}
              className="bg-white text-primary hover:bg-white/90 shadow-soft"
            >
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
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
          </div>

          {/* Preview Section */}
          <div className="lg:sticky lg:top-24 h-fit animate-slide-in-right">
            <Card className="shadow-medium border-border overflow-hidden">
              <div className="bg-muted px-6 py-4 border-b border-border">
                <h2 className="text-xl font-bold">Live Preview</h2>
                <p className="text-sm text-muted-foreground">
                  Your resume updates in real-time
                </p>
              </div>
              <div className="p-6 bg-muted/30 overflow-y-auto" style={{ maxHeight: "calc(100vh - 200px)" }}>
                <div className="bg-white shadow-lg" id="resume-preview">
                  {template === "professional" ? (
                    <ProfessionalTemplate data={resumeData} />
                  ) : (
                    <ModernTemplate data={resumeData} />
                  )}
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* ATS Tips Section */}
        <Card className="mt-8 p-6 shadow-medium border-border animate-fade-in">
          <h3 className="text-xl font-bold mb-4">ATS Optimization Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
              <h4 className="font-semibold mb-2 text-accent">✓ Use Standard Fonts</h4>
              <p className="text-sm text-muted-foreground">
                Arial, Calibri, and Times New Roman are ATS-friendly
              </p>
            </div>
            <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
              <h4 className="font-semibold mb-2 text-accent">✓ Include Keywords</h4>
              <p className="text-sm text-muted-foreground">
                Match job description terms in your experience and skills
              </p>
            </div>
            <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
              <h4 className="font-semibold mb-2 text-accent">✓ Clean Formatting</h4>
              <p className="text-sm text-muted-foreground">
                No tables, columns, or graphics - just clean text
              </p>
            </div>
          </div>
        </Card>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-12 py-6">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p className="text-sm">
            Built for ATS compliance • Export to PDF • Multiple templates
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
