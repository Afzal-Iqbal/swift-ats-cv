import { ResumeData } from "@/types/resume";

interface ATSTemplateProps {
  data: ResumeData;
}

export const ATSTemplate = ({ data }: ATSTemplateProps) => {
  const formatDate = (date: string, current: boolean) => {
    if (!date) return "";
    const [year, month] = date.split("-");
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return current ? `${monthNames[parseInt(month) - 1]} ${year} - Present` : `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  return (
    <div className="bg-white p-8" style={{ fontFamily: "Arial, sans-serif", fontSize: "11pt", lineHeight: "1.5", color: "#000" }}>
      {/* Header - Single Column */}
      <div className="mb-4">
        <h1 className="text-xl font-bold mb-2" style={{ fontSize: "16pt" }}>
          {data.contactInfo.fullName || "YOUR NAME"}
        </h1>
        {data.contactInfo.email && <div className="mb-1">Email: {data.contactInfo.email}</div>}
        {data.contactInfo.phone && <div className="mb-1">Phone: {data.contactInfo.phone}</div>}
        {data.contactInfo.linkedin && <div className="mb-1">LinkedIn: {data.contactInfo.linkedin}</div>}
        {data.contactInfo.location && <div className="mb-1">Location: {data.contactInfo.location}</div>}
      </div>

      {/* Professional Summary */}
      {data.summary && (
        <div className="mb-4">
          <h2 className="text-sm font-bold mb-2 uppercase" style={{ fontSize: "12pt" }}>
            PROFESSIONAL SUMMARY
          </h2>
          <p className="text-sm">{data.summary}</p>
        </div>
      )}

      {/* Work Experience */}
      {data.workExperience.length > 0 && (
        <div className="mb-4">
          <h2 className="text-sm font-bold mb-2 uppercase" style={{ fontSize: "12pt" }}>
            WORK EXPERIENCE
          </h2>
          {data.workExperience.map((exp) => (
            <div key={exp.id} className="mb-3">
              <div className="font-bold">{exp.company} - {exp.role}</div>
              <div className="text-sm mb-1">
                {formatDate(exp.startDate, false)} - {exp.current ? "Present" : formatDate(exp.endDate, false)}
              </div>
              {exp.responsibilities.filter(r => r.trim()).map((resp, idx) => (
                <div key={idx} className="text-sm mb-1">- {resp}</div>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div className="mb-4">
          <h2 className="text-sm font-bold mb-2 uppercase" style={{ fontSize: "12pt" }}>
            EDUCATION
          </h2>
          {data.education.map((edu) => (
            <div key={edu.id} className="mb-2">
              <div className="font-bold">{edu.institution}</div>
              <div className="text-sm">{edu.degree}</div>
              <div className="text-sm">
                {formatDate(edu.startDate, false)} - {edu.current ? "Present" : formatDate(edu.endDate, false)}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div className="mb-4">
          <h2 className="text-sm font-bold mb-2 uppercase" style={{ fontSize: "12pt" }}>
            SKILLS
          </h2>
          <div className="text-sm">{data.skills.join(", ")}</div>
        </div>
      )}

      {/* Certifications */}
      {data.certifications.length > 0 && (
        <div className="mb-4">
          <h2 className="text-sm font-bold mb-2 uppercase" style={{ fontSize: "12pt" }}>
            CERTIFICATIONS
          </h2>
          {data.certifications.map((cert, idx) => (
            <div key={idx} className="text-sm mb-1">- {cert}</div>
          ))}
        </div>
      )}

      {/* Languages */}
      {data.languages.length > 0 && (
        <div>
          <h2 className="text-sm font-bold mb-2 uppercase" style={{ fontSize: "12pt" }}>
            LANGUAGES
          </h2>
          <div className="text-sm">{data.languages.join(", ")}</div>
        </div>
      )}
    </div>
  );
};
