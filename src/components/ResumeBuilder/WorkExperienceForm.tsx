import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { WorkExperience } from "@/types/resume";
import { Plus, Trash2 } from "lucide-react";

interface WorkExperienceFormProps {
  data: WorkExperience[];
  onChange: (data: WorkExperience[]) => void;
}

export const WorkExperienceForm = ({ data, onChange }: WorkExperienceFormProps) => {
  const addExperience = () => {
    onChange([
      ...data,
      {
        id: Date.now().toString(),
        company: "",
        role: "",
        startDate: "",
        endDate: "",
        current: false,
        responsibilities: [""],
      },
    ]);
  };

  const updateExperience = (id: string, field: keyof WorkExperience, value: any) => {
    onChange(
      data.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp))
    );
  };

  const removeExperience = (id: string) => {
    onChange(data.filter((exp) => exp.id !== id));
  };

  const addResponsibility = (id: string) => {
    const exp = data.find((e) => e.id === id);
    if (exp) {
      updateExperience(id, "responsibilities", [...exp.responsibilities, ""]);
    }
  };

  const updateResponsibility = (id: string, index: number, value: string) => {
    const exp = data.find((e) => e.id === id);
    if (exp) {
      const newResponsibilities = [...exp.responsibilities];
      newResponsibilities[index] = value;
      updateExperience(id, "responsibilities", newResponsibilities);
    }
  };

  const removeResponsibility = (id: string, index: number) => {
    const exp = data.find((e) => e.id === id);
    if (exp && exp.responsibilities.length > 1) {
      updateExperience(
        id,
        "responsibilities",
        exp.responsibilities.filter((_, i) => i !== index)
      );
    }
  };

  return (
    <Card className="border-border shadow-soft">
      <CardHeader>
        <CardTitle className="text-xl">Work Experience</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {data.map((exp) => (
          <div key={exp.id} className="p-4 border border-border rounded-lg space-y-4">
            <div className="flex justify-between items-start">
              <div className="space-y-4 flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Job Title *</Label>
                    <Input
                      value={exp.role}
                      onChange={(e) => updateExperience(exp.id, "role", e.target.value)}
                      placeholder="Software Engineer"
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label>Company *</Label>
                    <Input
                      value={exp.company}
                      onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                      placeholder="Tech Corp"
                      className="mt-1.5"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Start Date *</Label>
                    <Input
                      type="month"
                      value={exp.startDate}
                      onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label>End Date</Label>
                    <Input
                      type="month"
                      value={exp.endDate}
                      onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
                      disabled={exp.current}
                      className="mt-1.5"
                    />
                    <div className="flex items-center space-x-2 mt-2">
                      <Checkbox
                        id={`current-${exp.id}`}
                        checked={exp.current}
                        onCheckedChange={(checked) =>
                          updateExperience(exp.id, "current", checked)
                        }
                      />
                      <Label htmlFor={`current-${exp.id}`} className="text-sm font-normal">
                        Currently working here
                      </Label>
                    </div>
                  </div>
                </div>

                <div>
                  <Label>Key Responsibilities</Label>
                  <div className="space-y-2 mt-1.5">
                    {exp.responsibilities.map((resp, index) => (
                      <div key={index} className="flex gap-2">
                        <Textarea
                          value={resp}
                          onChange={(e) => updateResponsibility(exp.id, index, e.target.value)}
                          placeholder="• Developed and maintained web applications..."
                          className="resize-none"
                          rows={2}
                        />
                        {exp.responsibilities.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeResponsibility(exp.id, index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addResponsibility(exp.id)}
                      className="w-full"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add Responsibility
                    </Button>
                  </div>
                </div>
              </div>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeExperience(exp.id)}
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
          onClick={addExperience}
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Work Experience
        </Button>
      </CardContent>
    </Card>
  );
};
