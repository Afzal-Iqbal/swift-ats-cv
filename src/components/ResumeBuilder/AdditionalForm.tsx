import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface AdditionalFormProps {
  skills: string[];
  additionalItems: string[];
  onSkillsChange: (skills: string[]) => void;
  onAdditionalItemsChange: (items: string[]) => void;
}

export const AdditionalForm = ({
  skills,
  additionalItems,
  onSkillsChange,
  onAdditionalItemsChange,
}: AdditionalFormProps) => {
  const addSkill = () => {
    onSkillsChange([...skills, ""]);
  };

  const updateSkill = (index: number, value: string) => {
    const newSkills = [...skills];
    newSkills[index] = value;
    onSkillsChange(newSkills);
  };

  const removeSkill = (index: number) => {
    onSkillsChange(skills.filter((_, i) => i !== index));
  };

  const addAdditionalItem = () => {
    onAdditionalItemsChange([...additionalItems, ""]);
  };

  const updateAdditionalItem = (index: number, value: string) => {
    const newItems = [...additionalItems];
    newItems[index] = value;
    onAdditionalItemsChange(newItems);
  };

  const removeAdditionalItem = (index: number) => {
    onAdditionalItemsChange(additionalItems.filter((_, i) => i !== index));
  };

  return (
    <Card className="border-border shadow-soft">
      <CardHeader>
        <CardTitle className="text-xl">Additional Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Technical Skills Section */}
        <div>
          <Label className="text-base font-semibold">Technical Skills</Label>
          <p className="text-sm text-muted-foreground mt-1 mb-3">
            Add your technical skills, programming languages, frameworks, tools, etc.
          </p>
          <div className="space-y-2">
            {skills.map((skill, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={skill}
                  onChange={(e) => updateSkill(index, e.target.value)}
                  placeholder="e.g., React, Python, AWS, Docker"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeSkill(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={addSkill}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Technical Skill
            </Button>
          </div>
        </div>

        <Separator />

        {/* Additional Items Section */}
        <div>
          <Label className="text-base font-semibold">Additional Information</Label>
          <p className="text-sm text-muted-foreground mt-1 mb-3">
            Add any other relevant information (languages, interests, achievements, etc.)
          </p>
          <div className="space-y-2">
            {additionalItems.map((item, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={item}
                  onChange={(e) => updateAdditionalItem(index, e.target.value)}
                  placeholder="e.g., English (Native), Spanish (Fluent)"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeAdditionalItem(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={addAdditionalItem}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
