<div align="center">



# 🧠 MindFul — AI Mental Health Chatbot

**An empathetic AI-powered chatbot for supportive conversation, mental wellness guidance, and emotional well-being.**

[![Status](https://img.shields.io/badge/Status-In%20Development-orange?style=flat-square)](https://github.com)
[![Node.js](https://img.shields.io/badge/Node.js-v18+-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express.js-4.x-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen?style=flat-square)](CONTRIBUTING.md)

[Live Demo](#) · [Report Bug](../../issues) · [Request Feature](../../issues)

</div>

---

## 📸 Screenshots

> _(Coming soon — UI in active development)_

| Chat Interface | Wellness Dashboard | Mood Tracker |
|---|---|---|
| ![Chat](https://via.placeholder.com/280x180/6C63FF/ffffff?text=Chat+UI) | ![Dashboard](https://via.placeholder.com/280x180/4CAF50/ffffff?text=Dashboard) | ![Mood](https://via.placeholder.com/280x180/FF6B6B/ffffff?text=Mood+Tracker) |

---

## 📖 About The Project

**MindFul** is an AI-powered mental health chatbot designed to provide a safe, judgment-free space for users to express their feelings, receive supportive responses, and access wellness resources.

Unlike generic chatbots, MindFul is built with mental health context in mind — detecting emotional intent, responding empathetically, and escalating to professional resources when needed.

> ⚠️ **Disclaimer**: This chatbot is **not a replacement** for professional mental health care. If you are in crisis, please reach out to a licensed mental health professional or a crisis helpline.

---

## ✨ Features

| Feature | Status |
|---|---|
| 💬 AI-based empathetic conversation | ✅ Done |
| 🎯 Intent detection & response generation | ✅ Done |
| 🗂️ RESTful API backend (Node.js + Express) | ✅ Done |
| 🧘 Mental wellness support responses | 🔄 In Progress |
| 📊 Mood tracking over time | 🔜 Planned |
| 🔐 User authentication (JWT) | 🔜 Planned |
| 🎤 Voice chatbot integration | 🔜 Planned |
| 📈 Wellness insights dashboard | 🔜 Planned |
| 🤖 RAG-based knowledge retrieval | 🔜 Planned |

---

## 🛠️ Tech Stack

### Backend
| Technology | Purpose |
|---|---|
| **Node.js** | Runtime environment |
| **Express.js** | REST API framework |
| **MongoDB** | Database (planned) |
| **Mongoose** | ODM for MongoDB |
| **JWT** | Authentication (planned) |
| **dotenv** | Environment config |

### AI / ML
| Technology | Purpose |
|---|---|
| **RAG Pipeline** | Context-aware responses (planned) |
| **Intent Detection** | Classifying user emotions/needs |
| **NLP Model** | Natural language understanding |

### Frontend _(Planned)_
| Technology | Purpose |
|---|---|
| **React.js** | UI framework |
| **Tailwind CSS** | Styling |
| **Socket.io** | Real-time chat |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                        CLIENT                           │
│              React Frontend / REST Client               │
└──────────────────────┬──────────────────────────────────┘
                       │ HTTP / WebSocket
┌──────────────────────▼──────────────────────────────────┐
│                    API GATEWAY                          │
│              Express.js (Node.js)                       │
│         Auth Middleware │ Rate Limiting                  │
└──────┬───────────────┬──────────────────────────────────┘
       │               │
┌──────▼──────┐  ┌──────▼──────────────────────────────┐
│   MongoDB   │  │           AI Service Layer          │
│  (Users,    │  │  Intent Detection → RAG Pipeline    │
│   Sessions, │  │  → Response Generation              │
│   Moods)    │  └─────────────────────────────────────┘
└─────────────┘
```

---

## 📁 Folder Structure

```
mental-health-chatbot/
│
├── Backend/
│   ├── config/
│   │   └── db.js                  # MongoDB connection
│   │
│   ├── controllers/
│   │   ├── chatController.js      # Chat logic
│   │   ├── userController.js      # User management
│   │   └── moodController.js      # Mood tracking
│   │
│   ├── middlewares/
│   │   ├── authMiddleware.js      # JWT verification
│   │   └── errorHandler.js        # Global error handling
│   │
│   ├── models/
│   │   ├── User.js                # User schema
│   │   ├── Session.js             # Chat session schema
│   │   └── Mood.js                # Mood entry schema
│   │
│   ├── routes/
│   │   ├── chatRoutes.js          # /api/chat
│   │   ├── userRoutes.js          # /api/user
│   │   └── moodRoutes.js          # /api/mood
│   │
│   ├── services/
│   │   ├── aiService.js           # AI model integration
│   │   └── intentService.js       # Intent classification
│   │
│   ├── .env.example               # Environment variable template
│   ├── server.js                  # App entry point
│   └── package.json
│
├── Frontend/                      # (Planned)
│   └── ...
│
├── .gitignore
├── CONTRIBUTING.md
├── LICENSE
└── README.md
```

---

## ⚙️ Installation & Setup

### Prerequisites

- Node.js `v18+`
- npm `v9+`
- MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

### 1. Clone the repository

```bash
git clone https://github.com/your-username/mental-health-chatbot.git
cd mental-health-chatbot
```

### 2. Install dependencies

```bash
cd Backend
npm install
```

### 3. Configure environment variables

```bash
cp .env.example .env
```

Open `.env` and fill in your values:

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGO_URI=mongodb://localhost:27017/mindful

# Authentication
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRES_IN=7d

# AI Service
AI_API_KEY=your_ai_api_key_here
AI_MODEL=your_model_name
```

### 4. Start the server

```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

Server runs at `http://localhost:5000`

---

## 🔌 API Routes

### Chat

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `POST` | `/api/chat/message` | Send a message, get AI response | ✅ |
| `GET` | `/api/chat/history/:sessionId` | Get chat history | ✅ |
| `DELETE` | `/api/chat/session/:sessionId` | Delete a session | ✅ |

### User

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `POST` | `/api/user/register` | Register a new user | ❌ |
| `POST` | `/api/user/login` | Login and get JWT | ❌ |
| `GET` | `/api/user/profile` | Get user profile | ✅ |

### Mood Tracker _(Planned)_

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `POST` | `/api/mood/log` | Log a mood entry | ✅ |
| `GET` | `/api/mood/history` | Get mood history | ✅ |

**Example Request:**
```bash
POST /api/chat/message
Content-Type: application/json
Authorization: Bearer <your_token>

{
  "message": "I've been feeling anxious lately",
  "sessionId": "abc123"
}
```

**Example Response:**
```json
{
  "success": true,
  "reply": "I'm sorry to hear that. Anxiety can feel overwhelming. Would you like to talk about what's been on your mind?",
  "intent": "anxiety_support",
  "resources": []
}
```

---

## 🗺️ Future Roadmap

- [ ] **v1.0** — Core chat with intent detection + MongoDB integration
- [ ] **v1.1** — User authentication (register/login with JWT)
- [ ] **v1.2** — React frontend with real-time chat (Socket.io)
- [ ] **v1.3** — Mood tracker with daily check-ins
- [ ] **v2.0** — RAG-based AI for accurate, knowledge-grounded responses
- [ ] **v2.1** — Voice chatbot integration
- [ ] **v2.2** — Wellness insights dashboard with charts
- [ ] **v3.0** — Mobile app (React Native)

---

## 🤝 Contributing

Contributions are what make the open-source community great. Any contributions you make are **greatly appreciated**.

1. Fork the project
2. Create your feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'Add some AmazingFeature'`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a Pull Request

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for our code of conduct and contribution guidelines.

---

## 📄 License

Distributed under the MIT License. See [`LICENSE`](LICENSE) for more information.

---

## 👤 Author

**Your Name**
- GitHub: [@your-username]((https://github.com/mahi0097))
- LinkedIn: [your-linkedin](https://www.linkedin.com/in/mahi-sharma-ml/)
- Email: mahi967232@gmail.com

---

## 🙏 Acknowledgements

- [Node.js](https://nodejs.org)
- [Express.js](https://expressjs.com)
- [MongoDB](https://www.mongodb.com)
- [Shields.io](https://shields.io) — for the badges
- Mental health resources: [NIMH](https://www.nimh.nih.gov), [iCall](https://icallhelpline.org) (India)

---

<div align="center">
  <sub>Built with ❤️ to make mental wellness more accessible.</sub>
</div>
