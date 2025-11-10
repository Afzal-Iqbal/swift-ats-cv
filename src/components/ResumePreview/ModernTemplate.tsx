import { ResumeData } from "@/types/resume";

interface ModernTemplateProps {
  data: ResumeData;
}

export const ModernTemplate = ({ data }: ModernTemplateProps) => {
  const formatDate = (date: string, current: boolean) => {
    if (!date) return "";
    const [year, month] = date.split("-");
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return current ? `${monthNames[parseInt(month) - 1]} ${year} - Present` : `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  return (
    <div className="bg-white p-8 shadow-lg" style={{ fontFamily: "Calibri, sans-serif", fontSize: "11pt", lineHeight: "1.4", color: "#333" }}>
      {/* Header */}
      <div className="mb-5 text-center">
        <h1 className="text-3xl font-bold mb-2" style={{ fontSize: "22pt", color: "#2563eb" }}>
          {data.contactInfo.fullName || "Your Name"}
        </h1>
        <div className="text-sm" style={{ fontSize: "10pt", color: "#666" }}>
          {data.contactInfo.email && <span>{data.contactInfo.email}</span>}
          {data.contactInfo.phone && <span> • {data.contactInfo.phone}</span>}
          {data.contactInfo.linkedin && <span> • {data.contactInfo.linkedin}</span>}
          {data.contactInfo.location && <span> • {data.contactInfo.location}</span>}
          {data.contactInfo.customLinks?.map((link, idx) => (
            link.label && link.url && <span key={idx}> • {link.label}: {link.url}</span>
          ))}
        </div>
      </div>

      {/* Professional Summary */}
      {data.summary && (
        <div className="mb-5">
          <h2 className="text-base font-bold mb-2 pb-1 border-b-2" style={{ fontSize: "13pt", color: "#2563eb", borderColor: "#2563eb" }}>
            PROFESSIONAL SUMMARY
          </h2>
          <p className="text-sm">{data.summary}</p>
        </div>
      )}

      {/* Education */}
      {data.education?.length > 0 && (
        <div className="mb-5">
          <h2 className="text-base font-bold mb-2 pb-1 border-b-2" style={{ fontSize: "13pt", color: "#2563eb", borderColor: "#2563eb" }}>
            EDUCATION
          </h2>
          {data.education.map((edu) => (
            <div key={edu.id} className="mb-3">
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold" style={{ color: "#1e40af" }}>{edu.degree}</h3>
                <span className="text-sm" style={{ color: "#666" }}>
                  {formatDate(edu.startDate, false)} - {edu.current ? "Present" : formatDate(edu.endDate, false)}
                </span>
              </div>
              <div className="text-sm font-semibold" style={{ color: "#666" }}>{edu.institution}</div>
            </div>
          ))}
        </div>
      )}

      {/* Work Experience */}
      {data.workExperience?.length > 0 && (
        <div className="mb-5">
          <h2 className="text-base font-bold mb-2 pb-1 border-b-2" style={{ fontSize: "13pt", color: "#2563eb", borderColor: "#2563eb" }}>
            WORK EXPERIENCE
          </h2>
          {data.workExperience.map((exp) => (
            <div key={exp.id} className="mb-4">
              <div className="mb-1">
                <h3 className="font-bold text-base" style={{ color: "#1e40af" }}>{exp.role} — {exp.company}</h3>
              </div>
              <div className="text-sm mb-2" style={{ color: "#666" }}>
                {exp.location} | {formatDate(exp.startDate, false)} – {exp.current ? "Present" : formatDate(exp.endDate, false)}
              </div>
              <ul className="list-none pl-0 text-sm">
                {exp.responsibilities.filter(r => r.trim()).map((resp, idx) => (
                  <li key={idx} className="mb-1 pl-4" style={{ textIndent: "-1em" }}>
                    <span style={{ color: "#2563eb" }}>▸</span> {resp}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {data.projects?.length > 0 && (
        <div className="mb-5">
          <h2 className="text-base font-bold mb-2 pb-1 border-b-2" style={{ fontSize: "13pt", color: "#2563eb", borderColor: "#2563eb" }}>
            PROJECTS
          </h2>
          <ul className="list-none pl-0 text-sm">
            {data.projects.map((project) => (
              <li key={project.id} className="mb-2 pl-4" style={{ textIndent: "-1em" }}>
                <span style={{ color: "#2563eb" }}>▸</span> <strong>{project.name}</strong> – {project.description}
                {project.technologies && <span className="text-sm" style={{ color: "#666" }}> ({project.technologies})</span>}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Professional Certifications */}
      {data.certifications?.length > 0 && (
        <div className="mb-5">
          <h2 className="text-base font-bold mb-3 pb-1 border-b-2" style={{ fontSize: "13pt", color: "#2563eb", borderColor: "#2563eb" }}>
            PROFESSIONAL CERTIFICATIONS
          </h2>
          <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
            {data.certifications.map((cert) => (
              <div key={cert.id}>
                <div className="font-bold" style={{ color: "#1e40af" }}>{cert.name}</div>
                {cert.provider && <div style={{ color: "#666" }}>({cert.provider})</div>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Additional Information */}
      {(data.skills?.length > 0 || data.languages?.length > 0) && (
        <div className="mb-5">
          <h2 className="text-base font-bold mb-3 pb-1 border-b-2" style={{ fontSize: "13pt", color: "#2563eb", borderColor: "#2563eb" }}>
            ADDITIONAL
          </h2>
          
          <div className="text-sm">
            {/* Technical Skills */}
            {data.skills?.length > 0 && (
              <div className="mb-2">
                <strong style={{ color: "#1e40af" }}>Technical Skills:</strong>
                <span> {data.skills.join(", ")}</span>
              </div>
            )}

            {/* Languages */}
            {data.languages?.length > 0 && (
              <div>
                <strong style={{ color: "#1e40af" }}>Languages:</strong>
                <span> {data.languages.join(", ")}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
