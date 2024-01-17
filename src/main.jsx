import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import LoginPage from './pages/LoginPage.jsx'
import Room from './pages/Room.jsx'
import PrivateRoutes from './utils/PrivateRoutes.jsx'
import { AuthProvider } from './utils/AuthContext.jsx'
import RegisterPage from './pages/RegisterPage.jsx'

const BrowserRouter = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthProvider>
        <App/>
      </AuthProvider>
    ),
    children: [
      {
        path: '/',
        element: (
          <PrivateRoutes>
            <Room/>
          </PrivateRoutes>
        ),
      },
      {
        path: '/login',
        element: <LoginPage/>,
      },
      {
        path: '/register',
        element: <RegisterPage/>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router= {BrowserRouter}/>
  </React.StrictMode>,
)
