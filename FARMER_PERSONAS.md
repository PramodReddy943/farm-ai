# FarmAI - Farmer Personas & User Research

## 👨‍🌾 Overview

FarmAI targets small to medium-sized farmers (1-50 hectares) across India, with focus on:
- Crop farmers (vegetables, grains, spices)
- Operating in semi-urban to rural areas
- With basic to intermediate tech literacy
- Facing common pest & disease challenges
- Seeking affordable farming solutions

---

## 🧑‍🌾 Persona 1: Rajesh Kumar (Traditionalist)

| Attribute | Details |
|-----------|---------|
| **Age** | 45-55 years |
| **Experience** | 20+ years farming |
| **Tech Level** | Basic (has smartphone, rarely apps) |
| **Location** | Punjab, rice/wheat farmer |
| **Farm Size** | 8-12 hectares |
| **Income** | ₹300,000-400,000/year |
| **Family** | Wife, 2 grown kids (1 in city) |
| **Language** | Punjabi, some Hindi |

### Needs
- **Primary**: Identify crop diseases quickly without calling agronomist
- **Secondary**: Find medicines available locally
- **Pain**: Trusts neighbors' advice more than apps initially
- **Motivation**: Protect crop yield, reduce losses, save money

### Device Usage
- Smartphone: Samsung/Xiaomi Android phone
- **Comfort**: Calls, WhatsApp, basic browsing
- **Challenge**: Struggles with complex interfaces, prefers voice input
- **Data**: Uses 2G-4G inconsistently (rural connectivity)

### FarmAI Use Case
1. **Sees leaf disease** → Takes photo with FarmAI
2. **Gets AI diagnosis** → "Powdery mildew"
3. **Gets medicine recommendation** → "Sulfur spray from local dealer"
4. **Asks chatbot** → "How to apply this?" (if can find FAQ)

### Ideal Features
- ✅ Simple, large buttons
- ✅ Text + images combined
- ✅ Local medicine dealer list (WhatsApp ready)
- ✅ Offline mode for photos
- ✅ Familiar disease names
- ❌ Social features, complex workflows

### Sample Quote
*"My son told me about this app. I took a picture of my wheat, and it told me what's wrong. Better than paying the agronomist ₹500 for a visit!"*

---

## 👩‍🌾 Persona 2: Priya Singh (Modern Farmer)

| Attribute | Details |
|-----------|---------|
| **Age** | 28-35 years |
| **Experience** | 8-12 years farming |
| **Tech Level** | Advanced (tries new apps, blogs about farming) |
| **Location** | Haryana, vegetable farmer |
| **Farm Size** | 3-5 hectares |
| **Income** | ₹150,000-250,000/year |
| **Family** | Married, small kids, husband works in city |
| **Language** | Hindi, English |

### Needs
- **Primary**: Maximize yield with scientific approach
- **Secondary**: Share learnings with farming community
- **Pain**: Information scattered across TV, YouTube, FarmersApp
- **Motivation**: Career growth, prove farming is profitable, inspire daughters

### Device Usage
- Smartphone: iPhone or Samsung flagship
- **Comfort**: Multiple apps, Instagram, YouTube
- **Challenge**: Wants detailed information, reliable sources
- **Data**: Good 4G connectivity in area

### FarmAI Use Case
1. **Daily farm check** → Opens FarmAI dashboard
2. **Sees crop alert** → "High humidity - fungal risk"
3. **Asks chatbot** → "Should I spray sulfur or wait?"
4. **Applies advice** → Documents in farm journal
5. **Shares result** → "This app saved my yield!" on WhatsApp group

### Ideal Features
- ✅ Detailed explanations (why this disease)
- ✅ ChatGPT-like conversational AI
- ✅ Weather-based alerts (proactive)
- ✅ Save and share results
- ✅ Educational content
- ✅ Community discussion potential
- ❌ Overly simple interface

### Sample Quote
*"FarmAI is like having a botanist in my pocket. I can ask 'why' questions and get real answers, not just 'do this because I said so'."*

---

## 👥 Persona 3: Farmer Group (Cooperative)

| Attribute | Details |
|-----------|---------|
| **Group Size** | 20-50 members |
| **Location** | Maharashtra, cotton collective |
| **Tech Lead** | Usually 1 young farmer (25-30) |
| **Typical Farm Size** | 2-3 hectares per member |
| **Group Coordination** | WhatsApp groups, monthly meetings |
| **Decision Making** | Consensus-based |

