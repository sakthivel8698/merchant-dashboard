import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { RouterProvider } from 'react-router-dom'
import router from './router';
import ToastProvider from './components/ToastProvider';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <RouterProvider router={router} />
      <ToastProvider />
    </>
  )
}

export default App
