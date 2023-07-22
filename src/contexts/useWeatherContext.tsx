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
	setError() { },
	setCity() { },
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
	const [weatherIcons, setWeatherIcons] = useState<IconPack[] | null>(null)
	const [error, setError] = useState<string | null>(null)
	const [loading, setLoading] = useState<boolean>(false)

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

				return `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`
			}

			throw Error('Something is wrong with the provided city data')
		}

		function createIconsURLs(bulkData: IWeatherData) {
			const icons = bulkData?.list.map(time => (
				{
					normal: `https://openweathermap.org/img/wn/${time.weather[0].icon}.png`,
					zoomed: `https://openweathermap.org/img/wn/${time.weather[0].icon}@2x.png`,
				}
			))

			return icons
		}

		setError(null)
		setLoading(true)

		try {
			const bulkRes = await axios.get(createBulkDataURL())
			setWeatherData(bulkRes.data)
			setWeatherIcons(createIconsURLs(bulkRes.data))
		}

		catch(err) {
			setError('Something went wrong. \n Check your internet connection and/or refresh the page.')
			console.error(err)
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
		setError,
		setCity,
	}

	return (
		<WeatherContext.Provider value={contextData}>
			{props.children}
		</WeatherContext.Provider>
	)
}