### Needs
- **Primary**: Group bulk purchases of seeds/medicines at discounts
- **Secondary**: Coordinate timing (when to plant, spray)
- **Pain**: Information lost in WhatsApp groups, mixed advice
- **Motivation**: Collective learning, lower costs, peer support

### FarmAI Use Case
1. **Farmer A finds disease** → Scans in FarmAI
2. **Shares photo + diagnosis** → Posts in group WhatsApp
3. **Tech lead researches** → Adds local medicine suppliers
4. **Group decides** → "Buy 50 liters together, save 30%"
5. **All benefit** → Successful treated crops

### Ideal Features
- ✅ Easy screenshot sharing
- ✅ Group purchasing connections
- ✅ Bulk discounts for medicines
- ✅ WhatsApp integration
- ✅ Regional dealer/supplier mappings
- ✅ Cost estimations
- ❌ Advanced analytics

### Sample Quote
*"Our farming group uses FarmAI together. When one person scans a disease, we all learn about it and buy the medicine together."*

---

## 📊 Target User Distribution

```
Traditionalist (Rajesh type):     40% of users
Modern Farmer (Priya type):       45% of users
Group/Cooperative:                15% of users

Age Distribution:
- 18-25: 5% (young entrants)
- 25-35: 30% (tech-savvy)
- 35-50: 50% (experienced)
- 50+: 15% (retiring/mentor)

Tech Literacy:
- Beginner: 35%
- Intermediate: 50%
- Advanced: 15%

Farm Sizes:
- <5 hectares: 40%
- 5-15 hectares: 45%
- 15+ hectares: 15%
```

---

## 🎯 User Journeys

### Journey 1: Disease Detection (Most Common)

```
1. Problem
   └─ "My leaves have brown spots"
   
2. Action
   └─ Opens FarmAI
   
3. Navigation
   └─ "Scan Disease" button
   
4. Input
   └─ Takes clear photo of affected leaf
   
5. AI Processing
   └─ Gemini API analyzes (2-3 seconds)
   
6. Results
   └─ Shows: Disease name (e.g., "Early Blight")
              Confidence: 92%
              Description & symptoms
   
7. Solution
   └─ Scrolls to medicines
   └─ Sees: Medicine name, dosage, local dealers
   
8. Action
   └─ Calls local agroshop or WhatsApp them
   └─ Buys medicine & applies
   
9. Follow-up
   └─ Saves scan for history
   └─ Checks results in 1 week
```

**Time**: 2-3 minutes  
**Key Moments**: Taking good photo, showing results, medicine location

---

### Journey 2: Weather-Based Advisory

```
1. Trigger
   └─ App sends notification: "High humidity alert"
   
2. Context
   └─ User opens Weather section
   └─ Sees: 7-day forecast, humidity %, rainfall
   
3. AI Advisory
   └─ Chatbot says: "Your area entering fungal season.
                     Spray sulfur in next 2 days."
   
4. Decision
   └─ User asks: "Is my crop already affected?"
   └─ Gets: "Check for white powder on leaves"
   
5. Action
   └─ Checks farm today
   └─ Scans any suspicious leaves
   
6. Result
   └─ Early detection
   └─ Prevention instead of treatment
   └─ Better yield
```

**Time**: 5-10 minutes (spread over week)  
**Key Moments**: Timely alerts, actionable advice

---

### Journey 3: Learning & Questions

```
1. Curiosity
   └─ Farmer: "Why do crops get rust?"
   
2. Search
   └─ Opens Chatbot
   └─ Asks in natural language
   
3. Response
   └─ Gets detailed explanation:
      - What causes it
      - Why this season
      - How to prevent
      - Treatment options
   
4. Follow-up
   └─ Asks more questions
   └─ Builds understanding
   
5. Application
   └─ Applies knowledge to farm
   └─ Shares with neighbors
```

**Time**: 10-15 minutes per session  
**Key Moments**: Natural conversation, detailed answers

---

## 💡 Feature Prioritization by Persona

