# Frontend Documentation

## Overview

The frontend is built using React and uses the following technologies:

- React Router for navigation
- Axios for making API requests
- Tailwind CSS for styling
- Shadcn UI for UI components
- Tanstack React Query for data fetching and caching
- i18next for internationalization

## File Structure

- `src/`: Contains the source code for the frontend
  - `components/`: Contains the React components
    - `layout/`: Contains the layout components such as Navbar and Sidebar
    - `ui/`: Contains the UI components from Shadcn UI
  - `pages/`: Contains the React pages
    - `index.tsx`: The main page
    - `LoginPage.tsx`: The login page
    - `RegisterPage.tsx`: The registration page
    - `Profile.tsx`: The profile page
    - `ForgotPasswordPage.tsx`: The forgot password page
    - `NotFound.tsx`: The 404 page
    - `analysis.tsx`: The analysis page
    - `reports.tsx`: The reports page
    - `resources.tsx`: The resources page
    - `dbteste.tsx`: The database test page
  - `context/`: Contains the React context
    - `LanguageContext.tsx`: The language context
  - `hooks/`: Contains the React hooks
  - `lib/`: Contains utility functions
  - `i18n.ts`: The i18next configuration file
  - `locales/`: Contains the translation files
    - `en.json`: The English translation file
    - `pt.json`: The Portuguese translation file
    - `es.json`: The Spanish translation file
  - `App.tsx`: The main application component
  - `main.tsx`: The entry point for the frontend

## Environment Variables

The frontend uses the following environment variables:

- `BACKEND_PORT`: The port that the backend server is running on

## Running the Frontend

To run the frontend, use the following command:

```bash
npm run dev
```

This will start the frontend server on port 8081.

## Building the Frontend

To build the frontend, use the following command:

```bash
npm run build
```

This will create a production build of the frontend in the `dist` directory.
