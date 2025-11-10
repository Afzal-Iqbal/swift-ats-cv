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
    <div style={{ 
      fontFamily: "Arial, Helvetica, sans-serif", 
      fontSize: "11pt", 
      lineHeight: "1.6", 
      color: "#000000",
      backgroundColor: "#ffffff",
      padding: "40px",
      maxWidth: "800px",
      margin: "0 auto"
    }}>
      {/* Contact Information - Top of Document */}
      <div style={{ marginBottom: "20px" }}>
        <div style={{ fontSize: "18pt", fontWeight: "bold", marginBottom: "8px" }}>
          {data.contactInfo.fullName || "YOUR NAME"}
        </div>
        {data.contactInfo.email && (
          <div style={{ marginBottom: "4px" }}>
            {data.contactInfo.email}
          </div>
        )}
        {data.contactInfo.phone && (
          <div style={{ marginBottom: "4px" }}>
            {data.contactInfo.phone}
          </div>
        )}
        {data.contactInfo.linkedin && (
          <div style={{ marginBottom: "4px" }}>
            {data.contactInfo.linkedin}
          </div>
        )}
        {data.contactInfo.location && (
          <div style={{ marginBottom: "4px" }}>
            {data.contactInfo.location}
          </div>
        )}
        {data.contactInfo.customLinks?.map((link, idx) => (
          link.label && link.url && (
            <div key={idx} style={{ marginBottom: "4px" }}>
              {link.label}: {link.url}
            </div>
          )
        ))}
      </div>

      {/* Education */}
      {data.education?.length > 0 && (
        <div style={{ marginBottom: "20px" }}>
          <div style={{ fontSize: "13pt", fontWeight: "bold", marginBottom: "8px", textTransform: "uppercase" }}>
            EDUCATION
          </div>
          {data.education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: "12px" }}>
              <div style={{ fontWeight: "bold", marginBottom: "4px" }}>
                {edu.degree}
              </div>
              <div style={{ marginBottom: "4px" }}>
                {edu.institution}
              </div>
              <div style={{ fontStyle: "italic" }}>
                {formatDate(edu.startDate, false)} - {edu.current ? "Present" : formatDate(edu.endDate, false)}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Work Experience */}
      {data.workExperience?.length > 0 && (
        <div style={{ marginBottom: "20px" }}>
          <div style={{ fontSize: "13pt", fontWeight: "bold", marginBottom: "8px", textTransform: "uppercase" }}>
            WORK EXPERIENCE
          </div>
          {data.workExperience.map((exp) => (
            <div key={exp.id} style={{ marginBottom: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "4px" }}>
                <div style={{ fontWeight: "bold" }}>
                  {exp.role} — {exp.company}
                </div>
                <div style={{ fontSize: "10pt" }}>
                  {formatDate(exp.startDate, false)} – {exp.current ? "Present" : formatDate(exp.endDate, false)}
                </div>
              </div>
              {exp.responsibilities.filter(r => r.trim()).map((resp, idx) => (
                <div key={idx} style={{ marginBottom: "4px", paddingLeft: "20px" }}>
                  • {resp}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {data.projects?.length > 0 && (
        <div style={{ marginBottom: "20px" }}>
          <div style={{ fontSize: "13pt", fontWeight: "bold", marginBottom: "8px", textTransform: "uppercase" }}>
            PROJECTS
          </div>
          {data.projects.map((project) => (
            <div key={project.id} style={{ marginBottom: "8px" }}>
              • <strong>{project.name}</strong> – {project.description}
              {project.technologies && <span> ({project.technologies})</span>}
            </div>
          ))}
        </div>
      )}

      {/* Professional Certifications */}
      {data.certifications?.length > 0 && (
        <div style={{ marginBottom: "20px" }}>
          <div style={{ fontSize: "13pt", fontWeight: "bold", marginBottom: "8px", textTransform: "uppercase" }}>
            PROFESSIONAL CERTIFICATIONS
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 16px" }}>
            {data.certifications.map((cert) => (
              <div key={cert.id} style={{ marginBottom: "4px" }}>
                <div style={{ fontWeight: "bold" }}>
                  {cert.name}
                </div>
                {cert.provider && (
                  <div style={{ fontSize: "10pt" }}>
                    ({cert.provider})
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Additional Information */}
      {(data.skills?.length > 0 || data.additionalItems?.length > 0) && (
        <div>
          <div style={{ fontSize: "13pt", fontWeight: "bold", marginBottom: "8px", textTransform: "uppercase" }}>
            ADDITIONAL
          </div>
          
          {/* Technical Skills */}
          {data.skills?.length > 0 && data.skills.some(s => s.trim()) && (
            <div style={{ marginBottom: "8px" }}>
              <strong>Technical Skills: </strong>
              {data.skills.filter(s => s.trim()).join(", ")}
            </div>
          )}

          {/* Additional Items */}
          {data.additionalItems?.length > 0 && data.additionalItems.some(item => item.trim()) && (
            <div>
              {data.additionalItems.filter(item => item.trim()).map((item, idx) => (
                <div key={idx} style={{ marginBottom: "4px" }}>
                  • {item}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
