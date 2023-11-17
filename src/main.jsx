import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
//Import provider from redux and store configuration.
import { store } from './store.js'
import { Provider } from 'react-redux'
//must import .css file and toastContainer to use toastify
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/*Wrap entire app into redux provider and pass store.js as a parameter. Allows to use it along the app*/}
    <Provider store={store} >
      <App />
      {/*Enable toast notification use*/}
      <ToastContainer position="top-center" autoClose={1500} />
    </Provider>
  </React.StrictMode>,
)
