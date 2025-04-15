# 🧠 Sentence Construction Tool

An interactive React-based quiz tool to practice sentence construction by filling in blanks with correct words. Designed with a 30-second timer, instant feedback, and result tracking.

## 🚀 Features

- Display of incomplete sentences with fillable blanks
- Four word options per question
- Word unselection by clicking the blank again
- 30-second countdown timer per question
- Auto-navigation to next question on timeout
- Next button enabled only when all blanks are filled
- Final feedback screen with:
  - Total score
  - Correct/Incorrect answers
  - Right answers for mistakes

## 🧰 Tech Stack

- ⚛️ React + Vite
- 💨 Tailwind CSS
- 🌐 JSON Server (mock backend)

## 🔗 Live Links

- 🔥 **Frontend**: [https://sentence-construction-online.vercel.app/](https://sentence-construction-online.vercel.app/)
- 🔌 **JSON Server**: [https://json-server-api-1-g4z8.onrender.com/](https://json-server-api-1-g4z8.onrender.com/data)
- 📁 **GitHub**: [https://github.com/anuragbansall/Sentence-Construction](https://https://github.com/anuragbansall/Sentence-Construction)

## ⚙️ How to Run Locally

```bash
# Install dependencies
npm install

# Start frontend
npm run dev

# In a separate terminal (for JSON server)
npx json-server --watch db/sample.json --port 10000
```
