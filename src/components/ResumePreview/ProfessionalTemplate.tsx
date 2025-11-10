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
      {/* Header - Centered name with links */}
      <div className="mb-4 pb-3 border-b-2 border-black">
        <h1 className="text-2xl font-bold mb-2 text-center" style={{ fontSize: "20pt" }}>
          {data.contactInfo.fullName || "Your Name"}
        </h1>
        <div className="flex justify-between items-center text-sm" style={{ fontSize: "10pt" }}>
          <div>
            {data.contactInfo.phone && <span>{data.contactInfo.phone}</span>}
          </div>
          <div className="flex gap-2">
            {data.contactInfo.linkedin && (
              <a href={data.contactInfo.linkedin} style={{ color: "#0066cc", textDecoration: "underline" }}>
                LinkedIn
              </a>
            )}
            {data.contactInfo.customLinks?.map((link, idx) => (
              link.label && link.url && (
                <a key={idx} href={link.url} style={{ color: "#0066cc", textDecoration: "underline" }}>
                  {link.label}
                </a>
              )
            ))}
          </div>
          <div>
            {data.contactInfo.email && <span>{data.contactInfo.email}</span>}
          </div>
        </div>
      </div>

      {/* Education */}
      {data.education?.length > 0 && (
        <>
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
          <div className="border-t border-black mb-4"></div>
        </>
      )}

      {/* Work Experience */}
      {data.workExperience?.length > 0 && (
        <>
          <div className="mb-4">
            <h2 className="text-sm font-bold mb-2 uppercase" style={{ fontSize: "12pt" }}>
              Work Experience
            </h2>
            {data.workExperience.map((exp) => (
              <div key={exp.id} className="mb-3">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold">{exp.role} — {exp.company}</h3>
                  <span className="text-sm">
                    {formatDate(exp.startDate, false)} – {exp.current ? "Present" : formatDate(exp.endDate, false)}
                  </span>
                </div>
                <ul className="list-none pl-0 text-sm">
                  {exp.responsibilities.filter(r => r.trim()).map((resp, idx) => (
                    <li key={idx} className="mb-1">• {resp}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-black mb-4"></div>
        </>
      )}

      {/* Projects */}
      {data.projects?.length > 0 && (
        <>
          <div className="mb-4">
            <h2 className="text-sm font-bold mb-2 uppercase" style={{ fontSize: "12pt" }}>
              Projects
            </h2>
            <ul className="list-none pl-0 text-sm space-y-2">
              {data.projects.map((project) => (
                <li key={project.id} className="mb-1">
                  <strong>{project.name}</strong> – {project.description}
                  {project.technologies && <span className="text-muted-foreground"> ({project.technologies})</span>}
                </li>
              ))}
            </ul>
          </div>
          <div className="border-t border-black mb-4"></div>
        </>
      )}

      {/* Professional Certifications */}
      {data.certifications?.length > 0 && (
        <>
          <div className="mb-4">
            <h2 className="text-sm font-bold mb-2 uppercase" style={{ fontSize: "12pt" }}>
              Professional Certifications
            </h2>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              {data.certifications.map((cert) => (
                <div key={cert.id}>
                  <strong>{cert.name}</strong>
                  {cert.provider && <div className="text-muted-foreground">({cert.provider})</div>}
                </div>
              ))}
            </div>
          </div>
          <div className="border-t border-black mb-4"></div>
        </>
      )}

      {/* Additional Information */}
      {(data.skills?.length > 0 || data.additionalItems?.length > 0) && (
        <div className="mb-4">
          <h2 className="text-sm font-bold mb-2 uppercase" style={{ fontSize: "12pt" }}>
            Additional
          </h2>
          
          {/* Technical Skills */}
          {data.skills?.length > 0 && (
            <div className="mb-3">
              <strong className="text-sm">Technical Skills:</strong>
              <span className="text-sm"> {data.skills.join(", ")}</span>
            </div>
          )}

          {/* Additional Items */}
          {data.additionalItems?.length > 0 && (
            <div>
              {data.additionalItems.filter(item => item.trim()).map((item, idx) => (
                <div key={idx} className="text-sm mb-1">• {item}</div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
