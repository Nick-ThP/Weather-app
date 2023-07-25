export function createDateInfo(timeStamp: number) {
	const fullDate = new Date(timeStamp * 1000);
	const weekDays = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday'
	]

	return {
		date: `${weekDays[fullDate.getDay()].substring(0, 3)} ${fullDate.getDate()}/${fullDate.getMonth()}`,
		time: `${fullDate.getHours()}:00`
	}
}