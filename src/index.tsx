import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './components/App/App'
import { WeatherContextProvider } from './contexts/useWeatherContext'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <React.StrictMode>
	<WeatherContextProvider>
    	<App />
	</WeatherContextProvider>
  </React.StrictMode>
)