import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";
import { useState } from "react";

interface SkillsFormProps {
  skills: string[];
  certifications: string[];
  languages: string[];
  onSkillsChange: (skills: string[]) => void;
  onCertificationsChange: (certs: string[]) => void;
  onLanguagesChange: (langs: string[]) => void;
}

export const SkillsForm = ({
  skills,
  certifications,
  languages,
  onSkillsChange,
  onCertificationsChange,
  onLanguagesChange,
}: SkillsFormProps) => {
  const [skillInput, setSkillInput] = useState("");
  const [certInput, setCertInput] = useState("");
  const [langInput, setLangInput] = useState("");

  const addSkill = () => {
    if (skillInput.trim()) {
      onSkillsChange([...skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const addCertification = () => {
    if (certInput.trim()) {
      onCertificationsChange([...certifications, certInput.trim()]);
      setCertInput("");
    }
  };

  const addLanguage = () => {
    if (langInput.trim()) {
      onLanguagesChange([...languages, langInput.trim()]);
      setLangInput("");
    }
  };

  return (
    <Card className="border-border shadow-soft">
      <CardHeader>
        <CardTitle className="text-xl">Skills & Additional Info</CardTitle>
        <CardDescription>Add your skills, certifications, and languages</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label>Skills</Label>
          <div className="flex gap-2 mt-1.5">
            <Input
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
              placeholder="e.g., JavaScript, Project Management"
            />
            <Button type="button" onClick={addSkill} size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {skills.map((skill, index) => (
              <Badge key={index} variant="secondary" className="px-3 py-1">
                {skill}
                <button
                  type="button"
                  onClick={() => onSkillsChange(skills.filter((_, i) => i !== index))}
                  className="ml-2 hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <Label>Certifications</Label>
          <div className="flex gap-2 mt-1.5">
            <Input
              value={certInput}
              onChange={(e) => setCertInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addCertification())}
              placeholder="e.g., AWS Certified Solutions Architect"
            />
            <Button type="button" onClick={addCertification} size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {certifications.map((cert, index) => (
              <Badge key={index} variant="secondary" className="px-3 py-1">
                {cert}
                <button
                  type="button"
                  onClick={() => onCertificationsChange(certifications.filter((_, i) => i !== index))}
                  className="ml-2 hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <Label>Languages</Label>
          <div className="flex gap-2 mt-1.5">
            <Input
              value={langInput}
              onChange={(e) => setLangInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addLanguage())}
              placeholder="e.g., English (Native), Spanish (Fluent)"
            />
            <Button type="button" onClick={addLanguage} size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {languages.map((lang, index) => (
              <Badge key={index} variant="secondary" className="px-3 py-1">
                {lang}
                <button
                  type="button"
                  onClick={() => onLanguagesChange(languages.filter((_, i) => i !== index))}
                  className="ml-2 hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
