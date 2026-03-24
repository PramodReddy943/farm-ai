import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

export async function analyzeDiseaseWithGemini(imageBase64: string, mimeType: string = 'image/jpeg') {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro-vision-latest' })

    const prompt = `Analyze this crop image for diseases or health issues. Provide response ONLY as valid JSON (no markdown):
{
  "disease_name": "name of disease or 'Healthy'",
  "confidence": 0-100,
  "description": "brief description",
  "symptoms": ["symptom1", "symptom2"],
  "treatments": ["medicine1", "medicine2"],
  "prevention": ["method1", "method2"],
  "severity": "mild/moderate/severe"
}`

    const response = await model.generateContent([
      {
        inlineData: {
          data: imageBase64.replace(/^data:[^;]+;base64,/, ''),
          mimeType,
        },
      },
      prompt,
    ])

    const text = response.response.text()
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0])
    }
    
    return { error: 'Could not parse response' }
  } catch (error) {
    console.error('Error analyzing image with Gemini:', error)
    throw error
  }
}

export async function analyzeSymptoms(crop: string, symptoms: string[], weather: string) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' })

    const prompt = `A farmer reports these symptoms on ${crop}: ${symptoms.join(', ')} with ${weather} weather.
Diagnose possible diseases. Response ONLY as JSON:
{
  "possible_diseases": [
    {"name": "", "probability": 0-100, "description": "", "treatments": []}
  ]
}`

    const response = await model.generateContent(prompt)
    const text = response.response.text()
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0])
    }
    
    return { error: 'Could not parse response' }
  } catch (error) {
    console.error('Error analyzing symptoms:', error)
    throw error
  }
}

export async function getCropAdvice(crop: string, location: string, weather: string) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' })

    const prompt = `Give brief practical advice for growing ${crop} in ${location} with ${weather} weather. Keep it under 100 words and farmer-friendly.`

    const response = await model.generateContent(prompt)
    return response.response.text()
  } catch (error) {
    console.error('Error getting crop advice:', error)
    throw error
  }
}

export async function chatWithAI(messages: any[], farmContext: any) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' })

    const systemMessage = `You are an expert agricultural assistant. The farmer grows: ${farmContext.crops?.join(', ') || 'various crops'} in ${farmContext.location || 'their region'}. Be concise and practical.`

    const formattedMessages: any[] = messages.map((msg) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }],
    }))

    const response = await model.generateContent({
      contents: formattedMessages as any,
      systemInstruction: systemMessage,
    } as any)

    return response.response.text()
  } catch (error) {
    console.error('Error in chat:', error)
    throw error
  }
}
