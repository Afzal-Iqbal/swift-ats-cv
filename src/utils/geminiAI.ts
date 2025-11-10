const GEMINI_API_KEY = "AIzaSyAjwGcARhexh27rgdVvSn_5cQGYlUWjvB4";
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${GEMINI_API_KEY}`;

export interface OptimizationSuggestion {
  section: string;
  original: string;
  improved: string;
  reason: string;
}

export async function optimizeResumeWithAI(
  resumeText: string,
  jobDescription?: string
): Promise<OptimizationSuggestion[]> {
  const prompt = `You are an expert ATS (Applicant Tracking System) resume optimizer. Analyze the following resume content and provide specific keyword and phrasing improvements to make it more ATS-friendly.

${jobDescription ? `JOB DESCRIPTION:\n${jobDescription}\n\n` : ''}

RESUME CONTENT:
${resumeText}

Provide 5-7 specific improvements focusing on:
1. Adding relevant keywords from the job description (if provided)
2. Starting bullet points with strong action verbs (Developed, Led, Improved, Built, Integrated, etc.)
3. Including quantifiable metrics where possible
4. Using industry-standard terms and technologies
5. Improving clarity and impact

Return your response as a JSON array of objects with this structure:
[
  {
    "section": "Work Experience - Software Engineer",
    "original": "Made the website faster",
    "improved": "Optimized React application performance, reducing load time by 40% and improving Core Web Vitals scores",
    "reason": "Uses specific technology (React), includes quantifiable metrics (40%), and technical terminology (Core Web Vitals)"
  }
]

Return ONLY the JSON array, no other text.`;

  try {
    const response = await fetch(GEMINI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 2048,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Gemini API error response:", errorData);
      throw new Error(`Gemini API error (${response.status}): ${errorData}`);
    }

    const data = await response.json();
    console.log("Gemini API response:", data);
    const text = data.candidates[0].content.parts[0].text;
    
    // Extract JSON from markdown code blocks if present
    const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || text.match(/\[[\s\S]*\]/);
    const jsonText = jsonMatch ? (jsonMatch[1] || jsonMatch[0]) : text;
    
    const suggestions: OptimizationSuggestion[] = JSON.parse(jsonText);
    return suggestions;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw error;
  }
}
