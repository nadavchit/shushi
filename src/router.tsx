import { createBrowserRouter } from 'react-router-dom'
import AppShell from './components/layout/AppShell'
import HomePage from './pages/HomePage'
import CategoryPage from './pages/CategoryPage'
import TestSessionPage from './pages/TestSessionPage'
import ResultsPage from './pages/ResultsPage'
import HistoryPage from './pages/HistoryPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'category/:categoryId', element: <CategoryPage /> },
      { path: 'test/:categoryId/:testId', element: <TestSessionPage /> },
      { path: 'results', element: <ResultsPage /> },
      { path: 'history', element: <HistoryPage /> },
    ],
  },
])
