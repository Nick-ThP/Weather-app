const correspondingWeather: Record<string, string> = {
	'01d': 'clear-sky-day',
	'01n': 'clear-sky-night',
	'02d': 'few-clouds-day',
	'02n': 'few-clouds-night',
	'03d': 'scattered-clouds-day',
	'03n': 'scattered-clouds-night',
	'04d': 'broken-clouds-day',
	'04n': 'broken-clouds-night',
	'09d': 'shower-rain-day',
	'09n': 'shower-rain-night',
	'10d': 'rain-day',
	'10n': 'rain-night',
	'11d': 'thunderstorm-day',
	'11n': 'thunderstorm-night',
	'13d': 'snow-day',
	'13n': 'snow-night',
	'50d': 'mist-day',
	'50n': 'mist-night'
}

export function getWeatherString(icon: string | undefined): string {
	if (icon) {
		return correspondingWeather[icon]
	}

	return 'clouds-day'
}

const weatherNumbers: Record<string, number> = {
	'clear-sky-day': 0,
	'clear-sky-night': 1,
	'few-clouds-day': 2,
	'few-clouds-night': 3,
	'scattered-clouds-day': 2,
	'scattered-clouds-night': 3,
	'broken-clouds-day': 2,
	'broken-clouds-night': 3,
	'shower-rain-day': 4,
	'shower-rain-night': 4,
	'rain-day': 4,
	'rain-night': 4,
	'thunderstorm-day': 5,
	'thunderstorm-night': 5,
	'snow-day': 6,
	'snow-night': 6,
	'mist-day': 7,
	'mist-night': 7
}

export function convertWeatherStringToImageIndex(weather: string) {
	return weatherNumbers[weather]
}
