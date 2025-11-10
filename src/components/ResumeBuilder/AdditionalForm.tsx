import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface AdditionalFormProps {
  skills: string[];
  certifications: string[];
  languages: string[];
  onSkillsChange: (skills: string[]) => void;
  onCertificationsChange: (certifications: string[]) => void;
  onLanguagesChange: (languages: string[]) => void;
}

export const AdditionalForm = ({
  skills,
  certifications,
  languages,
  onSkillsChange,
  onCertificationsChange,
  onLanguagesChange,
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

  const addCertification = () => {
    onCertificationsChange([...certifications, ""]);
  };

  const updateCertification = (index: number, value: string) => {
    const newCertifications = [...certifications];
    newCertifications[index] = value;
    onCertificationsChange(newCertifications);
  };

  const removeCertification = (index: number) => {
    onCertificationsChange(certifications.filter((_, i) => i !== index));
  };

  const addLanguage = () => {
    onLanguagesChange([...languages, ""]);
  };

  const updateLanguage = (index: number, value: string) => {
    const newLanguages = [...languages];
    newLanguages[index] = value;
    onLanguagesChange(newLanguages);
  };

  const removeLanguage = (index: number) => {
    onLanguagesChange(languages.filter((_, i) => i !== index));
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

        {/* Certifications Section */}
        <div>
          <Label className="text-base font-semibold">Certifications</Label>
          <p className="text-sm text-muted-foreground mt-1 mb-3">
            Add professional certifications or credentials
          </p>
          <div className="space-y-2">
            {certifications.map((cert, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={cert}
                  onChange={(e) => updateCertification(index, e.target.value)}
                  placeholder="e.g., AWS Certified Solutions Architect"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeCertification(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={addCertification}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Certification
            </Button>
          </div>
        </div>

        <Separator />

        {/* Languages Section */}
        <div>
          <Label className="text-base font-semibold">Languages</Label>
          <p className="text-sm text-muted-foreground mt-1 mb-3">
            Add languages you speak and your proficiency level
          </p>
          <div className="space-y-2">
            {languages.map((language, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={language}
                  onChange={(e) => updateLanguage(index, e.target.value)}
                  placeholder="e.g., English (Native), Spanish (Fluent)"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeLanguage(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={addLanguage}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Language
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
