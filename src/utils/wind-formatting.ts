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
