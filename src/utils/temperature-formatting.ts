import { FeelsLike, Temp } from "../contexts/weather-data-types"

export function formatTemperature(date: number) {
	if (date.toString().split('')[1] === '.') {
		return date.toString().split('')[0]
	}

	return date.toString().substring(0, 2)
}

export function createTempOrTemps<T extends Temp | FeelsLike>(temp: number | T) {
	if (typeof temp === 'number') {
		return `${formatTemperature(temp)}°`
	}

	if ('max' in temp) {
		return `${formatTemperature(temp.max)}°/${formatTemperature(temp.min)}°`
	}

	return `${formatTemperature(temp.day)}° / ${formatTemperature(temp.night)}°`
}