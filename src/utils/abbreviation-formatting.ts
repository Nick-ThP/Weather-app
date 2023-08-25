export function createAbb(city: string) {
	if (city.split(' ').length === 1) {
		return city.substring(0, 3).toUpperCase()
	}

	return city
		.split(' ')
		.map((word) => word.substring(0, 1))
		.join('')
		.substring(0, 3)
		.toUpperCase()
}
