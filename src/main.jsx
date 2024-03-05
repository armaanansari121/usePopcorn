import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import StarsRating from './components/StarRating.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
    <StarsRating maxRating={10} messages={["Bad", "Poor", "Okay", "Good", "Amazing"]} color='white' size={25} />
  </React.StrictMode>,
)
