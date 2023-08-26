export function convertMinutesToChunks(inputArray: number[], chunkAmount: number): number[] {
	if (inputArray.length !== 60) {
		throw new Error('Input array must contain exactly 60 values.')
	}

	const outputArray: number[] = []
	for (let i = 0; i < chunkAmount; i++) {
		const startIndex = i * 10
		const endIndex = startIndex + 10
		const chunkSum = inputArray.slice(startIndex, endIndex).reduce((sum, value) => sum + value, 0)
		outputArray.push(chunkSum)
	}

	return outputArray
}
