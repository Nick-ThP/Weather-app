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
		dateShort: `${weekDays[fullDate.getDay()].substring(0, 3)}. ${fullDate.getDate()}/${fullDate.getMonth() + 1}`,
		dateFull: `${weekDays[fullDate.getDay()]} ${fullDate.getDate() }/${fullDate.getMonth() + 1}`,
		time: `${fullDate.getHours()}:00`,
		preciseTime: `${fullDate.getHours()}:${fullDate.getMinutes().toString().split('')[1] ? fullDate.getMinutes() : '0' + fullDate.getMinutes().toString()}`
	}
}