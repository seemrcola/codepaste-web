import { createBrowserRouter } from 'react-router-dom'
import Layout from '@/components/Layout'
import SearchPage from '@/pages/search'
import ConfigPage from '@/pages/config'
import NotFound from '@/components/NotFound'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <SearchPage />
      },
      {
        path: 'search',
        element: <SearchPage />
      },
      {
        path: 'config',
        element: <ConfigPage />
      }
    ]
  },
  {
    path: '*',
    element: <NotFound />
  }
])

export default router
