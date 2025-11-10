import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Education } from "@/types/resume";
import { Plus, Trash2 } from "lucide-react";

interface EducationFormProps {
  data: Education[];
  onChange: (data: Education[]) => void;
}

export const EducationForm = ({ data, onChange }: EducationFormProps) => {
  const addEducation = () => {
    onChange([
      ...data,
      {
        id: Date.now().toString(),
        degree: "",
        institution: "",
        startDate: "",
        endDate: "",
        current: false,
      },
    ]);
  };

  const updateEducation = (id: string, field: keyof Education, value: any) => {
    onChange(
      data.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu))
    );
  };

  const removeEducation = (id: string) => {
    onChange(data.filter((edu) => edu.id !== id));
  };

  return (
    <Card className="border-border shadow-soft">
      <CardHeader>
        <CardTitle className="text-xl">Education</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {data.map((edu) => (
          <div key={edu.id} className="p-4 border border-border rounded-lg space-y-4">
            <div className="flex justify-between items-start">
              <div className="space-y-4 flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Degree *</Label>
                    <Input
                      value={edu.degree}
                      onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                      placeholder="Bachelor of Science in Computer Science"
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label>Institution *</Label>
                    <Input
                      value={edu.institution}
                      onChange={(e) => updateEducation(edu.id, "institution", e.target.value)}
                      placeholder="University of Example"
                      className="mt-1.5"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Start Date</Label>
                    <Input
                      type="month"
                      value={edu.startDate}
                      onChange={(e) => updateEducation(edu.id, "startDate", e.target.value)}
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label>End Date</Label>
                    <Input
                      type="month"
                      value={edu.endDate}
                      onChange={(e) => updateEducation(edu.id, "endDate", e.target.value)}
                      disabled={edu.current}
                      className="mt-1.5"
                    />
                    <div className="flex items-center space-x-2 mt-2">
                      <Checkbox
                        id={`current-edu-${edu.id}`}
                        checked={edu.current}
                        onCheckedChange={(checked) =>
                          updateEducation(edu.id, "current", checked)
                        }
                      />
                      <Label htmlFor={`current-edu-${edu.id}`} className="text-sm font-normal">
                        Currently studying
                      </Label>
                    </div>
                  </div>
                </div>
              </div>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeEducation(edu.id)}
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
          onClick={addEducation}
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Education
        </Button>
      </CardContent>
    </Card>
  );
};
