import { ReactNode, createContext, useContext, useEffect, useState } from "react"
import useLocalStorage from "../hooks/useLocalStorage"
import axios from "axios"
import cityData from '../cityData.json'

interface IWeatherContext {
	weatherData: unknown,
	loading: boolean,
	city: string,
	setCity: (value: string) => void
}

const WeatherContext = createContext<IWeatherContext>({
	weatherData: null,
	loading: false,
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
	const [weatherData, setWeatherData] = useState<unknown | null>(null)
	const [loading, setLoading] = useState(false)

	function createURL(arg: string) {
		const lat = cityData[city as keyof typeof cityData].lat
		const lon = cityData[city as keyof typeof cityData].lon
		const apiKey = process.env.REACT_APP_API_KEY

		return `https://api.openweathermap.org/data/2.5/${arg}?lat=${lat}&lon=${lon}&appid=${apiKey}`
	}

	async function executeApiRequest() {
		setLoading(true)

		try {
			const response = await axios(createURL('forecast'))
			setWeatherData(response)
		}

		catch {
			console.error('API request failed')
		}

		finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		executeApiRequest()
	}, [city])

	const contextData: IWeatherContext = {
		weatherData,
		loading,
		city,
		setCity
	}

	return (
		<WeatherContext.Provider value={contextData}>
			{children}
		</WeatherContext.Provider>
	)
}