| Feature | Rajesh (40%) | Priya (45%) | Group (15%) | Priority |
|---------|---|---|---|---|
| **Disease Scanner** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | P0 |
| **Medicine Database** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | P0 |
| **Local Dealers** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | P0 |
| **Weather Forecast** | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | P1 |
| **Chatbot** | ⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | P1 |
| **Save History** | ⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | P2 |
| **Community Posts** | ⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | P3 |
| **Yield Analytics** | ⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐ | P3 |

---

## 🎨 UX Principles for Each Persona

### For Rajesh (Traditionalist)
1. **Simple is Beautiful**: Fewer options, bigger text
2. **Reduce Friction**: Minimal steps to get answer
3. **Trust Markers**: Show credibility (AI by Google, etc.)
4. **Familiar Terms**: Use common disease names
5. **Offline First**: Cache photos, work without internet

### For Priya (Modern Farmer)
1. **Depth > Breadth**: Detailed explanations, why not just what
2. **Conversational**: Chat interface feels natural
3. **Learn & Share**: Save and export results
4. **Customization**: Preferences for crop type, region
5. **Social Proof**: See what other farmers did

### For Groups
1. **Shareable**: Easy screenshot/link sharing
2. **Collaborative**: Group decision support
3. **Cost Focus**: Show bulk discounts, savings
4. **Integration**: Works with WhatsApp workflow
5. **Admin Tools**: Group lead can manage

---

## 🗣️ User Interview Insights

### Common Quotes

**Pain Points:**
- *"Agronomist charges ₹500-1000 per visit, takes 2 days"*
- *"I don't trust random YouTube videos anymore"*
- *"My neighbors have the same problem but different advice"*
- *"Medicine names are confusing - there are 5 brands for same thing"*
- *"I don't understand English, and Hindi apps are bad"*

**Motivations:**
- *"I want my kids to see farming is a real career"*
- *"Saving costs means feeding my family better"*
- *"If I prevent diseases early, I sleep better"*
- *"Modern farming is just farming smarter"*

**Tech Attitudes:**
- *"Apps are helpful if they're actually useful, not just flashy"*
- *"WhatsApp is the only thing that truly works in my village"*
- *"I like watching YouTube shorts but can't follow long tutorials"*
- *"Face-to-face advice is still important"*

---

## 📈 Success Metrics by Persona

### For Rajesh
- [ ] Can scan disease and get results in <1 minute
- [ ] Can find medicine dealer within 5 minutes
- [ ] Reduces cost of agronomist calls by 50%
- [ ] Uses app 2-3 times per season

### For Priya
- [ ] Opens app daily (habit formation)
- [ ] Applies chatbot advice to farm
- [ ] Shares results in farming community
- [ ] Reduces fertilizer.pesticide spending 30% through prevention

### For Groups
- [ ] 5+ members in group using app
- [ ] Coordinate 2+ bulk purchases/season
- [ ] Saves ₹10,000+ collectively per purchase

---

## 🔄 Evolution Path

### Year 1 (MVP)
- Personalization by region
- Medicine dealer network
- Basic community features (read-only)

### Year 2
- Marketplace for medicines
- Yield tracking & predictions
- Advanced chatbot with video
- e-commerce integration

### Year 3
- IoT sensor integration
- Insurance partnerships
- Government subsidy finder
- Farmer lending/credit integration

---

## 📋 Design Implications

### For Rajesh
- Large touch targets (44px minimum)
- Sans-serif font (easy on vision)
- Color-coded severity (red = urgent)
- Offline-capable architecture
- Hindi/Punjabi language option

### For Priya
- Detailed explanations (collapsible)
- Save & share functionality
- History timeline
- Integration suggestions
- Advanced filter options

### For Groups
- Share-to-WhatsApp buttons
- Bulk order calculator
- Group member list
- Vote/poll feature
- Cost split calculator

---

## 🚀 Go-to-Market Strategy

### Phase 1: Rajesh (Traditionalists)
- Focus: Disease detection accuracy
- Channel: Farming communities, local WhatsApp groups
- Proof: Video testimonials of cost savings

### Phase 2: Priya (Modern Farmers)
- Focus: Holistic farm management
- Channel: Instagram, agricultural blogs, agritech forums
- Proof: Data showing yield improvement

### Phase 3: Groups (Cooperatives)
- Focus: Collective benefits
- Channel: Direct partnerships with farm organizations
- Proof: ₹ saved through bulk purchases

---

**Personas v1.0 - Final**  
Created: March 2024  
Last Updated: March 2024
