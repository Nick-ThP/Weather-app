export function createTemperatureInfo(date: number) {
	if (date.toString().split('')[1] === '.') {
		return date.toString().split('')[0]
	}

	return date.toString().substring(0, 2)
}