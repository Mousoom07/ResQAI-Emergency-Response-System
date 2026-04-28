# 🚨 ResQAI — Smart Emergency Response System

**AI-powered real-time emergency alert and response platform with live tracking, intelligent classification, and offline support.**

---

## 📌 Overview

ResQAI is a modern emergency response system designed to **detect, classify, and respond to crisis situations instantly**. It combines **AI intelligence, real-time location tracking, and live communication** to ensure faster and smarter emergency handling.

Users can trigger SOS alerts, automatically analyze the situation using AI, and visualize responder movement in real-time.

---

## 🎯 Key Objectives

* ⚡ Enable instant emergency reporting
* 🤖 Use AI to classify incidents & generate response plans
* 📍 Provide real-time location tracking
* 👨‍🚒 Simulate responder movement (live tracking UI)
* 🌐 Ensure offline fallback capability

---

## 🧠 Features

### 🚨 Emergency SOS System

* One-tap SOS trigger
* Emergency categories: Fire, Medical, Security, Flood, Other
* Voice SOS support (optional)

---

### 🤖 AI Response Engine

* Classifies severity (RED / YELLOW / GREEN)
* Generates AI-based response plan
* Provides immediate action steps

---

### 📍 Live Location Tracking

* Uses browser Geolocation API
* Displays incident location on map
* Shows coordinates (lat/lng)

---

### 🗺️ Interactive Map

* Built with Leaflet & React-Leaflet
* User location marker
* 👨‍🚒 Simulated responder tracking
* 🔴 Live movement toward incident
* 🔥 Route line between user & responder

---

### 💬 Live Chat Interface

* Real-time chat UI with staff
* Ready for backend integration

---

### 🌐 Offline Support

* Service worker integration
* Saves incidents offline
* Syncs when internet is restored

---

### 🎨 Modern UI/UX

* Glassmorphism design
* Gradient dark theme
* Smooth animations (Framer Motion)
* Responsive layout

---

## 🛠️ Tech Stack

### 💻 Frontend

* React.js
* Framer Motion
* React Router
* React Hot Toast

---

### 🗺️ Maps & Location

* Leaflet.js
* React-Leaflet
* Geolocation API

---

### 🔥 Backend / Services

* Firebase (Auth + Database)
* Service Workers (offline support)

---

### 🤖 AI Integration

* Gemini / OpenAI API
* Natural language processing for incident classification

---

## 🧩 Project Structure

```bash
frontend/
 ├── src/
 │   ├── components/
 │   │   ├── IncidentMap.jsx
 │   │   ├── LiveChat.jsx
 │   │   ├── Navbar.jsx
 │   │   └── ...
 │   ├── pages/
 │   │   ├── SOSPage.jsx
 │   │   ├── Dashboard.jsx
 │   │   └── ...
 │   ├── services/
 │   └── utils/
```

---

## ⚙️ Setup Instructions

### 1. Clone repository

```bash
git clone https://github.com/Mousoom07/ResQAI-Emergency-Response-System.git
cd ResQAI-Emergency-Response-System
```

---

### 2. Install dependencies

```bash
npm install
```

---

### 3. Run project

```bash
npm start
```

---

### 4. Open in browser

```
http://localhost:3000
```

---

## 🚀 Future Enhancements

* 📡 Real-time multi-user tracking
* 👨‍🚒 Live responder dashboard
* 📊 Incident analytics
* 📱 Mobile app version
* 🔔 Push notifications
* 🧠 Advanced AI multi-label classification

---

## 🛡️ Why ResQAI?

ResQAI brings together:

* ⚡ Speed (instant alerts)
* 🤖 Intelligence (AI classification)
* 📍 Awareness (real-time location tracking)

Making it a **next-generation emergency response system**.

---

## 👨‍💻 Author

**Mousoom Samanta**
**Anwesa Banerjee**

---

## 📜 License

MIT License

---

## © Copyright

© 2026 Mousoom Samanta, Anwesa Banerjee. All rights reserved.
