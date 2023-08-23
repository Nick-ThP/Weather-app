const weatherData: Record<string, string> = {
	'01d.png': 'clear-sky-day',
	'01n.png': 'clear-sky-night',
	'02d.png': 'few-clouds-day',
	'02n.png': 'few-clouds-night',
	'03d.png': 'scattered-clouds-day',
	'03n.png': 'scattered-clouds-night',
	'04d.png': 'broken-clouds-day',
	'04n.png': 'broken-clouds-night',
	'09d.png': 'shower-rain-day',
	'09n.png': 'shower-rain-night',
	'10d.png': 'rain-day',
	'10n.png': 'rain-night',
	'11d.png': 'thunderstorm-day',
	'11n.png': 'thunderstorm-night',
	'13d.png': 'snow-day',
	'13n.png': 'snow-night',
	'50d.png': 'mist-day',
	'50n.png': 'mist-night',
}

export function getWeatherToDisplay(icon: string | undefined): string {
	if (icon) {
		return weatherData[icon]
	}

	return 'scattered-clouds-day'
}





