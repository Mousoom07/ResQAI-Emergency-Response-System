require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { classifyIncident } = require('./geminiService');

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Basic logger (helps debugging)
app.use((req, res, next) => {
  console.log(`➡️ ${req.method} ${req.url}`);
  next();
});

// =====================================================
// 🔥 AI CLASSIFICATION ROUTE (MAIN)
// =====================================================
app.post('/api/classify', async (req, res) => {
  try {
    const { description, floor, crisisType } = req.body;

    // ✅ Validation
    if (!description || description.trim() === '') {
      return res.status(400).json({
        error: 'Description is required'
      });
    }

    const result = await classifyIncident(description, floor, crisisType);

    res.json(result);

  } catch (err) {
    console.error('❌ AI ERROR:', err.message);

    // ✅ Safe fallback (VERY IMPORTANT)
    res.status(500).json({
      severity: 'YELLOW',
      summary: 'AI unavailable — proceed with caution',
      sop: [
        'Stay calm',
        'Move to safe area',
        'Wait for responders'
      ]
    });
  }
});

// =====================================================
// 🧪 SIMULATION ROUTE (GREAT FOR DEMO)
// =====================================================
app.post('/api/simulate', async (req, res) => {
  try {
    const scenarios = {
      fire: {
        description: 'Smoke smell floor 3 room 302',
        floor: '3',
        room: '302',
        crisisType: 'fire'
      },
      medical: {
        description: 'Guest collapsed in lobby unconscious',
        floor: '1',
        room: 'Lobby',
        crisisType: 'medical'
      },
      security: {
        description: 'Aggressive intruder at main entrance',
        floor: 'G',
        room: 'Entrance',
        crisisType: 'security'
      }
    };

    const scene = scenarios[req.body.type] || scenarios.fire;

    const ai = await classifyIncident(
      scene.description,
      scene.floor,
      scene.crisisType
    );

    res.json({
      ...scene,
      ...ai
    });

  } catch (err) {
    console.error('❌ Simulation error:', err.message);

    res.status(500).json({
      error: 'Simulation failed'
    });
  }
});

// =====================================================
// ❤️ HEALTH CHECK
// =====================================================
app.get('/api/health', (_, res) => {
  res.json({
    status: 'ok',
    time: new Date(),
  });
});

// =====================================================
// 🚨 (NEW) ALERT LOGGING SYSTEM (VERY USEFUL)
// =====================================================
let alerts = [];

app.post('/api/sos', (req, res) => {
  const incident = {
    id: Date.now(),
    ...req.body,
    createdAt: new Date()
  };

  alerts.push(incident);

  console.log('🚨 NEW SOS ALERT:', incident);

  res.json({
    success: true,
    incident
  });
});

app.get('/api/alerts', (req, res) => {
  res.json(alerts);
});

// =====================================================
// 🌐 ROOT ROUTE (FOR DEMO / PPT)
// =====================================================
app.get('/', (req, res) => {
  res.send('🚀 ResQAI Backend Running Successfully');
});

// =====================================================
// 🚀 START SERVER
// =====================================================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🔥 Backend running on port ${PORT}`);
});