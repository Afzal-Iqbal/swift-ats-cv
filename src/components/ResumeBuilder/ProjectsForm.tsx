import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Project } from "@/types/resume";
import { Plus, Trash2 } from "lucide-react";

interface ProjectsFormProps {
  data: Project[];
  onChange: (data: Project[]) => void;
}

export const ProjectsForm = ({ data, onChange }: ProjectsFormProps) => {
  const projects = data || [];
  
  const addProject = () => {
    onChange([
      ...projects,
      {
        id: Date.now().toString(),
        name: "",
        description: "",
        technologies: "",
        link: "",
      },
    ]);
  };

  const updateProject = (id: string, field: keyof Project, value: any) => {
    onChange(
      projects.map((project) => (project.id === id ? { ...project, [field]: value } : project))
    );
  };

  const removeProject = (id: string) => {
    onChange(projects.filter((project) => project.id !== id));
  };

  return (
    <Card className="border-border shadow-soft">
      <CardHeader>
        <CardTitle className="text-xl">Projects</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {projects.map((project) => (
          <div key={project.id} className="p-4 border border-border rounded-lg space-y-4">
            <div className="flex justify-between items-start">
              <div className="space-y-4 flex-1">
                <div>
                  <Label>Project Name *</Label>
                  <Input
                    value={project.name}
                    onChange={(e) => updateProject(project.id, "name", e.target.value)}
                    placeholder="E-Commerce Platform"
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label>Description *</Label>
                  <p className="text-xs text-muted-foreground mt-1 mb-2">
                    Describe what you built, technologies used, and measurable results/metrics
                  </p>
                  <Textarea
                    value={project.description}
                    onChange={(e) => updateProject(project.id, "description", e.target.value)}
                    placeholder="Developed an online store with 500+ product listings, integrated Stripe/PayPal payments, and enabled an admin dashboard, supporting 1,000+ monthly transactions"
                    className="resize-none"
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Technologies Used</Label>
                    <Input
                      value={project.technologies || ""}
                      onChange={(e) => updateProject(project.id, "technologies", e.target.value)}
                      placeholder="React, Node.js, MongoDB"
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label>Project Link (Optional)</Label>
                    <Input
                      value={project.link || ""}
                      onChange={(e) => updateProject(project.id, "link", e.target.value)}
                      placeholder="https://github.com/username/project"
                      type="url"
                      className="mt-1.5"
                    />
                  </div>
                </div>
              </div>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeProject(project.id)}
                className="ml-2"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          onClick={addProject}
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Project
        </Button>
      </CardContent>
    </Card>
  );
};
