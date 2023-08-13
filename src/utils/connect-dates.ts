export function findFullDayWithHourInterval(hourIntervalDateString: number, daysArray: number[]) {
	const hourIntervalDate = new Date(hourIntervalDateString)
	const startHour = hourIntervalDate.getHours()

	const dayWithInterval = daysArray.find((dayDateString) => {
		const dayDate = new Date(dayDateString)
		return dayDate.getHours() === startHour
	})

	return dayWithInterval || null
}
