import { ReactNode, createContext, useContext, useState } from "react"
import useLocalStorage from "../hooks/useLocalStorage"

interface IWeatherContext {
	weatherData: unknown,
	city: string,
	setCity: (value: string) => void
}

const WeatherContext = createContext<IWeatherContext>({
	weatherData: null,
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

	// async function loadUserData() {
	// 	const weatherData = await
	// }

	const contextData: IWeatherContext = {
		weatherData,
		city,
		setCity
	}

	return (
		<WeatherContext.Provider value={contextData}>
			{children}
		</WeatherContext.Provider>
  	)
}