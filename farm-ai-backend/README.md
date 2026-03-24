# FarmAI Backend API

## Overview

Node.js + Express.js REST API backend for FarmAI - an AI-powered farming assistant application.

## Features

- **Authentication** - JWT-based user registration and login
- **Farm Management** - Create and manage farm profiles
- **Disease Detection** - Gemini AI-powered disease analysis from images
- **Medicine Database** - Disease-specific medicine recommendations
- **Weather Integration** - Real-time weather forecasts and crop alerts
- **Chat Assistant** - Multi-turn conversation with AI farming expert
- **Database** - MongoDB for persistent data storage

## Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js 4.18
- **Language**: TypeScript
- **Database**: MongoDB
- **AI**: Google Gemini API
- **Authentication**: JWT + bcryptjs
- **API Documentation**: RESTful endpoints

## Project Structure

```
farm-ai-backend/
├── src/
│   ├── server.ts          # Express app entry point
│   ├── routes/            # API route handlers
│   │   ├── auth.ts        # Authentication endpoints
│   │   ├── farm.ts        # Farm CRUD operations
│   │   ├── disease.ts     # Disease scan endpoints
│   │   ├── medicine.ts    # Medicine database
│   │   ├── weather.ts     # Weather endpoints
│   │   └── chat.ts        # Chatbot endpoints
│   ├── models/            # Mongoose schemas
│   │   ├── User.ts
│   │   ├── Farm.ts
│   │   ├── DiseaseScan.ts
│   │   ├── Medicine.ts
│   │   └── ChatMessage.ts
│   ├── middleware/        # Express middleware
│   │   ├── authenticate.ts
│   │   ├── errorHandler.ts
│   │   └── requestLogger.ts
│   ├── utils/             # Utility functions
│   │   ├── gemini-service.ts
│   │   └── weather-service.ts
│   └── controllers/       # Business logic (optional)
├── dist/                  # Compiled JavaScript (build output)
├── package.json
├── tsconfig.json
└── .env.example
```

## Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- MongoDB 4.4+ (local or MongoDB Atlas)
- Google Gemini API key

### Setup Steps

1. **Install dependencies**
   ```bash
   cd farm-ai-backend
   npm install
   ```

