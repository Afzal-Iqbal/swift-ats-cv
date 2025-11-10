import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Sparkles, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { optimizeResumeWithAI, OptimizationSuggestion } from "@/utils/geminiAI";
import { ResumeData } from "@/types/resume";

interface AIOptimizerProps {
  resumeData: ResumeData;
}

export const AIOptimizer = ({ resumeData }: AIOptimizerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [jobDescription, setJobDescription] = useState("");
  const [suggestions, setSuggestions] = useState<OptimizationSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const generateResumeText = () => {
    let text = `${resumeData.contactInfo.fullName}\n\n`;
    
    if (resumeData.summary) {
      text += `SUMMARY\n${resumeData.summary}\n\n`;
    }
    
    if (resumeData.workExperience.length > 0) {
      text += `WORK EXPERIENCE\n`;
      resumeData.workExperience.forEach(exp => {
        text += `${exp.role} — ${exp.company}\n`;
        text += `${exp.location} | ${exp.startDate} – ${exp.current ? 'Present' : exp.endDate}\n`;
        exp.responsibilities.forEach(resp => {
          if (resp.trim()) text += `• ${resp}\n`;
        });
        text += `\n`;
      });
    }
    
    if (resumeData.skills.length > 0) {
      text += `SKILLS\n${resumeData.skills.join(', ')}\n\n`;
    }
    
    return text;
  };

  const handleOptimize = async () => {
    setIsLoading(true);
    setSuggestions([]);
    
    try {
      const resumeText = generateResumeText();
      const results = await optimizeResumeWithAI(resumeText, jobDescription || undefined);
      setSuggestions(results);
      toast.success("AI optimization complete!");
    } catch (error) {
      console.error("Optimization error:", error);
      toast.error("Failed to optimize resume. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full" variant="default">
          <Sparkles className="mr-2 h-4 w-4" />
          Optimize with AI
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>AI-Powered ATS Optimization</DialogTitle>
          <DialogDescription>
            Get keyword suggestions and improvements to make your resume more ATS-friendly.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 mt-4">
          <div>
            <label className="text-sm font-medium mb-2 block">
              Job Description (Optional)
            </label>
            <Textarea
              placeholder="Paste the job description here to get targeted keyword suggestions..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              rows={6}
              className="resize-none"
            />
          </div>
          
          <Button 
            onClick={handleOptimize} 
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Suggestions
              </>
            )}
          </Button>

          {suggestions.length > 0 && (
            <div className="space-y-4 mt-6">
              <h3 className="font-semibold text-lg">Optimization Suggestions</h3>
              {suggestions.map((suggestion, idx) => (
                <Card key={idx} className="p-4 border-border">
                  <div className="space-y-2">
                    <div className="font-medium text-sm text-primary">
                      {suggestion.section}
                    </div>
                    <div className="text-sm">
                      <span className="text-muted-foreground">Original:</span>
                      <p className="mt-1 p-2 bg-muted/50 rounded text-xs line-through">
                        {suggestion.original}
                      </p>
                    </div>
                    <div className="text-sm">
                      <span className="text-green-600 font-medium">Improved:</span>
                      <p className="mt-1 p-2 bg-green-50 dark:bg-green-950/20 rounded text-xs">
                        {suggestion.improved}
                      </p>
                    </div>
                    <div className="text-xs text-muted-foreground italic">
                      💡 {suggestion.reason}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
