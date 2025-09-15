import { Type } from '@google/genai';

// This is a mock implementation. In a real application, you would import and use the Gemini API.
// import { GoogleGenAI } from "@google/genai";
// const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const MOCK_OCR_PROMPT = `
You are an expert OCR system specializing in academic certificates from Indian universities. 
Extract the following information from the provided certificate image and return it as a structured JSON object.
The fields to extract are: certificateID, studentName, universityName, courseName, grade, and issueDate.
If a field is not clearly visible, return null for its value.
`;

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        certificateID: { type: Type.STRING },
        studentName: { type: Type.STRING },
        universityName: { type: Type.STRING },
        courseName: { type: Type.STRING },
        grade: { type: Type.STRING },
        issueDate: { type: Type.STRING, description: "Date in YYYY-MM-DD format" },
    },
    required: ["certificateID", "studentName", "universityName", "courseName"],
};


export const extractCertificateDetails = async (base64Image) => {
  console.log('Simulating Gemini API call with prompt:', MOCK_OCR_PROMPT);
  
  // In a real app, you would make the API call here:
  /*
  const imagePart = {
    inlineData: {
      mimeType: 'image/jpeg', // or 'image/png', 'application/pdf'
      data: base64Image.split(',')[1],
    },
  };

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: { parts: [imagePart, { text: MOCK_OCR_PROMPT }] },
      config: {
        responseMimeType: 'application/json',
        responseSchema: responseSchema,
      }
    });
    
    const extractedJson = JSON.parse(response.text);
    return {
        id: extractedJson.certificateID,
        studentName: extractedJson.studentName,
        university: extractedJson.universityName,
        course: extractedJson.courseName,
        grade: extractedJson.grade,
        issueDate: extractedJson.issueDate,
    };
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to analyze certificate with AI.");
  }
  */

  // Mocked response for demonstration purposes
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate different outcomes based on a simple heuristic (e.g., image size)
      if (base64Image.length % 3 === 0) {
        // Simulate a successful, matching OCR
        resolve({
          id: 'JHU-CS-2023-001',
          studentName: 'Amit Kumar',
          university: 'Jharkhand Technical University',
          course: 'B.Tech in Computer Science',
          grade: 'A+',
          issueDate: '2023-05-15',
        });
      } else if (base64Image.length % 3 === 1) {
        // Simulate a mismatch
        resolve({
          id: 'RU-PHY-2022-045',
          studentName: 'Priya Sharma',
          university: 'Ranchi University',
          course: 'M.Sc in Physics',
          grade: 'B', // Mismatched grade
          issueDate: '2022-07-20',
        });
      } else {
        // Simulate a completely forged document
        resolve({
          id: 'FAKE-ID-001',
          studentName: 'Rohan Mehra',
          university: 'Non-Existent University',
          course: 'Ph.D in Astrophysics',
          grade: 'O',
          issueDate: '2024-01-01',
        });
      }
    }, 2500); // Simulate network latency
  });
};