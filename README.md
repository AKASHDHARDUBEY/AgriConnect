# 🌾 AgriConnect - Smart Agriculture & Food Distribution Platform

### 👥 Team: FoodChainX

AgriConnect is a full-stack platform that connects farmers, buyers, and citizens through technology. It uses GPS, satellite, and market data to guide farmers on **what to grow, when to grow, and how to grow**, enables **direct produce selling**, and links **citizens to public food distribution systems (PDS)**.

---

## 🚀 Features

### 🌱 For Farmers
- AI & GPS-based crop recommendations using remote sensing and market data  
- Suggests best crops, seeds, and farming practices for the land  

### 🛒 For Sellers
- Simple listing system (like OLX/Quikr) to upload produce photos and prices  
- Enables direct buyer-farmer connections, removing middlemen  

### 🍚 For Communities
- Integrates with Public Distribution System (PDS)  
- Sends alerts when ration items (rice, wheat, dal, oil) are ready for pickup  
- Direct escalation system if food isn’t received  

---

## 🧠 Tech Stack
- **Frontend:** React.js  
- **Backend:** Node.js + Express.js  
- **Database:** MySQL  
- **ORM:** Prisma  
- **Other Tools:** GPS APIs, Remote Sensing APIs, Futures Market Data, REST API Integration  

---

## 🗂️ Folder Structure
AgriConnect/
├── client/ # React frontend
│ ├── src/
│ ├── public/
│ └── package.json
├── server/ # Express backend
│ ├── src/
│ ├── prisma/
│ ├── .env
│ └── package.json
├── README.md
└── .gitignore



---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository
```bash
git clone https://github.com/<your-username>/AgriConnect.git
cd AgriConnect


### Install dependencies
cd client && npm install
cd ../server && npm install


3️⃣ Configure environment

Create a .env file inside the server/ folder:

DATABASE_URL="mysql://user:password@localhost:3306/agriconnect"
PORT=5000

4️⃣ Run development servers
# In separate terminals
cd client && npm start
cd server && npm run dev


🧩 Future Enhancements

AI-driven yield predictions

Blockchain-based produce traceability

Real-time market price updates

Multi-language farmer support

📜 License

This project is licensed under the MIT License.

💬 Team FoodChainX

Project Lead: Akash Dhar Dubey
Theme: Smart Agriculture & Food Security
Hackathon/Initiative: Sustainable Tech Innovation 2025


