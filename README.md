# Xynexa - Team Collaboration Tool

Xynexa is a powerful team collaboration platform designed to boost productivity, streamline communication, and optimize task management for teams of all sizes. It offers real-time messaging, task tracking, file sharing, AI insights, and more — all in one integrated workspace.

---

## Table of Contents

- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Getting Started](#getting-started)  
- [Environment Variables](#environment-variables)  
- [Running the Project](#running-the-project)  
- [Contributing](#contributing)  
- [License](#license)  

---

## Features

- Task Management: Create, assign, and track tasks efficiently  
- Real-Time Messaging: Instant chat for seamless team communication  
- File Sharing & Storage: Secure file sharing with cloud integration  
- Role-Based Access Control: Admin, Manager, and Member roles with specific permissions  
- Time Tracking: Log working hours and monitor task duration  
- Discussion Boards: Structured team discussions and brainstorming forums  
- Calendar Integration: Sync with Google Calendar for deadlines and meetings  
- AI-Powered Insights: Smart analytics and recommendations  
- Document Writing System: Collaborative project documentation  
- Canvas Feature: Draw project layouts and wireframes  
- Direct Emailing: Send emails using Email.js  

---

## Tech Stack

- **Frontend:** Next.js (React framework)  
- **Backend:** Express.js with Node.js  
- **Database:** MongoDB with Mongoose ORM  
- **State Management:** Redux Toolkit  
- **Authentication:** Clerk  
- **Real-time Communication:** @100mslive/react-sdk, Socket.IO  
- **AI Services:** OpenAI, Google AI SDK  
- **Styling:** Tailwind CSS, MUI, Radix UI  

---

## Getting Started

Follow these steps to set up the project locally:

### Prerequisites

- Node.js (v18 or above recommended)  
- npm or yarn  
- MongoDB instance (local or cloud)  
- Google API key (for calendar integration)  
- OpenAI API key (for AI features)  
- Clerk account for authentication  

---

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/mdabdulkyum1/xynexa.git
cd xynexa

```

### Install dependencies

Using npm:
```bash
npm install
```
Or using yarn:
```bash
yarn install
```
### Environment Variables
 - Create a .env.local file in the root directory and add the following keys (replace placeholder values with your actual keys):

```bash

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
CLERK_SECRET_KEY=your-clerk-secret-key

GOOGLE_API_KEY=your-google-api-key
OPENAI_API_KEY=your-openai-api-key

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
NEXT_PUBLIC_SERVER_URL=http://localhost:5000

NEXT_PUBLIC_HMS_APP_ID=your-hms-app-id
CLERK_JWT_DEV_MODE=false
```

### Running the Project
Start the development server:

Using npm:
```bash
npm run dev
```
Or using yarn:
```bash
yarn dev
```
- Then open your browser and go to:
  👉 http://localhost:3000


### Building for Production
To build the optimized production version:
```bash
npm run build
npm start
```

### Contributing
Contributions are welcome! Please follow these steps:

 - Fork the repository
 - Create your feature branch (git checkout -b feature/YourFeature)
 - Commit your changes (git commit -m 'Add some feature')
 - Push to the branch (git push origin feature/YourFeature)
 - Open a Pull Request


### License
- This project is licensed under the MIT License. See the LICENSE file for details.

### Contact
 - If you have any questions or feedback, feel free to open an issue or contact me directly.