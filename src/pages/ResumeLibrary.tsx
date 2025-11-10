import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useFirestore } from "@/hooks/useFirestore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { FileText, Plus, Trash2, Edit3, Copy, Moon, Sun, LogOut, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { ResumeData } from "@/types/resume";

const ResumeLibrary = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { resumes, loading, createResume, deleteResume } = useFirestore();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [resumeToDelete, setResumeToDelete] = useState<string | null>(null);

  const handleCreateNew = async () => {
    try {
      const newResumeData: ResumeData = {
        contactInfo: {
          fullName: "",
          email: user?.email || "",
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
        additionalItems: [],
      };

      const newId = await createResume("New Resume", newResumeData);
      navigate(`/?resumeId=${newId}`);
    } catch (error) {
      console.error("Error creating resume:", error);
      toast.error("Failed to create resume");
    }
  };

  const handleDuplicate = async (resumeId: string) => {
    const resume = resumes.find((r) => r.id === resumeId);
    if (!resume) return;

    try {
      const newId = await createResume(`${resume.resumeTitle} (Copy)`, resume.data);
      toast.success("Resume duplicated successfully!");
      navigate(`/?resumeId=${newId}`);
    } catch (error) {
      console.error("Error duplicating resume:", error);
      toast.error("Failed to duplicate resume");
    }
  };

  const handleDelete = async () => {
    if (!resumeToDelete) return;

    try {
      await deleteResume(resumeToDelete);
      setDeleteDialogOpen(false);
      setResumeToDelete(null);
    } catch (error) {
      console.error("Error deleting resume:", error);
    }
  };

  const handleEdit = (resumeId: string) => {
    navigate(`/?resumeId=${resumeId}`);
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return "Unknown";
    try {
      return new Date(timestamp.seconds * 1000).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return "Unknown";
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/auth");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="bg-gradient-hero shadow-large sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/")}
                className="text-primary-foreground hover:bg-primary-foreground/10"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <FileText className="h-7 w-7 text-primary-foreground" />
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-primary-foreground">
                  My Resumes
                </h1>
                <p className="text-xs text-primary-foreground/80 hidden sm:block">
                  {user?.email}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="text-primary-foreground hover:bg-primary-foreground/10"
              >
                {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              </Button>
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="text-primary-foreground hover:bg-primary-foreground/10"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">Your Resume Collection</h2>
            <p className="text-muted-foreground">
              Manage and organize all your professional resumes
            </p>
          </div>
          <Button
            onClick={handleCreateNew}
            size="lg"
            className="bg-primary hover:bg-primary/90 shadow-medium"
          >
            <Plus className="mr-2 h-5 w-5" />
            Create New Resume
          </Button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader className="h-32 bg-muted" />
                <CardContent className="h-24" />
              </Card>
            ))}
          </div>
        ) : resumes.length === 0 ? (
          <Card className="p-12 text-center bg-gradient-card shadow-medium">
            <FileText className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">No Resumes Yet</h3>
            <p className="text-muted-foreground mb-6">
              Get started by creating your first professional resume
            </p>
            <Button onClick={handleCreateNew} size="lg">
              <Plus className="mr-2 h-5 w-5" />
              Create Your First Resume
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumes.map((resume) => (
              <Card
                key={resume.id}
                className="group hover:shadow-large transition-all duration-300 bg-gradient-card border-border overflow-hidden"
              >
                <CardHeader className="bg-gradient-hero p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-primary-foreground mb-1 line-clamp-1">
                        {resume.resumeTitle}
                      </h3>
                      <p className="text-sm text-primary-foreground/80">
                        Updated {formatDate(resume.updatedAt)}
                      </p>
                    </div>
                    <FileText className="h-8 w-8 text-primary-foreground/60" />
                  </div>
                </CardHeader>

                <CardContent className="p-6 space-y-3">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-muted-foreground">Experience</p>
                      <p className="font-semibold">
                        {resume.data.workExperience.length} {resume.data.workExperience.length === 1 ? 'job' : 'jobs'}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Education</p>
                      <p className="font-semibold">
                        {resume.data.education.length} {resume.data.education.length === 1 ? 'degree' : 'degrees'}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Skills</p>
                      <p className="font-semibold">{resume.data.skills.length}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Completeness</p>
                      <p className="font-semibold text-accent">
                        {resume.data.contactInfo.fullName &&
                        resume.data.summary &&
                        resume.data.workExperience.length > 0
                          ? "Complete"
                          : "Draft"}
                      </p>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="p-4 bg-muted/30 border-t border-border flex gap-2">
                  <Button
                    onClick={() => handleEdit(resume.id)}
                    className="flex-1"
                    variant="default"
                  >
                    <Edit3 className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDuplicate(resume.id)}
                    variant="outline"
                    size="icon"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={() => {
                      setResumeToDelete(resume.id);
                      setDeleteDialogOpen(true);
                    }}
                    variant="outline"
                    size="icon"
                    className="hover:bg-destructive/10 hover:text-destructive hover:border-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </main>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Resume?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your resume from
              our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setResumeToDelete(null)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ResumeLibrary;
