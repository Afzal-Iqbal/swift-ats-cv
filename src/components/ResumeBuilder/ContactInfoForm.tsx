import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ContactInfo } from "@/types/resume";
import { Plus, Trash2, Link as LinkIcon } from "lucide-react";

interface ContactInfoFormProps {
  data: ContactInfo;
  onChange: (data: ContactInfo) => void;
}

export const ContactInfoForm = ({ data, onChange }: ContactInfoFormProps) => {
  const handleChange = (field: keyof ContactInfo, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const addCustomLink = () => {
    const customLinks = data.customLinks || [];
    onChange({
      ...data,
      customLinks: [
        ...customLinks,
        {
          id: Date.now().toString(),
          label: "",
          url: "",
        },
      ],
    });
  };

  const updateCustomLink = (id: string, field: "label" | "url", value: string) => {
    const customLinks = data.customLinks || [];
    onChange({
      ...data,
      customLinks: customLinks.map((link) =>
        link.id === id ? { ...link, [field]: value } : link
      ),
    });
  };

  const removeCustomLink = (id: string) => {
    const customLinks = data.customLinks || [];
    onChange({
      ...data,
      customLinks: customLinks.filter((link) => link.id !== id),
    });
  };

  return (
    <Card className="border-border shadow-soft">
      <CardHeader>
        <CardTitle className="text-xl">Contact Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="fullName">Full Name *</Label>
          <Input
            id="fullName"
            value={data.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
            placeholder="John Doe"
            className="mt-1.5"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={data.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="john@example.com"
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone *</Label>
            <Input
              id="phone"
              type="tel"
              value={data.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder="+1 234 567 8900"
              className="mt-1.5"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="linkedin">LinkedIn</Label>
            <Input
              id="linkedin"
              value={data.linkedin || ""}
              onChange={(e) => handleChange("linkedin", e.target.value)}
              placeholder="linkedin.com/in/johndoe"
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={data.location || ""}
              onChange={(e) => handleChange("location", e.target.value)}
              placeholder="New York, NY"
              className="mt-1.5"
            />
          </div>
        </div>

        {/* Custom Links Section */}
        <div className="pt-4 border-t border-border">
          <div className="flex items-center justify-between mb-3">
            <Label className="text-base font-semibold flex items-center gap-2">
              <LinkIcon className="h-4 w-4" />
              Additional Links
            </Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addCustomLink}
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Link
            </Button>
          </div>
          
          {data.customLinks && data.customLinks.length > 0 && (
            <div className="space-y-3">
              {data.customLinks.map((link) => (
                <div key={link.id} className="flex gap-2">
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-2">
                    <Input
                      value={link.label}
                      onChange={(e) => updateCustomLink(link.id, "label", e.target.value)}
                      placeholder="Label (e.g., Portfolio, GitHub)"
                      className="flex-1"
                    />
                    <Input
                      value={link.url}
                      onChange={(e) => updateCustomLink(link.id, "url", e.target.value)}
                      placeholder="URL (e.g., https://github.com/johndoe)"
                      type="url"
                      className="flex-1"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeCustomLink(link.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
          
          {(!data.customLinks || data.customLinks.length === 0) && (
            <p className="text-sm text-muted-foreground">
              Add custom links like Portfolio, GitHub, Personal Website, etc.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
