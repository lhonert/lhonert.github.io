import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App';
import './index.css';
import CalendarPage from './pages/calendar';
import Settings from './pages/settings';
import { ThemeProvider } from './context/themeContext';
import { JournalProvider } from './context/journalContext';
import NewEntry from './pages/add-new-entry';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <CalendarPage />
      },
      {
        path: "/summary",
        element: <h1>Summary</h1>
      },
      {
        path: "/marketplace",
        element: <h1>Marketplace</h1>
      },
      {
        path: "/settings",
        element: <Settings />
      },
      {
        path: "/new",
        element: <NewEntry />
      }
    ]
  },
]);

root.render(
  <>
    <ThemeProvider>
      <JournalProvider>
        <RouterProvider router={router} />
      </JournalProvider>
    </ThemeProvider>
  </>
);