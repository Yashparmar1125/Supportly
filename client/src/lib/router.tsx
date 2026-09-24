import { createBrowserRouter } from 'react-router';
import { AuthGuard } from '../components/layout/AuthGuard';
import { AppLayout } from '../components/layout/AppLayout';
import { LandingPage } from '../pages/LandingPage';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { CreateTicketPage } from '../pages/CreateTicketPage';
import { TicketDetailPage } from '../pages/TicketDetailPage';

import { PublicTicketPage } from '../pages/PublicTicketPage';
import { ProductPage } from '../pages/ProductPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { ErrorBoundary } from '../components/layout/ErrorBoundary';

export const router = createBrowserRouter([
  {
    errorElement: <ErrorBoundary />,
    children: [
      { path: '/', element: <LandingPage /> },
      { path: '/platform', element: <ProductPage /> },
      { path: '/product', element: <ProductPage /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/submit-ticket', element: <PublicTicketPage /> },
      {
        element: <AuthGuard />,
        children: [
          {
            element: <AppLayout />,
            children: [
              { path: '/dashboard', element: <DashboardPage /> },
              { path: '/tickets/new', element: <CreateTicketPage /> },
              { path: '/tickets/:ticketId', element: <TicketDetailPage /> },
            ],
          },
        ],
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);