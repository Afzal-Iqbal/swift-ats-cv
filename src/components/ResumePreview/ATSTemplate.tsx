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

      {/* Professional Summary */}
      {data.summary && (
        <div style={{ marginBottom: "20px" }}>
          <div style={{ fontSize: "13pt", fontWeight: "bold", marginBottom: "8px", textTransform: "uppercase" }}>
            PROFESSIONAL SUMMARY
          </div>
          <div style={{ textAlign: "justify" }}>
            {data.summary}
          </div>
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
              <div style={{ fontWeight: "bold", marginBottom: "4px" }}>
                {exp.role} — {exp.company}
              </div>
              <div style={{ marginBottom: "8px" }}>
                {exp.location} | {formatDate(exp.startDate, false)} – {exp.current ? "Present" : formatDate(exp.endDate, false)}
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

      {/* Additional Information */}
      {(data.skills?.length > 0 || data.certifications?.length > 0 || data.languages?.length > 0) && (
        <div style={{ marginBottom: "20px" }}>
          <div style={{ fontSize: "13pt", fontWeight: "bold", marginBottom: "12px", textTransform: "uppercase" }}>
            ADDITIONAL
          </div>
          
          {/* Technical Skills */}
          {data.skills?.length > 0 && data.skills.some(s => s.trim()) && (
            <div style={{ marginBottom: "12px" }}>
              <div style={{ fontWeight: "bold", marginBottom: "6px" }}>
                Technical Skills
              </div>
              <div>
                {data.skills.filter(s => s.trim()).join(" • ")}
              </div>
            </div>
          )}

          {/* Certifications */}
          {data.certifications?.length > 0 && data.certifications.some(c => c.trim()) && (
            <div style={{ marginBottom: "12px" }}>
              <div style={{ fontWeight: "bold", marginBottom: "6px" }}>
                Certifications
              </div>
              {data.certifications.filter(c => c.trim()).map((cert, idx) => (
                <div key={idx} style={{ marginBottom: "4px" }}>
                  • {cert}
                </div>
              ))}
            </div>
          )}

          {/* Languages */}
          {data.languages?.length > 0 && data.languages.some(l => l.trim()) && (
            <div>
              <div style={{ fontWeight: "bold", marginBottom: "6px" }}>
                Languages
              </div>
              <div>
                {data.languages.filter(l => l.trim()).join(" • ")}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
