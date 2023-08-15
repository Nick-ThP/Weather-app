import axios from "axios"
import { ReactNode, createContext, useCallback, useContext, useLayoutEffect, useState } from "react"
import { City } from "../data/city-types"
import cityData from '../data/cityData.json'
import { useLocalStorage } from "../hooks/useLocalStorage"
import { IWeatherContext, IWeatherData } from "./weather-data-types"

const WeatherContext = createContext<IWeatherContext>({
	weatherData: null,
	city: '',
	isLoading: false,
	error: null,
	setError() { },
	setCity() { },
 	refresh() { }
})


export function useWeatherContext() {
	let context = useContext(WeatherContext)

	if (context === undefined) {
		console.error('WeatherContext is used outside of its provider')
	}

	return context
}

export function WeatherContextProvider(props: { children: ReactNode }) {
	const [city, _setCity] = useLocalStorage<string>('city', 'Aalborg')
	const [weatherData, setWeatherData] = useState<IWeatherData | null>(null)
	const [error, setError] = useState<string | null>(null)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	console.log(weatherData)

	function setCity(city: string) {
		_setCity(city)
		setError(null)
	}

	const executeApiRequest = useCallback(async () => {
		function createBulkDataURL() {
			const cities = cityData as City[]
			const cityObject = cities.find((cityObj) => city === cityObj.city)

			if (cityObject) {
				const lat = Number(cityObject.lat)
				const lon = Number(cityObject.lon)
				const apiKey = process.env.REACT_APP_API_KEY

				return `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
			}

			throw Error('Something is wrong with the provided city data')
		}

		setError(null)
		setIsLoading(true)

		try {
			const bulkRes = await axios.get(createBulkDataURL())
			setWeatherData(bulkRes.data)
		}

		catch (err) {
			setError('Something went wrong. \n Check your internet connection and/or refresh the page.')
			console.error(err)
		}

		finally {
			setTimeout(() => {
				setIsLoading(false)
			}, 300)
		}
	}, [city])

	useLayoutEffect(() => {
		executeApiRequest()
	}, [executeApiRequest])

	const refresh = executeApiRequest

	const contextData: IWeatherContext = {
		weatherData,
		city,
		isLoading,
		error,
		setError,
		setCity,
		refresh
	}

	return (
		<WeatherContext.Provider value={contextData}>
			{props.children}
		</WeatherContext.Provider>
	)
}