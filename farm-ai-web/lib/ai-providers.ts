/**
 * AI Provider Configuration
 * Supports: Gemini, ChatGPT, Claude
 */

export type AIProvider = 'gemini' | 'chatgpt' | 'claude'

export interface AIMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  provider?: AIProvider
}

export interface AIConfig {
  provider: AIProvider
  apiKey: string
  model: string
}

const AI_CONFIGS: Record<AIProvider, { name: string; model: string; icon: string }> = {
  gemini: {
    name: 'Google Gemini',
    model: 'gemini-1.5-pro',
    icon: '🔍',
  },
  chatgpt: {
    name: 'ChatGPT',
    model: 'gpt-4-turbo',
    icon: '💬',
  },
  claude: {
    name: 'Claude',
    model: 'claude-3-opus',
    icon: '🤖',
  },
}

export function getAIConfig(provider: AIProvider): { name: string; model: string; icon: string } {
  return AI_CONFIGS[provider]
}

/**
 * Call Gemini API
 */
export async function callGemini(message: string, context?: string): Promise<string> {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY
  if (!apiKey) throw new Error('Gemini API key not configured')

  try {
    const response = await fetch('https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey,
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: context ? `${context}\n\nUser: ${message}` : message,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
      }),
    })

    const data = await response.json()
    if (data.contents?.[0]?.parts?.[0]?.text) {
      return data.contents[0].parts[0].text
    }
    throw new Error('Invalid Gemini response')
  } catch (error) {
    console.error('Gemini error:', error)
    throw error
  }
}

/**
 * Call ChatGPT API
 */
export async function callChatGPT(message: string, context?: string): Promise<string> {
  const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY
  if (!apiKey) throw new Error('OpenAI API key not configured')

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4-turbo',
        messages: [
          {
            role: 'system',
            content: context || 'You are a helpful agricultural assistant for farmers.',
          },
          {
            role: 'user',
            content: message,
          },
        ],
        temperature: 0.7,
        max_tokens: 1024,
      }),
    })

    const data = await response.json()
    if (data.choices?.[0]?.message?.content) {
      return data.choices[0].message.content
    }
    throw new Error('Invalid ChatGPT response')
  } catch (error) {
    console.error('ChatGPT error:', error)
    throw error
  }
}

/**
 * Call Claude API
 */
export async function callClaude(message: string, context?: string): Promise<string> {
  const apiKey = process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY
  if (!apiKey) throw new Error('Anthropic API key not configured')

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-opus-20240229',
        max_tokens: 1024,
        system: context || 'You are a helpful agricultural assistant for farmers.',
        messages: [
          {
            role: 'user',
            content: message,
          },
        ],
      }),
    })

    const data = await response.json()
    if (data.content?.[0]?.text) {
      return data.content[0].text
    }
    throw new Error('Invalid Claude response')
  } catch (error) {
    console.error('Claude error:', error)
    throw error
  }
}

/**
 * Call selected AI provider
 */
export async function callAI(
  provider: AIProvider,
  message: string,
  context?: string
): Promise<string> {
  switch (provider) {
    case 'gemini':
      return callGemini(message, context)
    case 'chatgpt':
      return callChatGPT(message, context)
    case 'claude':
      return callClaude(message, context)
    default:
      throw new Error(`Unknown AI provider: ${provider}`)
  }
}
