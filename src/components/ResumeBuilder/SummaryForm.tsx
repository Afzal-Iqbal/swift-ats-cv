import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface SummaryFormProps {
  data: string;
  onChange: (data: string) => void;
}

export const SummaryForm = ({ data, onChange }: SummaryFormProps) => {
  return (
    <Card className="border-border shadow-soft">
      <CardHeader>
        <CardTitle className="text-xl">Professional Summary</CardTitle>
        <CardDescription>
          Write a brief overview of your experience and career goals (2-3 sentences)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Textarea
          value={data}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Experienced software engineer with 5+ years in full-stack development..."
          className="min-h-[120px] resize-none"
        />
        <p className="text-sm text-muted-foreground mt-2">
          {data.length} characters
        </p>
      </CardContent>
    </Card>
  );
};
