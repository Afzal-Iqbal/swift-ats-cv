import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { Certification } from "@/types/resume";

interface CertificationsFormProps {
  data: Certification[];
  onChange: (data: Certification[]) => void;
}

export const CertificationsForm = ({ data, onChange }: CertificationsFormProps) => {
  const certifications = data || [];

  const addCertification = () => {
    onChange([
      ...certifications,
      {
        id: Date.now().toString(),
        name: "",
        provider: "",
      },
    ]);
  };

  const updateCertification = (id: string, field: keyof Certification, value: string) => {
    onChange(
      certifications.map((cert) =>
        cert.id === id ? { ...cert, [field]: value } : cert
      )
    );
  };

  const removeCertification = (id: string) => {
    onChange(certifications.filter((cert) => cert.id !== id));
  };

  return (
    <Card className="border-border shadow-soft">
      <CardHeader>
        <CardTitle className="text-xl">Professional Certifications</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {certifications.map((cert) => (
          <div key={cert.id} className="p-4 border border-border rounded-lg space-y-4">
            <div className="flex justify-between items-start">
              <div className="space-y-4 flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Certification Name *</Label>
                    <Input
                      value={cert.name}
                      onChange={(e) => updateCertification(cert.id, "name", e.target.value)}
                      placeholder="AWS Certified Solutions Architect"
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label>Provider/Institution *</Label>
                    <Input
                      value={cert.provider}
                      onChange={(e) => updateCertification(cert.id, "provider", e.target.value)}
                      placeholder="Amazon Web Services"
                      className="mt-1.5"
                    />
                  </div>
                </div>
              </div>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeCertification(cert.id)}
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
          onClick={addCertification}
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Certification
        </Button>
      </CardContent>
    </Card>
  );
};
