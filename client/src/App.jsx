import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { ROUTES } from './routes/route'
import ScrollToTop from './components/Site/ScrollToTop'

const router = createBrowserRouter(ROUTES)

const App = () => {
  return (
      <RouterProvider router={router}/>
  )
}

export default App