import { ReactNode, createContext, useContext, useLayoutEffect, useCallback, useState } from "react"
import useLocalStorage from "../hooks/useLocalStorage"
import axios from "axios"
import cityData from '../data/cityData.json'
import { IWeatherContext, IWeatherData, IconPack } from "./weather-data-types"
import { City } from "../data/city-types"

const WeatherContext = createContext<IWeatherContext>({
	weatherData: null,
	weatherIcons: null,
	city: '',
	loading: false,
	error: null,
	setCity() { },
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
	const [weatherIcons, setWeatherIcons] = useState<IconPack | null>(null)
	const [error, setError] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)

	const executeApiRequest = useCallback(async () => {
		function createBulkDataURL() {
			const cities = cityData as City[]
			const cityObject = cities.find((cityObj) => city === cityObj.city)

			if (cityObject) {
				const lat = Number(cityObject.lat)
				const lon = Number(cityObject.lon)
				const apiKey = process.env.REACT_APP_API_KEY

				return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
			}

			return ''
		}

		function createIconUrl(bulkData: IWeatherData) {
			const icon = bulkData?.weather[0].icon

			return {
				normal: `https://openweathermap.org/img/wn/${icon}.png`,
				zoomed: `https://openweathermap.org/img/wn/${icon}@2x.png`,
			}
		}

		setError(null)
		setLoading(true)

		try {
			const bulkRes = await axios.get(createBulkDataURL())
			setWeatherData(bulkRes.data)
			setWeatherIcons(createIconUrl(bulkRes.data))
		}

		catch {
			console.error('API request failed')
			setError('Something went wrong. Check your internet connection and/or refresh the page.')
		}

		finally {
			setLoading(false)
		}
	}, [city])

	useLayoutEffect(() => {
		executeApiRequest()
	}, [executeApiRequest])

	const contextData: IWeatherContext = {
		weatherData,
		weatherIcons,
		city,
		loading,
		error,
		setCity,
	}

	return (
		<WeatherContext.Provider value={contextData}>
			{children}
		</WeatherContext.Provider>
	)
}