import { FeelsLike, IWeatherData, Temp, TimeInfo } from "../contexts/weather-data-types"
import { createDateInfo } from "./date-formatting"

export function formatTemperature(date: number) {
	if (date.toString().split('')[1] === '.') {

		return date.toString().split('')[0]
	}

	return date.toString().substring(0, 2)
}

export function createTempInfo<T extends Temp | FeelsLike>(temp: number | T) {
	if (typeof temp === 'number') {

		return `${formatTemperature(temp)}°`
	}

	if ('max' in temp) {

		return `${formatTemperature(temp.max)}°/${formatTemperature(temp.min)}°`
	}

	return `${formatTemperature(temp.day)}° / ${formatTemperature(temp.night)}°`
}

export function createRainInfo(rain: number | { '1h': number }, futureTime: TimeInfo | null) {
	if (futureTime?.type === 'date' && typeof rain === 'number') {

		return Math.round(rain * 10) / 10
	} else if (typeof rain === 'object' && rain['1h']) {

		return Math.round(rain['1h'] * 10) / 10
	}
}

export function createUvInfo(uv: number) {
	let scoreString = ''

	if (uv < 6) {
		scoreString = '(low)'
	} else if (uv < 8) {
		scoreString = '(high)'
	} else if (uv > 8) {
		scoreString = '(very high)'
	}

	return `${Math.round(uv * 10) / 10} ${scoreString}`
}

export function createSunInfo(hourDateStamp: number, sunInfo: 'sunrise' | 'sunset', weatherData: IWeatherData | null, futureTime: TimeInfo | null) {
	if (futureTime?.type === 'hour') {
		const intervalDate = new Date(hourDateStamp * 1000).getDate()
		const correspondingDate = weatherData?.daily.find(date => new Date(date.dt * 1000).getDate() === intervalDate)

		if (correspondingDate) {

			return createDateInfo(correspondingDate[sunInfo]).preciseTime
		}
	}

	return null
}

export function createWindInfo(degrees: number): string {
	degrees = (degrees % 360 + 360) % 360;

	const directions = [
		{ name: "North", min: 348.75, max: 11.25 },
		{ name: "N-NE", min: 11.25, max: 33.75 },
		{ name: "Northeast", min: 33.75, max: 56.25 },
		{ name: "E-NE", min: 56.25, max: 78.75 },
		{ name: "East", min: 78.75, max: 101.25 },
		{ name: "E-SE", min: 101.25, max: 123.75 },
		{ name: "Southeast", min: 123.75, max: 146.25 },
		{ name: "S-SE", min: 146.25, max: 168.75 },
		{ name: "South", min: 168.75, max: 191.25 },
		{ name: "S-SW", min: 191.25, max: 213.75 },
		{ name: "Southwest", min: 213.75, max: 236.25 },
		{ name: "W-SW", min: 236.25, max: 258.75 },
		{ name: "West", min: 258.75, max: 281.25 },
		{ name: "W-NW", min: 281.25, max: 303.75 },
		{ name: "Northwest", min: 303.75, max: 326.25 },
		{ name: "N-NW", min: 326.25, max: 348.75 }
	]

	for (const direction of directions) {
		if (degrees >= direction.min && degrees < direction.max) {

			return direction.name
		}
	}

	return "Unknown"
}
