# Quick Start Guide - FarmAI

This guide will get you up and running with FarmAI in 15 minutes.

## Prerequisites Check

Before starting, ensure you have:
- ✅ Node.js 18+ installed
- ✅ npm or yarn package manager
- ✅ Git installed (optional)
- ✅ A text editor (VS Code recommended)
- ✅ MongoDB 4.4+ OR MongoDB Atlas account

Run this to verify:
```bash
node --version    # Should be v18+
npm --version     # Should be v9+
```

## Step 1: Get API Keys (5 minutes)

### Google Gemini API Key (FREE)
1. Go to https://makersuite.google.com/app/apikey
2. Click "Create API Key"
3. Select your project
4. Copy the API key
5. Save it - you'll need it in Step 3

### MongoDB Setup (Choose ONE)

**Option A: Local MongoDB (Recommended for development)**
- Download: https://docs.mongodb.com/manual/installation/
- Start service: Run `mongod` in terminal
- Connection: `mongodb://localhost:27017/farm-ai`

**Option B: MongoDB Atlas (Cloud - Easiest)**
1. Sign up: https://www.mongodb.com/cloud/atlas
2. Create database
3. Get connection string
4. Looks like: `mongodb+srv://user:pass@cluster.mongodb.net/farm-ai`

## Step 2: Clone/Open Project

```bash
# Navigate to project folder
cd "Farm ai"

# You should see:
# - farm-ai-web/
# - farm-ai-backend/
# - README.md
```

## Step 3: Setup Backend

```bash
# Navigate to backend
cd farm-ai-backend

# Install dependencies (takes 1-2 min)
npm install

# Create environment file
cp .env.example .env

# Edit .env file and add:
```

Edit `.env` file:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/farm-ai
GEMINI_API_KEY=your_gemini_key_here
JWT_SECRET=your-super-secret-key-change-this
CORS_ORIGIN=http://localhost:3000
```

**Start backend**:
```bash
npm run dev
```

You should see:
```
╔════════════════════════════════════════╗
║         FarmAI Backend Server          ║
║                                        ║
║  Server running at:                    ║
║  http://localhost:5000                 ║
╚════════════════════════════════════════╝
```

✅ Backend is running! Keep this terminal open.

## Step 4: Setup Frontend

**In a NEW terminal:**
```bash
# Navigate to frontend
cd farm-ai-web

# Install dependencies (takes 1-2 min)
npm install

# Create environment file
cp .env.example .env.local

# Edit .env.local and add:
```

Edit `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_key_here
```

**Start frontend**:
```bash
npm run dev
```

You should see:
```
▲ Next.js 14.x
- Local:        http://localhost:3000
```

✅ Frontend is running!

## Step 5: Test the Application

1. **Open browser**: Go to http://localhost:3000
2. **You should see**:
   - FarmAI homepage with green header
   - Quick action buttons (Scan, Weather, Chat)
   - Navigation bottom menu

## Step 6: Test Main Features

### Test 1: Disease Scanner
1. Click "Scan Disease" button
2. Choose "Upload Image" or "Answer Questions"
3. For testing: Use any plant/leaf image or fill symptom questionnaire
4. View results

### Test 2: Weather
1. Click "Weather" in navigation
2. View 7-day forecast
3. See crop alerts

### Test 3: Farm Assistant Chat
1. Click "Chat" button
2. Type: "How to grow tomatoes?"
3. Get AI response

### Test 4: My Farm
1. Click "Farm" in navigation
2. Click "Edit" to add farm details
3. Save your farm information
4. View scan history

## Troubleshooting

### Issue: "Cannot find module"
```bash
# Solution: Reinstall dependencies
rm -rf node_modules
npm install
```

### Issue: Port 3000 already in use
```bash
# Find process using port
lsof -i :3000

# Kill it
kill -9 <PID>

# Or start on different port
PORT=3001 npm run dev
```

### Issue: Port 5000 already in use
```bash
# Find process using port
lsof -i :5000

# Kill it
kill -9 <PID>

# Or change PORT in .env
```

### Issue: MongoDB connection error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution**: 
- Ensure MongoDB is running: `mongod`
- Or use MongoDB Atlas connection string in .env

### Issue: Gemini API error
```
Error: Could not parse response
```
**Solution**:
- Verify your API key in .env files
- Check if rate limited (free tier: 60 req/min)

### Issue: CORS error in browser console
```
Access to XMLHttpRequest blocked by CORS policy
```
**Solution**:
- Check `CORS_ORIGIN` in backend `.env`
- Should be `http://localhost:3000`

## File Structure Reference