2. **Configure environment**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your configuration:
   - `MONGODB_URI` - MongoDB connection string
   - `GEMINI_API_KEY` - Google Gemini API key (get from [Google AI Studio](https://makersuite.google.com/app/apikey))
   - `JWT_SECRET` - Change to a strong secret
   - `CORS_ORIGIN` - Frontend URL (default: http://localhost:3000)

3. **Start development server**
   ```bash
   npm run dev
   ```
   Server runs on http://localhost:5000

4. **Build for production**
   ```bash
   npm run build
   npm start
   ```

## API Endpoints

### Authentication
```
POST /api/auth/register
  Body: { username, email, password, phone? }
  Response: { token, user: { id, username, email } }

POST /api/auth/login
  Body: { email, password }
  Response: { token, user: { id, username, email } }
```

### Farm Management
```
GET /api/farm/:id
  Headers: Authorization: Bearer {token}
  Response: { id, name, size, location, crops, soilType, ... }

POST /api/farm
  Headers: Authorization: Bearer {token}
  Body: { name, size, location, crops?, soilType? }
  Response: { id, ...farm data }

PUT /api/farm/:id
  Headers: Authorization: Bearer {token}
  Body: { name?, size?, location?, crops?, soilType? }
  Response: { id, ...updated farm data }

DELETE /api/farm/:id
  Headers: Authorization: Bearer {token}
  Response: { message: "Farm deleted successfully" }
```

### Disease Detection
```
POST /api/disease/scan
  Headers: Authorization: Bearer {token}
  Body: { imageBase64, cropType }
  Response: { id, disease_name, confidence, treatments, ... }

POST /api/disease/symptoms
  Headers: Authorization: Bearer {token}
  Body: { crop, symptoms: [...], weather }
  Response: { id, possible_diseases: [...] }

GET /api/disease/:id
  Headers: Authorization: Bearer {token}
  Response: { id, diseaseName, confidence, treatments, ... }

GET /api/disease/history/:limit?
  Headers: Authorization: Bearer {token}
  Response: [{ id, diseaseName, date, confidence, ... }]
```

### Medicine Database
```
GET /api/medicines?disease=powdery_mildew&name=sulfur
  Response: [{ id, name, activeIngredient, dosage, diseases, ... }]

GET /api/medicines/:id
  Response: { id, name, activeIngredient, dosage, localDealers, onlineLinks, ... }

POST /api/medicines (Admin)
  Body: { name, activeIngredient, dosage, diseases, price?, localDealers?, ... }
  Response: { id, ...medicine data }
```

### Weather & Alerts
```
GET /api/weather/:farmId
  Headers: Authorization: Bearer {token}
  Response: { weather: {...}, alerts: [...], location, crops }
```

### Chatbot
```
POST /api/chat
  Headers: Authorization: Bearer {token}
  Body: { message, farmId? }
  Response: { id, userMessage, assistantResponse }

GET /api/chat/history/:farmId?
  Headers: Authorization: Bearer {token}
  Response: [{ id, userMessage, assistantResponse, createdAt, ... }]
```

### Health Check
```
GET /health
  Response: { status: "Server is running", timestamp }
```

## Environment Variables

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/farm-ai

# Security
JWT_SECRET=change-me-in-production
JWT_EXPIRE=7d

# CORS
CORS_ORIGIN=http://localhost:3000

# AI
GEMINI_API_KEY=your_api_key_here

# Optional APIs
WEATHER_API_KEY=optional
CLOUDINARY_NAME=optional
CLOUDINARY_API_KEY=optional
CLOUDINARY_API_SECRET=optional
```

## Database Schema

### User
- `username` (String, unique)
- `email` (String, unique)
- `password` (String, hashed)
- `phone` (String)
- `location` (String)
- `farm` (Reference to Farm)
- `createdAt`, `updatedAt` (Timestamps)

### Farm
- `userId` (Reference to User)
- `name` (String)
- `size` (Number - hectares)
- `location` (String)
- `coordinates` ({ latitude, longitude })
- `crops` ([String])
- `soilType` (String)
- `createdAt`, `updatedAt` (Timestamps)

### DiseaseScan
- `userId` (Reference to User)
- `farmId` (Reference to Farm)
- `imageUrl` (String)
- `diseaseName` (String)
- `confidence` (Number 0-100)
- `geminiResponse` (Object)
- `symptoms` ([String])
- `treatments` ([String])
- `severity` (String: mild/moderate/severe)
- `cropType` (String)
- `createdAt`, `updatedAt` (Timestamps)

### Medicine
- `name` (String, unique)
- `activeIngredient` (String)
- `type` (String)
- `dosage` (String)
- `diseases` ([String])
- `safetyPeriod` (String)
- `price` (Number)
- `localDealers` ([String])
- `onlineLinks` ([String])
- `description` (String)
- `createdAt`, `updatedAt` (Timestamps)

### ChatMessage
- `userId` (Reference to User)
- `farmId` (Reference to Farm)
- `userMessage` (String)
- `assistantResponse` (String)
- `context` (Object)
- `createdAt` (Timestamp)

## Error Handling

All endpoints return standard error responses:

```json
{
  "error": "Error message",
  "status": 400,
  "timestamp": "2024-03-20T10:30:00.000Z"
}
```

Common status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict
- `500` - Internal Server Error

## Deployment

### Heroku / Railway / Render
1. Push code to Git
2. Set environment variables in platform dashboard
3. Platform auto-deploys on push

### Docker
```bash
docker build -t farm-ai-backend .
docker run -p 5000:5000 --env-file .env farm-ai-backend
```

### Manual Deployment
```bash
npm run build
npm start
```

## Development Tips

### Test API with curl
```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"farmer","email":"farmer@example.com","password":"pass123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"farmer@example.com","password":"pass123"}'

# Create farm (replace TOKEN)
curl -X POST http://localhost:5000/api/farm \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"My Farm","size":10,"location":"Punjab","crops":["wheat","rice"]}'
```

### MongoDB Local Setup
```bash
# Install MongoDB Community Edition
# https://docs.mongodb.com/manual/installation/

# Start MongoDB service
mongod

# Or use MongoDB Atlas (cloud)
# https://www.mongodb.com/cloud/atlas
```

## Performance Optimization

- Image compression before storage
- Database indexing on frequently queried fields
- API rate limiting (implement in production)
- Caching strategies for weather/medicine data
- Batch processing for large uploads

## Security Best Practices

- ✓ JWT authentication for protected routes
- ✓ Password hashing with bcryptjs
- ✓ CORS configured
- ✓ Helmet.js for security headers
- ✓ Input validation on all endpoints
- Todo: Rate limiting
- Todo: HTTPS enforcement in production
- Todo: SQL injection protection (using Mongoose)

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running: `mongod`
- Check `MONGODB_URI` in `.env`
- Verify connection string format

### Gemini API Errors
- Verify API key in `.env`
- Check rate limit (60 requests/minute free tier)
- Ensure image size < 20MB

### CORS Issues
- Check `CORS_ORIGIN` matches frontend URL
- Ensure `Authorization` header is included in requests

### Port Already in Use
```bash
# Linux/Mac: Find and kill process
lsof -i :5000
kill -9 <pid>

# Windows
netstat -ano | findstr :5000
taskkill /PID <pid> /F
```

## Roadmap (Phase 2+)

- [ ] Email notification system
- [ ] SMS alerts for crop warnings
- [ ] Advanced analytics/reporting
- [ ] IoT sensor integration
- [ ] Marketplace for medicines
- [ ] Video tutorials
- [ ] Multi-language support
- [ ] Mobile app (React Native)
- [ ] Prediction models (yield, disease risk)
- [ ] Government subsidies integration

## Contributing

1. Create feature branch: `git checkout -b feature/new-feature`
2. Make changes and test
3. Commit: `git commit -am 'Add feature'`
4. Push: `git push origin feature/new-feature`
5. Create Pull Request

## License

MIT License - See LICENSE file

## Support

For issues or questions, open an issue on GitHub or contact support.
