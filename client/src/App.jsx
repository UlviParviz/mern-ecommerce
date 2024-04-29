import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { ROUTES } from './routes/route'

const router = createBrowserRouter(ROUTES)

const App = () => {
  return (
    <RouterProvider router={router}/>
  )
}

export default App