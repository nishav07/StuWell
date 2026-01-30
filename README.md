# StuWell 🧠💙  
AI-Powered Student Health & Wellbeing Tracker

StuWell is a preventive healthcare web application designed specifically for students.  
It helps students track their daily routine and health habits in under 30 seconds and uses AI to analyze patterns, identify risks, and provide meaningful health suggestions — without performing any medical diagnosis.

This project was built as a **solo submission for SNOW FEST Hackathon 2026** under the **HealthTech & Human Wellbeing** track, powered by **AI/ML (Gemini API)**.

---

## 🚀 Problem Statement

Students often ignore their health due to academic pressure, screen overuse, irregular routines, and poor nutrition.  
Most health issues do not appear suddenly — they build up silently due to bad daily habits.

However:
- Students don’t have time for complex health apps
- Most tools focus on fitness, not **student lifestyle**
- There is no simple system for **early risk awareness**

---

## 💡 Solution: StuWell

StuWell provides a **simple, fast, and student-friendly health tracking experience**.

- Daily inputs take **less than 30 seconds**
- No chatting, no confusion — just structured data
- AI analyzes **7-day patterns**, not single-day data
- Focuses on **prevention, awareness, and routine stability**

---

## ✨ Key Features

### 🔐 Authentication
- Secure login & signup
- Personal profile setup (DOB, academic level, basic health info)

### ⏱️ Daily Health Check (Under 30 seconds)
Users enter **yesterday’s data** through floating modal cards:
- Water intake
- Study hours
- Screen time
- Junk food (Yes/No)
- Nutrients consumed most
- Symptoms (enum-based)
- Overall mood

### 📊 Instant Snapshot
- Daily data appears immediately on the dashboard
- Rule-based suggestions shown using if–else logic

### 🤖 AI Weekly Health Report (Gemini API)
- AI automatically analyzes **last 7 days of data**
- Detects patterns, imbalance, and early warning signs
- Provides actionable suggestions
- First report is triggered even on **Day 1** for demo & judging

> ⚠️ Disclaimer:  
> StuWell does **not** perform medical diagnosis.  
> All AI outputs are **suggestions only**, and users are advised to consult a doctor if serious issues are detected.

### 📈 Insights Page
- Visual summary of the last 7 days
- Helps students understand:
  - Which days were unhealthy
  - What habits need improvement

### ⚙️ Settings
- View profile details
- Logout functionality

---

## 🧠 AI & ML Usage

- **Gemini API** is used for:
  - Weekly health summary generation
  - Pattern analysis across multiple lifestyle parameters
  - Risk awareness based on consistency & trends

AI is triggered **only after data submission**, ensuring privacy and controlled usage.

---

## 🛠 Tech Stack

- Frontend: EJS, Tailwind CSS
- Backend: Node.js, Express.js
- Database: MongoDB
- AI: Gemini API
- Hosting: Render
- Architecture: MVC-based structure

---

## 🔮 Future Scope

- Smartwatch & wearable integration
- Advanced streak system
- Smart notifications (currently limited due to web/native barriers)
- Personalized academic stress analysis

---

## 👤 Built By

**Solo Project**  
Developer: Nishav Choudhary
SNOW FEST Hackathon 2026

---

## 🌍 Impact

StuWell promotes:
- Preventive healthcare for students
- Awareness before serious health decline
- Healthy routines without pressure or complexity

Small daily actions → long-term wellbeing.
