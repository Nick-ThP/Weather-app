import { ReactNode, createContext, useContext, useLayoutEffect, useState } from "react"
import useLocalStorage from "../hooks/useLocalStorage"
import axios from "axios"
import cityData from '../data/cityData.json'
import { IWeatherContext, IWeatherData, IconSizeEnum } from "./weather-data-type"

const WeatherContext = createContext<IWeatherContext>({
	weatherData: null,
	weatherIcon: null,
	setIconSize() {},
	loading: false,
	error: null,
	city: '',
	setCity() {}
})

export function useWeatherContext() {
	let context = useContext(WeatherContext)

	if (context === undefined) {
		throw Error('WeatherContext is used outside of its provider')
	}

	return context
}

export function WeatherContextProvider({ children }: { children: ReactNode }) {
	const [city, setCity] = useLocalStorage('city', 'Aalborg')
	const [weatherData, setWeatherData] = useState<IWeatherData | null>(null)
	const [weatherIcon, setWeatherIcon] = useState<string | null>(null)
	const [iconSize, setIconSize] = useState(IconSizeEnum.Normal)
	const [error, setError] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)

	function createBulkDataURL() {
		const lat = cityData[city as keyof typeof cityData].lat
		const lon = cityData[city as keyof typeof cityData].lon
		const apiKey = process.env.REACT_APP_API_KEY

		return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
	}

	function createIconUrl(bulkData: IWeatherData) {
		const icon = bulkData?.weather[0].icon

		return `https://openweathermap.org/img/wn/${icon}${iconSize}.png`
	}

	async function executeApiRequest() {
		setError(null)
		setLoading(true)
		console.log('running')

		try {
			const bulkRes = await axios.get(createBulkDataURL())
			setWeatherData(bulkRes.data)
			setWeatherIcon(createIconUrl(bulkRes.data))
		}

		catch {
			setError('Something went wrong. Check your internet connection and/or refresh the page.')
			console.error('API request failed')
		}

		finally {
			setLoading(false)
		}
	}

	useLayoutEffect(() => {
		executeApiRequest()
	}, [city])

	const contextData: IWeatherContext = {
		weatherData,
		weatherIcon,
		setIconSize,
		city,
		setCity,
		loading,
		error
	}

	return (
		<WeatherContext.Provider value={contextData}>
			{children}
		</WeatherContext.Provider>
	)
}