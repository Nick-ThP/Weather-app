import axios from "axios"
import { ReactNode, createContext, useCallback, useContext, useLayoutEffect, useMemo, useState } from "react"
import { City } from "../data/city-types"
import cityData from '../data/cityData.json'
import { useLocalStorage } from "../hooks/useLocalStorage"
import { IWeatherContext, IWeatherData, TimeInfo } from "./weather-data-types"

const WeatherContext = createContext<IWeatherContext>({
	allWeatherData: null,
	weatherSource: null,
	city: '',
	futureTime: null,
	isLoading: false,
	error: null,
	setCity() { },
	setFutureTime() { },
	setError() { },
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
	const [allWeatherData, setAllWeatherData] = useState<IWeatherData | null>(null)
	const [futureTime, _setFutureTime] = useState<TimeInfo | null>(null)
	const [error, setError] = useState<string | null>(null)
	const [isLoading, setIsLoading] = useState<boolean>(false)

	function setCity(city: string) {
		_setCity(city)
		setError(null)
	}

	function setFutureTime(date: TimeInfo | null) {
		setIsLoading(true)
		const loadTimeout = setTimeout(() => {
			setIsLoading(false)
		}, 300)


		if (date?.dt === allWeatherData?.current.dt) {
			_setFutureTime(null)

			return loadTimeout
		}

		window.scrollTo(0, 0)
		_setFutureTime(date)

		return loadTimeout
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

		_setFutureTime(null)
		setError(null)
		setIsLoading(true)

		try {
			const bulkRes = await axios.get(createBulkDataURL())
			setAllWeatherData(bulkRes.data)
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

	const weatherSource = useMemo(() => {
		if (futureTime) {
			if (futureTime.type === 'hour') {
				return allWeatherData?.hourly.find(hour => hour.dt === futureTime.dt) || null
			} else if (futureTime.type === 'date') {
				return allWeatherData?.daily.find(date => date.dt === futureTime.dt) || null
			}
		}

		return allWeatherData?.current || null
	}, [allWeatherData, futureTime])

	const refresh = executeApiRequest

	const contextData: IWeatherContext = {
		allWeatherData,
		weatherSource,
		city,
		futureTime,
		isLoading,
		error,
		setCity,
		setFutureTime,
		setError,
		refresh,
	}

	return (
		<WeatherContext.Provider value={contextData}>
			{props.children}
		</WeatherContext.Provider>
	)
}