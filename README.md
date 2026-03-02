# TabSquare Assignment Frontend

This is a modern front-end web application built using [Next.js](https://nextjs.org/) (App Router), [React 18](https://react.dev/), and [Material-UI (MUI)](https://mui.com/). It uses [Redux Toolkit (RTK)](https://redux-toolkit.js.org/) alongside RTK Query for state management and API communication.

## 🚀 Tech Stack

- **Framework:** Next.js 14.2 (App Router)
- **UI Library:** React 18
- **Styling & Components:** Material-UI (MUI v7)
- **State Management:** Redux Toolkit & RTK Query
- **Testing:** Vitest & React Testing Library
- **Tooling:** TypeScript, ESLint

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your local machine:
- **Node.js** (v18.17.0 or newer recommended)
- **npm** (v9+ recommended, or yarn/pnpm)

You will also need the backend API running locally or have its URL accessible. 

## 🛠️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/itsShakeeb/tabsquare_assignment_fe.git
   cd tabsquare_assignment_fe
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file in the root directory (if it doesn't already exist) and define the backend API URL. By default, it expects the backend to run on port 4000:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:4000
   ```
   *Note: Adjust this URL based on where your backend environment is currently hosted.*

4. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the application running.

## 🧪 Testing

The project is configured with [Vitest](https://vitest.dev/) for unit and integration testing.

To run the test suite:
```bash
npm run test
```

## 🏗️ Build for Production

To create an optimized production build:
```bash
npm run build
```

To start the production server:
```bash
npm run start
```