```
farm-ai-web/
├── app/                      # Pages
│   ├── page.tsx             # Home
│   ├── disease/scanner/     # Disease detection
│   ├── weather/             # Weather forecast
│   ├── chatbot/             # AI chat
│   └── myFarm/              # Farm profile
├── components/              # React components
├── lib/                     # Utilities & API
├── styles/                  # CSS
└── .env.local              # Your config (SECRET - don't commit)

farm-ai-backend/
├── src/
│   ├── routes/             # API endpoints
│   ├── models/             # Database schemas
│   ├── middleware/         # Auth & validation
│   └── utils/              # Helper functions
├── dist/                   # Compiled code (build output)
└── .env                    # Your config (SECRET - don't commit)
```

## API Endpoints Reference

```bash
# Health check
curl http://localhost:5000/health

# Register user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"demo","email":"demo@test.com","password":"pass123"}'

# Get weather
curl http://localhost:5000/api/weather

# Get medicines
curl http://localhost:5000/api/medicines?disease=powdery_mildew
```

## Next Steps After Setup

1. **Explore Codebase**
   - Check [farm-ai-web/README.md](./farm-ai-web/README.md) for frontend details
   - Check [farm-ai-backend/README.md](./farm-ai-backend/README.md) for backend details

2. **Customize**
   - Edit colors in [tailwind.config.ts](./farm-ai-web/tailwind.config.ts)
   - Add your API keys permanently
   - Configure Gemini AI prompts in [lib/gemini.ts](./farm-ai-web/lib/gemini.ts)

3. **Add Medicines Database**
   - Add real medicines to MongoDB
   - Connect to agricultural suppliers
   - Update local dealers in medicine documents

4. **Deploy**
   - Frontend: Deploy to Vercel
   - Backend: Deploy to Render or Railway
   - Database: Use MongoDB Atlas (already scalable)

## Development Commands

### Frontend
```bash
cd farm-ai-web

npm run dev     # Start development server
npm run build   # Create production build
npm run start   # Run production build
npm run lint    # Check code quality
npm test        # Run tests
```

### Backend
```bash
cd farm-ai-backend

npm run dev     # Start with ts-node
npm run build   # Compile TypeScript to JavaScript
npm start       # Run compiled version
npm test        # Run tests
npm run lint    # Check code quality
```

## Environment Variables Explained

### Backend (.env)
| Variable | Purpose | Example |
|----------|---------|---------|
| `PORT` | Server port | `5000` |
| `MONGODB_URI` | Database connection | `mongodb://localhost:27017/farm-ai` |
| `GEMINI_API_KEY` | Google AI key | `AIzaSy...` |
| `JWT_SECRET` | Auth token secret | `super-secret-key` |
| `CORS_ORIGIN` | Allowed frontend URL | `http://localhost:3000` |

### Frontend (.env.local)
| Variable | Purpose | Example |
|----------|---------|---------|
| `NEXT_PUBLIC_API_URL` | Backend server URL | `http://localhost:5000` |
| `NEXT_PUBLIC_GEMINI_API_KEY` | Google AI key | `AIzaSy...` |

## Security Notes

⚠️ **IMPORTANT**: Never commit `.env` or `.env.local` files!

Already configured in `.gitignore`:
```
.env
.env.local
.env.*.local
```

To keep secrets safe:
1. Create `.env` files locally
2. Share `.env.example` with team
3. Never push real keys to Git
4. Use `.env.example` as template

## Getting Help

1. **Check error message** - Usually very descriptive
2. **Look at console logs**:
   - Browser: F12 → Console tab
   - Backend terminal: Shows request logs
3. **Check documentation**:
   - Frontend: [farm-ai-web/README.md](./farm-ai-web/README.md)
   - Backend: [farm-ai-backend/README.md](./farm-ai-backend/README.md)
   - Design: [FIGMA_DESIGN_SPECS.md](./FIGMA_DESIGN_SPECS.md)

## Common Commands Cheat Sheet

```bash
# Start everything (in separate terminals)
cd farm-ai-backend && npm install && npm run dev
cd farm-ai-web && npm install && npm run dev

# Test API endpoint
curl http://localhost:5000/health

# View MongoDB
mongosh  # or mongo (older versions)

# Clear cache
npm cache clean --force

# Update packages
npm update

# Remove & reinstall
rm -rf node_modules package-lock.json
npm install
```

## Time Estimates

- Setup Backend: 5 min (+ npm install)
- Setup Frontend: 5 min (+ npm install)
- First test run: 2 min
- **Total: ~15-20 minutes**

---

**You're all set! 🚀**

Start building the next generation of farming technology!

For questions, check the main [README.md](./README.md) or detailed documentation.
