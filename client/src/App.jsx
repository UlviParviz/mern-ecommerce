import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { ROUTES } from './routes/route'
import { Toaster } from 'react-hot-toast'

const router = createBrowserRouter(ROUTES)

const App = () => {
  return (
    <RouterProvider router={router}/>
  )
}

export default App