mkdir client

mkdir server && cd server
npm init -y
npm install express cors dotenv mongoose jsonwebtoken bcrypt
npm install -D typescript ts-node-dev @types/express @types/node @types/bcrypt @types/jsonwebtoken
tsc --init


src/
│
├── app.ts                <-- Main app entry (load routes, middlewares, db)
│
├── routes/
│   └── auth.ts            <-- API endpoints (just forward to controllers)
│
├── controllers/
│   └── authController.ts  <-- Handle API logic (small, thin controllers)
│
├── services/
│   └── authService.ts     <-- Heavy work (db queries, password, jwt)
│
├── models/
│   └── user.ts            <-- MongoDB schema (User)
│
├── middleware/
│   └── auth.ts            <-- Middlewares like auth check
│
├── utils/
│   └── jwt.ts             <-- Small helpers (like generating JWTs)
│
├── types/
│   └── user.ts            <-- TypeScript interfaces
│
└── config/                <-- (Later) DB configs, logger configs, etc.


Basic Data Flow in Your App

    Request ➡️ comes to Route

    Route ➡️ forwards it to Controller

    Controller ➡️ calls Service

    Service ➡️ talks to Model (MongoDB) and does logic

    Service ➡️ sends response back to Controller

    Controller ➡️ sends final res.json() to Client