import { ResumeData } from "@/types/resume";

interface ProfessionalTemplateProps {
  data: ResumeData;
}

export const ProfessionalTemplate = ({ data }: ProfessionalTemplateProps) => {
  const formatDate = (date: string, current: boolean) => {
    if (!date) return "";
    const [year, month] = date.split("-");
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return current ? `${monthNames[parseInt(month) - 1]} ${year} - Present` : `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  return (
    <div className="bg-white p-8 shadow-lg" style={{ fontFamily: "Arial, sans-serif", fontSize: "11pt", lineHeight: "1.3", color: "#000" }}>
      {/* Header */}
      <div className="mb-4 pb-3 border-b-2 border-black">
        <h1 className="text-2xl font-bold mb-1" style={{ fontSize: "20pt" }}>
          {data.contactInfo.fullName || "Your Name"}
        </h1>
        <div className="text-sm" style={{ fontSize: "10pt" }}>
          {data.contactInfo.email && <span>{data.contactInfo.email}</span>}
          {data.contactInfo.phone && <span> | {data.contactInfo.phone}</span>}
          {data.contactInfo.linkedin && <span> | {data.contactInfo.linkedin}</span>}
          {data.contactInfo.location && <span> | {data.contactInfo.location}</span>}
        </div>
      </div>

      {/* Professional Summary */}
      {data.summary && (
        <div className="mb-4">
          <h2 className="text-sm font-bold mb-2 uppercase" style={{ fontSize: "12pt" }}>
            Professional Summary
          </h2>
          <p className="text-sm">{data.summary}</p>
        </div>
      )}

      {/* Work Experience */}
      {data.workExperience.length > 0 && (
        <div className="mb-4">
          <h2 className="text-sm font-bold mb-2 uppercase" style={{ fontSize: "12pt" }}>
            Work Experience
          </h2>
          {data.workExperience.map((exp) => (
            <div key={exp.id} className="mb-3">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="font-bold">{exp.role}</h3>
                <span className="text-sm">
                  {formatDate(exp.startDate, false)} - {exp.current ? "Present" : formatDate(exp.endDate, false)}
                </span>
              </div>
              <div className="text-sm mb-1 italic">{exp.company}</div>
              <ul className="list-none pl-0 text-sm">
                {exp.responsibilities.filter(r => r.trim()).map((resp, idx) => (
                  <li key={idx} className="mb-1">• {resp}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div className="mb-4">
          <h2 className="text-sm font-bold mb-2 uppercase" style={{ fontSize: "12pt" }}>
            Education
          </h2>
          {data.education.map((edu) => (
            <div key={edu.id} className="mb-2">
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold">{edu.degree}</h3>
                <span className="text-sm">
                  {formatDate(edu.startDate, false)} - {edu.current ? "Present" : formatDate(edu.endDate, false)}
                </span>
              </div>
              <div className="text-sm italic">{edu.institution}</div>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div className="mb-4">
          <h2 className="text-sm font-bold mb-2 uppercase" style={{ fontSize: "12pt" }}>
            Skills
          </h2>
          <p className="text-sm">{data.skills.join(" • ")}</p>
        </div>
      )}

      {/* Certifications */}
      {data.certifications.length > 0 && (
        <div className="mb-4">
          <h2 className="text-sm font-bold mb-2 uppercase" style={{ fontSize: "12pt" }}>
            Certifications
          </h2>
          <ul className="list-none pl-0 text-sm">
            {data.certifications.map((cert, idx) => (
              <li key={idx} className="mb-1">• {cert}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Languages */}
      {data.languages.length > 0 && (
        <div>
          <h2 className="text-sm font-bold mb-2 uppercase" style={{ fontSize: "12pt" }}>
            Languages
          </h2>
          <p className="text-sm">{data.languages.join(" • ")}</p>
        </div>
      )}
    </div>
  );
};
