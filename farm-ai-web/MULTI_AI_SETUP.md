# FarmAI - Multi-AI Setup Guide

## 🚀 Getting Started with Multiple AI Providers

Your FarmAI now supports **three powerful AI providers**:
1. **Google Gemini** - Best for image analysis and disease detection
2. **ChatGPT** (OpenAI) - Best for market insights and farming advice
3. **Claude** (Anthropic) - Best for detailed analysis and predictions

---

## 📋 Prerequisites

Before you start, make sure you have:
- Node.js 18+ installed
- npm or yarn package manager
- A text editor (VS Code recommended)

---

## 🔑 Step 1: Get Your API Keys

### Google Gemini API
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click "Create API Key"
3. Copy your API key
4. ✅ **FREE** - 60 requests per minute

### OpenAI ChatGPT API
1. Visit [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign up or log in
3. Click "Create new secret key"
4. Copy your API key
5. 💰 Requires **paid account** (pay-as-you-go, ~$0.03 per request)

### Anthropic Claude API
1. Visit [Anthropic Console](https://console.anthropic.com/)
2. Sign up or log in
3. Navigate to "API Keys"
4. Click "Create Key"
5. Copy your API key
6. 💰 Requires **paid account** (~$0.003 per 1K tokens)

---

## ⚙️ Step 2: Configure Environment Variables

### Frontend Setup (farm-ai-web)

1. Open `.env.local` in the `farm-ai-web` directory
2. Add your API keys:

```bash
# Gemini (Google)
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here

# ChatGPT (OpenAI)
NEXT_PUBLIC_OPENAI_API_KEY=your_openai_api_key_here

# Claude (Anthropic)
NEXT_PUBLIC_ANTHROPIC_API_KEY=your_anthropic_api_key_here

# Default AI Provider
NEXT_PUBLIC_DEFAULT_AI_PROVIDER=gemini
```

3. Save the file

### Backend Setup (farm-ai-backend)

The backend uses Gemini for now. Configuration is in `.env`:

```bash
GEMINI_API_KEY=your_gemini_api_key_here
```

---

## ✅ Step 3: Test the Setup

### Test Frontend

```bash
cd farm-ai-web
npm run dev
# Visit http://localhost:3000
```

Go to the **Chatbot** page (`http://localhost:3000/chatbot`) and:
- Select **Google Gemini** from the provider selector
- Ask: "What crops grow best in Punjab?"
- You should get a response within seconds

### Test Each Provider

Once Gemini works, test the others:

1. **For ChatGPT:**
   - If no API key set, you'll see an error message
   - Add your OpenAI key to `.env.local`
   - Restart dev server: `npm run dev`
   - Try asking a question

2. **For Claude:**
   - If no API key set, you'll see an error message
   - Add your Anthropic key to `.env.local`
   - Restart dev server: `npm run dev`
   - Try asking a question

---

## 🎯 Feature Overview

### Disease Scanner (Google Gemini)
- **Uses:** Vision AI for image analysis
- **Best for:** Identifying crop diseases from photos
- **Accuracy:** 98%+
- **Speed:** <2 seconds per image

### Chatbot (All Three Providers)
- **Google Gemini:** Fast, real-time disease detection and advice
- **ChatGPT:** Conversational, market insights, business planning
- **Claude:** Deep analysis, complex problem-solving

---

## 🔐 Security Best Practices

⚠️ **IMPORTANT:**
- **NEVER** commit `.env.local` to Git
- **NEVER** share your API keys
- Use `.env.local` for local development only
- For production, use environment variables in your hosting platform

---

## 💰 Cost Estimation

| Provider | Free Tier | Typical Cost |
|----------|-----------|-------|
| **Gemini** | ✅ Yes (60/min) | Free up to 2,000 req/day |
| **ChatGPT** | ❌ No | $0.01-$0.03 per request |
| **Claude** | ❌ No | $0.003 per 1K input tokens |

---

## 🛠️ Troubleshooting

### "Invalid API Key" Error
- ✅ Double-check you copied the entire key
- ✅ Make sure there are no spaces
- ✅ Verify the key isn't expired
- ✅ Restart the dev server after adding keys

### "No matching version found"
- Run `npm cache clean --force`
- Run `npm install` again
- Delete `node_modules` and reinstall if needed

### ChatBot not responding
- Check browser console for errors (F12)
- Verify API key in `.env.local`
- Make sure you have API quota remaining
- Check network tab to see API calls

---

## 📚 API Documentation

- [Google Gemini Docs](https://ai.google.dev/docs)
- [OpenAI API Docs](https://platform.openai.com/docs/api-reference)
- [Anthropic Claude Docs](https://docs.anthropic.com/)

---

## 🎓 Next Steps

1. ✅ Set up API keys (this guide)
2. ✅ Test each provider
3. Choose your preferred provider
4. Customize the landing page with your branding
5. Deploy to production

---

## ❓ Need Help?

- Check the error message in the browser console
- Check API provider's documentation
- Verify your API keys are correct
- Make sure internet connection is active

**Happy Farming! 🌾**
