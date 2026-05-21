🎓 CampusCircle

### *The Official BMSIT Match Network for Study Groups, Hackathon Teams, and Campus Projects*

[![Vite](https://img.shields.io/badge/Frontend-Vite%20%2B%20React-646CFF?style=flat-square&logo=vite)](https://vite.dev/)
[![Express](https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-333333?style=flat-square&logo=node.js)](https://expressjs.com/)
[![Supabase](https://img.shields.io/badge/Database-Supabase%20%28PostgreSQL%29-3ECF8E?style=flat-square&logo=supabase)](https://supabase.com/)
[![Socket.io](https://img.shields.io/badge/Real--time-Socket.io-010101?style=flat-square&logo=socket.io)](https://socket.io/)
[![Tailwind](https://img.shields.io/badge/Styling-Tailwind%20CSS-06B6D4?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

---hi


## 📝 Project Overview

**CampusCircle** is a dedicated full-stack peer-matching platform tailored specifically for the students of **BMS Institute of Technology and Management (BMSIT&M)**. Navigating engineering projects, sourcing reliable hackathon teammates, or setting up focused study circles can be highly unorganized when managed over standard social groups. CampusCircle bridges this gap by acting as a localized, verified match network.

The platform employs a robust Node.js/Express backend paired with Supabase for cloud-based relational storage and user authentication, coupled with a fast, responsive React frontend built on Vite and Tailwind CSS. Real-time peer interactions and live matchmaking conversations are fully driven via custom WebSockets.

---

## 🚀 Key Features

* **🔒 Institutional Security & Verification:** Strict campus domain filtering ensuring that only verified students with official `bmsit.in` credentials can gain access to the matchmaking grid.
* **🤝 Intelligent Peer Matching:** Algorithmic alignment matching students together based on shared skill sets, active domains (AI/ML, Web Dev, IoT, Core Hardware), and specific project goals.
* **💬 Native Real-Time Chat:** Fully integrated real-time text channels driven by `socket.io` featuring dynamic connection management and custom multiplexing across matching states.
* **🎨 Polished Campus Interface:** A clean, dark-themed, ultra-modern responsive user interface engineered with Tailwind CSS and performance-tuned via optimized class merging utilities.

---

## 🏗️ System Architecture


```

```text
File generated successfully.

```text
               ┌──────────────────────────────────────┐
               │         Vite + React Frontend        │
               │  (Port 5173 / Tailwind / Socket.io)  │
               └──────────────────┬───────────────────┘
                                  │
                  HTTP / REST     │     WebSockets (WS)
                  API Requests    │     Real-Time Events
                                  ▼
               ┌──────────────────────────────────────┐
               │         Express Server Engine        │
               │        (Port 8080 / Node.js)         │
               └──────┬────────────────────────┬──────┘
                      │                        │
                      ▼                        ▼
         ┌────────────────────────┐       ┌────────────────────────┐
         │     Supabase Auth      │       │   PostgreSQL Database  │
         │  (Cloud Authentication)│       │    (Relational Grid)   │
         └────────────────────────┘       └────────────────────────┘

```

---

## 📁 Repository Directory Structure

```text
Project_peer_matching-main/
├── backend/
│   ├── utils/
│   │   └── email.js           # Institutional email filtering & domain extraction
│   ├── server.js              # Primary Express API engine & WebSocket server
│   ├── package.json           # Node backend dependencies
│   └── .gitignore             # Target protection rule for node_modules and env parameters
├── frontend/
│   ├── src/
│   │   ├── components/        # Isolated modular UI presentation blocks
│   │   ├── data/              # Static frontend configurations and dictionaries
│   │   ├── lib/
│   │   │   ├── socket.ts      # Modernized WebSocket single-instance controller
│   │   │   └── utils.ts       # Performance-tuned Tailwind Class merging logic (cn)
│   │   ├── App.tsx            # Application entry route grid layout
│   │   ├── main.tsx           # React client-side DOM compiler mount
│   │   └── styles.css         # Global Tailwind directives index
│   ├── index.html             # Client presentation layout template
│   ├── package.json           # Client asset engine scripts & manifests
│   ├── vite.config.ts         # Vite compilation core config
│   └── .gitignore             # Core protection mappings for static client folders
└── docs/                      # Architectural design specifications blueprint folder
    ├── api-structure.md       # API endpoints manifest mapping
    ├── authentication-flow.md # Supabase onboarding design sequences
    ├── database-schema.md     # Relational database layout mapping
    └── ui-screens.md          # User experience screen blueprints

```

---

## ⚙️ Local Development Setup

To run this full-stack application on your local workstation, clone the repository and launch both architectural components simultaneously.

### 📋 Prerequisites

Ensure you have the following installed locally:

* [Node.js](https://nodejs.org/) (v18.x or higher recommended)
* [npm](https://www.npmjs.com/) (v9.x or higher)

---

### 🟢 1. Backend Service Configuration

1. Open a dedicated terminal and navigate to the backend folder:
```powershell
cd backend

```


2. Install local system node dependencies:
```powershell
npm install

```


3. Establish your localized `.env` variables grid in the backend root directory:
```env
PORT=8080
SUPABASE_URL=your_supabase_cloud_project_url
SUPABASE_ANON_KEY=your_supabase_anon_cryptographic_key

```


4. Boot up the developer instance runtime server:
```powershell
npm run dev

```


*The server should respond with: `🚀 CAMPUS SERVER IS LIVE ON PORT: 8080*`

---

### 🔵 2. Frontend Interface Configuration

1. Open a second standalone terminal instance and switch to the frontend path:
```powershell
cd frontend

```


2. Install the necessary development dependencies:
```powershell
npm install

```


3. Start the Vite development hot-reloading server:
```powershell
npm run dev

```


4. Open your browser and navigate to the application console viewport:
👉 **`http://127.0.0.1:5173/`**

---

## 🔒 Security & Verification Controls

The application enforces institutional validation through custom regex partitioning inside `backend/utils/email.js`:

* **Personal Domains Handled:** Generic standard handlers (`gmail.com`, `yahoo.com`, `proton.me`) are dynamically screened and passed to fallback paths.
* **Campus Domain Verification:** The registration controller intercepts user payloads and runs standard matching routines to mandate `bmsit.in` routing constraints prior to generating a matching-ready student profile entity.

---

## 🚀 Future Deployment Protocol

* **Frontend Distribution:** Deployed natively via **Vercel** with dedicated path mapping using static SPA tracking configurations.
* **Backend Instance Runtime:** Deployed via **Render** or **Railway** to maintain stateful WebSocket pipelines required for continuous real-time messaging sync.
* **Database Layers:** Scaled directly via **Supabase Cloud Infrastructure Instance Engine**.
"""

# Write the contents to a physical file in the current working directory

with open("README.md", "w", encoding="utf-8") as file:
file.write(readme_content)

print("File generated successfully.")

```
Your Markdown (MD) file is ready
[file-tag: code-generated-file-0-1779342460755377062]

I have generated a clean, detailed, and completely custom `README.md` file for your repository. It covers everything we've fixed, organized, and verified so far—from the Express/Supabase backend architecture down to the Vite + Tailwind config, the fixed `socket.io-client` stateful setup, and your specialized `bmsit.in` domain verification filter.

Here is the exact layout of the documentation now written to your file:

```markdown
# 🎓 CampusCircle

### *The Official BMSIT Match Network for Study Groups, Hackathon Teams, and Campus Projects*

[![Vite](https://img.shields.io/badge/Frontend-Vite%20%2B%20React-646CFF?style=flat-square&logo=vite)](https://vite.dev/)
[![Express](https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-333333?style=flat-square&logo=node.js)](https://expressjs.com/)
[![Supabase](https://img.shields.io/badge/Database-Supabase%20%28PostgreSQL%29-3ECF8E?style=flat-square&logo=supabase)](https://supabase.com/)
[![Socket.io](https://img.shields.io/badge/Real--time-Socket.io-010101?style=flat-square&logo=socket.io)](https://socket.io/)
[![Tailwind](https://img.shields.io/badge/Styling-Tailwind%20CSS-06B6D4?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

---

## 📝 Project Overview

**CampusCircle** is a dedicated full-stack peer-matching platform tailored specifically for the students of **BMS Institute of Technology and Management (BMSIT&M)**. Navigating engineering projects, sourcing reliable hackathon teammates, or setting up focused study circles can be highly unorganized when managed over standard social groups. CampusCircle bridges this gap by acting as a localized, verified match network.

The platform employs a robust Node.js/Express backend paired with Supabase for cloud-based relational storage and user authentication, coupled with a fast, responsive React frontend built on Vite and Tailwind CSS. Real-time peer interactions and live matchmaking conversations are fully driven via custom WebSockets.

---

## 🚀 Key Features

* **🔒 Institutional Security & Verification:** Strict campus domain filtering ensuring that only verified students with official `bmsit.in` credentials can gain access to the matchmaking grid.
* **🤝 Intelligent Peer Matching:** Algorithmic alignment matching students together based on shared skill sets, active domains (AI/ML, Web Dev, IoT, Core Hardware), and specific project goals.
* **💬 Native Real-Time Chat:** Fully integrated real-time text channels driven by `socket.io` featuring dynamic connection management and custom multiplexing across matching states.
* **🎨 Polished Campus Interface:** A clean, dark-themed, ultra-modern responsive user interface engineered with Tailwind CSS and performance-tuned via optimized class merging utilities.

---

## 🏗️ System Architecture

```text
               ┌──────────────────────────────────────┐
               │         Vite + React Frontend        │
               │  (Port 5173 / Tailwind / Socket.io)  │
               └──────────────────┬───────────────────┘
                                  │
                  HTTP / REST     │     WebSockets (WS)
                  API Requests    │     Real-Time Events
                                  ▼
               ┌──────────────────────────────────────┐
               │         Express Server Engine        │
               │        (Port 8080 / Node.js)         │
               └──────┬────────────────────────┬──────┘
                      │                        │
                      ▼                        ▼
         ┌────────────────────────┐       ┌────────────────────────┐
         │     Supabase Auth      │       │   PostgreSQL Database  │
         │  (Cloud Authentication)│       │    (Relational Grid)   │
         └────────────────────────┘       └────────────────────────┘

```

---

## 📁 Repository Directory Structure

```text
Project_peer_matching-main/
├── backend/
│   ├── utils/
│   │   └── email.js           # Institutional email filtering & domain extraction
│   ├── server.js              # Primary Express API engine & WebSocket server
│   ├── package.json           # Node backend dependencies
│   └── .gitignore             # Target protection rule for node_modules and env parameters
├── frontend/
│   ├── src/
│   │   ├── components/        # Isolated modular UI presentation blocks
│   │   ├── data/              # Static frontend configurations and dictionaries
│   │   ├── lib/
│   │   │   ├── socket.ts      # Modernized WebSocket single-instance controller
│   │   │   └── utils.ts       # Performance-tuned Tailwind Class merging logic (cn)
│   │   ├── App.tsx            # Application entry route grid layout
│   │   ├── main.tsx           # React client-side DOM compiler mount
│   │   └── styles.css         # Global Tailwind directives index
│   ├── index.html             # Client presentation layout template
│   ├── package.json           # Client asset engine scripts & manifests
│   ├── vite.config.ts         # Vite compilation core config
│   └── .gitignore             # Core protection mappings for static client folders
└── docs/                      # Architectural design specifications blueprint folder
    ├── api-structure.md       # API endpoints manifest mapping
    ├── authentication-flow.md # Supabase onboarding design sequences
    ├── database-schema.md     # Relational database layout mapping
    └── ui-screens.md          # User experience screen blueprints

```

---

## ⚙️ Local Development Setup

To run this full-stack application on your local workstation, clone the repository and launch both architectural components simultaneously.

### 📋 Prerequisites

Ensure you have the following installed locally:

* [Node.js](https://nodejs.org/) (v18.x or higher recommended)
* [npm](https://www.npmjs.com/) (v9.x or higher)

---

### 🟢 1. Backend Service Configuration

1. Open a dedicated terminal and navigate to the backend folder:
```powershell
cd backend

```


2. Install local system node dependencies:
```powershell
npm install

```


3. Establish your localized `.env` variables grid in the backend root directory:
```env
PORT=8080
SUPABASE_URL=your_supabase_cloud_project_url
SUPABASE_ANON_KEY=your_supabase_anon_cryptographic_key

```


4. Boot up the developer instance runtime server:
```powershell
npm run dev

```


*The server should respond with: `🚀 CAMPUS SERVER IS LIVE ON PORT: 8080*`

---

### 🔵 2. Frontend Interface Configuration

1. Open a second standalone terminal instance and switch to the frontend path:
```powershell
cd frontend

```


2. Install the necessary development dependencies:
```powershell
npm install

```


3. Start the Vite development hot-reloading server:
```powershell
npm run dev

```


4. Open your browser and navigate to the application console viewport:
👉 **`http://127.0.0.1:5173/`**

---

## 🔒 Security & Verification Controls

The application enforces institutional validation through custom regex partitioning inside `backend/utils/email.js`:

* **Personal Domains Handled:** Generic standard handlers (`gmail.com`, `yahoo.com`, `proton.me`) are dynamically screened and passed to fallback paths.
* **Campus Domain Verification:** The registration controller intercepts user payloads and runs standard matching routines to mandate `bmsit.in` routing constraints prior to generating a matching-ready student profile entity.

---

## 🚀 Future Deployment Protocol

* **Frontend Distribution:** Deployed natively via **Vercel** with dedicated path mapping using static SPA tracking configurations.
* **Backend Instance Runtime:** Deployed via **Render** or **Railway** to maintain stateful WebSocket pipelines required for continuous real-time messaging sync.
* **Database Layers:** Scaled directly via **Supabase Cloud Infrastructure Instance Engine**.

```

### 🛠️ What to do with this file:
1. Copy the raw markdown text blocks from this response or grab the file output.
2. Put it in a file named **`README.md`** inside your absolute main root folder (`C:\Users\Amith Santhosh\Downloads\Project_peer_matching-main\Project_peer_matching-main\`).
3. Commit it and push everything up to GitHub (`git add .`, `git commit -m "docs: add comprehensive system architecture readme"`, `git push`).

This will make your GitHub repository look completely professional and high-tier for evaluation panels! Is your teammate all set to pull down these changes?

```
