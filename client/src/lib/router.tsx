import { createBrowserRouter } from 'react-router';
import { AuthGuard } from '../components/layout/AuthGuard';
import { AppLayout } from '../components/layout/AppLayout';
import { LandingPage } from '../pages/LandingPage';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { CreateTicketPage } from '../pages/CreateTicketPage';
import { TicketDetailPage } from '../pages/TicketDetailPage';

export const router = createBrowserRouter([
  { path: '/', element: <LandingPage /> },
  { path: '/login', element: <LoginPage /> },
  {
    element: <AuthGuard />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { path: '/dashboard', element: <DashboardPage /> },
          { path: '/tickets/new', element: <CreateTicketPage /> },
          { path: '/tickets/:ticketId', element: <TicketDetailPage /> },
        ]
      }
    ]
  }
]);