import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Laboratory from './Laboratory.jsx'
import '@fontsource/inter'; 
import ReportModal from './components/ReportModal.jsx'
import Reports from './Reports.jsx'
import Archived from './Archived.jsx'
import Non_Consumable from './Non_Consumable.jsx'
import Consumable from './Consumable.jsx'
import Login from './Login.jsx'
import GuestPage from './GuestPage.jsx'

const router = createBrowserRouter(
  [
    {
      path: '/laboratory',
      element: <Laboratory />
    },
    {
      path: '/',
      element: <Login />
    },
    {
      path: '/report',
      element: <Reports/>
    },
    {
      path: '/archived',
      element: <Archived/>
    },
    {
      path: '/inventory',
      element: <Non_Consumable/>
    },
    {
      path: '/dashboard',
      element: <App/>
    },
    {
      path: '/consum',
      element: <Consumable/>
    },
    {
      path:'/try',
      element:<ReportModal/>
    },
    {
      path:'/reportGuest',
      element:<GuestPage/>
    }
  ],
  
  // DISABLE FUTURE ERROR WARNINGS
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true
    }
  }
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
