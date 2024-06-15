import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App';
import { JournalProvider } from './context/journalContext';
import { ThemeProvider } from './context/themeContext';
import './index.css';
import NewEntry from './pages/add-new-entry';
import CalendarPage from './pages/calendar';
import EditEntry from './pages/edit-entry';
import Settings from './pages/settings';

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
      },
      {
        path: "/edit/:id",
        element: <EditEntry />
      },
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