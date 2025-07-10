import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SignInPage from './auth/sign-in/index.jsx';
import DashBoard from './Apps/DashBoard'
import Home from './Apps/Home'
import { ClerkProvider } from '@clerk/clerk-react'
import EditResume from './dashboard/EditResume'
import View from './View';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY


const router = createBrowserRouter([
  {
    element:<App/>,
    children:[
      {
        path:'/dashboard',
        element:<DashBoard/>
      }
    ]
  },
  {
    path:'/',
    element:<Home/>
  },
  {
    path:'auth/sign-in',
    element:<SignInPage/>
  },
  {
    path:'/dashboard/resume/:resumeId/edit',
    element:<EditResume/>
  },
  {
    path:'/my-resume/:resumeId/view',
    element:<View/>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl='/'>
      <RouterProvider router={router}/>
    </ClerkProvider>
  </StrictMode>,
)
