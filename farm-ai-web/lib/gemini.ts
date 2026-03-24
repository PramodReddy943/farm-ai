import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '')

export async function analyzeDiseaseImage(imageUrl: string): Promise<any> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro-vision-latest' })
    
    const prompt = `Analyze this crop image for diseases or health issues. Provide:
1. Disease/Issue Name
2. Confidence Score (0-100%)
3. Description of the disease
4. Visible symptoms
5. Recommended treatments/medicines (generic names)
6. Prevention methods
7. Severity level (Mild/Moderate/Severe)

Response Format - JSON:
{
  "disease_name": "",
  "confidence": 0,
  "description": "",
  "symptoms": [],
  "treatments": [],
  "prevention": [],
  "severity": ""
}`

    const response = await model.generateContent([
      {
        inlineData: {
          data: imageUrl,
          mimeType: 'image/jpeg',
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
    console.error('Error analyzing image:', error)
    throw error
  }
}

export async function analyzeSymptomsWithAI(crop: string, symptoms: string[], weather: string): Promise<any> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' })
    
    const prompt = `A farmer has reported the following on their ${crop}:
    
Symptoms: ${symptoms.join(', ')}
Weather/Climate: ${weather}

Based on this information, diagnose possible crop diseases. Provide:
1. List of possible diseases (ranked by probability)
2. For each disease: name, probability, description, and recommended treatments

Response Format - JSON:
{
  "possible_diseases": [
    {
      "name": "",
      "probability": 0,
      "description": "",
      "treatments": []
    }
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

export async function getCropAdvice(crop: string, location: string, weather: string): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' })
    
    const prompt = `As an agricultural expert, provide personalized advice for growing ${crop} in ${location} with current weather: ${weather}. Include:
1. Current seasonal recommendations
2. Disease monitoring tips
3. Pest management
4. Irrigation and fertilization advice
5. Harvesting timeline

Keep response concise and farmer-friendly.`

    const response = await model.generateContent(prompt)
    return response.response.text()
  } catch (error) {
    console.error('Error getting advice:', error)
    throw error
  }
}

export async function chatWithFarmAssistant(messages: Array<{ role: string; content: string }>, farmContext: any): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' })
    
    const systemPrompt = `You are an expert agricultural assistant helping farmers. The farmer is growing: ${farmContext.crops?.join(', ')} in ${farmContext.location}. Farm size: ${farmContext.size} hectares.
    
Be concise, practical, and farmer-friendly. Provide actionable advice.`

    const conversation = messages.map((msg) => ({
      role: msg.role as 'user' | 'model',
      parts: [{ text: msg.content }],
    }))

    const response = await model.generateContent({
      contents: conversation,
      systemInstruction: systemPrompt,
    })

    return response.response.text()
  } catch (error) {
    console.error('Error in chat:', error)
    throw error
  }
}

export default genAI
