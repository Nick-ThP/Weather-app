import React from 'react'
import ReactDOM from 'react-dom/client'
import { SkeletonTheme } from 'react-loading-skeleton'
import { App } from './components/App/App'
import { WeatherContextProvider } from './contexts/useWeatherContext'
import './index.scss'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
	<React.StrictMode>
		<WeatherContextProvider>
			<SkeletonTheme baseColor='#f3a893' highlightColor='#EC6E4C'>
				<App />
			</SkeletonTheme>
		</WeatherContextProvider>
	</React.StrictMode>
)
