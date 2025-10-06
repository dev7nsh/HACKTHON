// API configuration for Google Gemini
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || 'AIzaSyD9nDre5RfWZx0WPrSkc7zNIEun10MSwG0';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent';

// Convert file to base64
const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // Remove the data:mime/type;base64, prefix
      const base64 = reader.result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = error => reject(error);
  });
};

// Get MIME type for Gemini API
const getMimeType = (file) => {
  return file.type;
};

// Analyze file with Gemini API
export const analyzeWithGemini = async (file) => {
  if (!GEMINI_API_KEY) {
    throw new Error('Gemini API key not found. Please add VITE_GEMINI_API_KEY to your .env file');
  }

  try {
    const base64Data = await fileToBase64(file);
    const mimeType = getMimeType(file);

    const prompt = `You are a deepfake detection assistant. Analyze the given file (image, video, or audio) and determine if it's AI-generated or real. 

    Look for telltale signs of AI generation such as:
    - Unnatural facial features, inconsistent lighting, or artifacts in images/videos
    - Synthetic audio patterns, robotic speech, or unnatural voice characteristics
    - Metadata inconsistencies or compression artifacts typical of AI-generated content
    - Visual/audio quality that suggests artificial generation

    Return ONLY a valid JSON response with this exact format:
    {
      "deepfake_status": "deepfake" or "real",
      "confidence": number between 0 and 1,
      "source": "possible origin or source type detailed (max 5)",
      "context": "short explanation (75 words max)"
    }`;

    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: prompt
            },
            {
              inline_data: {
                mime_type: mimeType,
                data: base64Data
              }
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.1,
        topK: 32,
        topP: 1,
        maxOutputTokens: 4096,
      }
    };

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Gemini API error: ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    
    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      throw new Error('Invalid response from Gemini API');
    }

    const textResponse = data.candidates[0].content.parts[0].text;
    
    // Parse the JSON response
    try {
      // Clean the response to extract JSON
      const jsonMatch = textResponse.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No valid JSON found in response');
      }
      
      const parsedResponse = JSON.parse(jsonMatch[0]);
      
      // Validate the response structure
      if (!parsedResponse.deepfake_status || 
          typeof parsedResponse.confidence !== 'number' ||
          !parsedResponse.source || 
          !parsedResponse.context) {
        throw new Error('Invalid response format from Gemini');
      }

      return parsedResponse;
    } catch (parseError) {
      console.error('Failed to parse Gemini response:', textResponse);
      // Return a fallback response
      return {
        deepfake_status: "real",
        confidence: 0.5,
        source: "Analysis inconclusive",
        context: "Unable to determine authenticity due to analysis limitations"
      };
    }

  } catch (error) {
    console.error('Error analyzing file with Gemini:', error);
    throw error;
  }
};
