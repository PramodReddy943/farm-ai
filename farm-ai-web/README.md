# FarmAI - Mobile-First Web App

## Project Structure

```
farm-ai-web/
├── app/                      # Next.js App Router
│   ├── api/                  # API routes
│   ├── disease/scanner/      # Disease scan page
│   ├── weather/              # Weather forecast page
│   ├── chatbot/              # AI chatbot page
│   ├── myFarm/               # Farm profile page
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Home/Dashboard
│   └── providers.tsx         # Context providers
├── components/               # React components
│   ├── ui/                   # Base UI components
│   ├── Navigation.tsx        # Bottom navigation
│   ├── DiseaseScanner.tsx    # Image upload & camera
│   ├── ChatBot.tsx           # AI chatbot interface
│   ├── WeatherWidget.tsx     # Weather display
│   └── ...                   # Other components
├── lib/                      # Utilities & services
│   ├── api-client.ts         # Axios instance for API calls
│   ├── gemini.ts             # Google Gemini AI integration
│   ├── store.ts              # Zustand state management
│   ├── context/              # React Context providers
│   └── utils.ts              # Helper functions
├── styles/                   # CSS
│   └── globals.css           # Global styles
├── public/                   # Static assets
├── package.json
├── tsconfig.json
├── next.config.js
├── tailwind.config.ts
└── .env.example
```

## Features

### Core Modules
1. **Disease Scanner** - Upload images or describe symptoms for AI-powered disease detection
2. **Medicine Recommendations** - Get personalized treatment suggestions
3. **Weather Integration** - 7-day forecast with crop-specific alerts
4. **AI Chatbot** - Ask farming questions and get expert advice
5. **Farm Profile** - Manage farm details and view scan history

## Setup & Installation

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Quick Start

1. **Install dependencies**
   ```bash
   cd farm-ai-web
   npm install
   ```

2. **Configure environment**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` and add your API keys:
   - `NEXT_PUBLIC_GEMINI_API_KEY` - Get from [Google AI Studio](https://makersuite.google.com/app/apikey)
   - `NEXT_PUBLIC_API_URL` - Backend server URL (default: http://localhost:5000)

3. **Run development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in browser

4. **Build for production**
   ```bash
   npm run build
   npm run start
   ```

## Key Technologies

- **Framework**: Next.js 14+ (React 18)
- **Styling**: Tailwind CSS + CSS Animations
- **State Management**: Zustand + React Context
- **AI Integration**: Google Gemini API (Vision + Generative)
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Language**: TypeScript

## Mobile Responsiveness

- **Mobile First**: Designed for 375px+ (iPhone SE and above)
- **Tablet**: 768px+ breakpoints
- **Desktop**: 1024px+ layouts
- **Touch Friendly**: 44px+ tap targets
- **Safe Area Support**: iOS notch and navigation bar support

## API Endpoints (Backend)

The app expects the following API endpoints:

```
POST   /api/auth/login
POST   /api/auth/register
GET    /api/farm/:id
PUT    /api/farm/:id
POST   /api/disease/scan
GET    /api/medicines?disease=powdery_mildew
GET    /api/weather/:farmId
POST   /api/chat
```

## Gemini AI Integration

### Implemented Features
- **Disease Image Analysis** - Upload photo, get disease name and confidence
- **Symptom Questionnaire** - Answer questions for disease diagnosis
- **Medicine Recommendations** - Get treatment suggestions
- **Crop Advisory** - Personalized farming advice
- **Chatbot** - Multi-turn farming assistant

### Setup Gemini API
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add to `.env.local`: `NEXT_PUBLIC_GEMINI_API_KEY=your_key`
4. Note: Free tier limited to 60 requests/minute

## Performance Optimization

- **Image Optimization**: Next.js Image component for responsive images
- **Bundle Size**: ~100KB gzipped main bundle
- **Lazy Loading**: Dynamic imports for routes
- **Code Splitting**: Automatic with Next.js
- **CSS Optimization**: Tailwind CSS with purging

## Browser Support

- Chrome/Edge 90+
- Safari 14+
- Firefox 88+
- Mobile browsers (iOS Safari, Chrome Android)

## Contributing

1. Create feature branch: `git checkout -b feature/your-feature`
2. Make changes and test locally
3. Push to origin: `git push origin feature/your-feature`
4. Create Pull Request

## Deployment

### Vercel (Recommended for Next.js)
```bash
npm install -g vercel
vercel
```

### Docker
```bash
docker build -t farm-ai-web .
docker run -p 3000:3000 farm-ai-web
```

### Manual Deployment
```bash
npm run build
npm run start
```

## Troubleshooting

### API Connection Issues
- Ensure backend server is running on the configured port
- Check `NEXT_PUBLIC_API_URL` in `.env.local`
- Verify CORS settings on backend

### Gemini API Errors
- Verify API key is correct
- Check rate limits (60 requests/minute)
- Ensure image is < 20MB for vision API

### Mobile Issues
- Clear browser cache and localStorage
- Test in incognito mode
- Check mobile viewport in DevTools

## Roadmap (Phase 2+)

- [ ] Map integration for farm location
- [ ] Email notifications for crop alerts
- [ ] OCR for medicine package scanning
- [ ] Offline-first PWA support
- [ ] E-commerce integration for medicine purchase
- [ ] Community forum for farmer discussion
- [ ] IoT sensor integration
- [ ] Multi-language support
- [ ] Advanced analytics dashboard
- [ ] Video tutorials for disease management

## License

MIT License - See LICENSE file

## Support

For issues or questions, please create an issue in the repository.
