import { useWeatherContext } from "../../contexts/useWeatherContext"
import styles from './forecast.module.scss'

export default function Forecast() {
	const { weatherData, weatherIcons } = useWeatherContext()
	const amountOfDates = 9
	console.log(weatherIcons)

	function createDateInfo(timeStamp: number) {
		const fullDate = new Date(timeStamp * 1000);
		const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

		return `${weekDays[fullDate.getDay()]} ${fullDate.getDate()}/${fullDate.getMonth()}\n${fullDate.getHours()}:00`
	}

	return (
		<>
			<h3>Weather forecast for the next full day</h3>
			<div className={styles.dates}>
				{weatherData?.list?.filter((_, idx) => idx <= amountOfDates - 1).map((date, idx) => (
					<div className={styles.date} key={idx}>
						<div>{createDateInfo(date.dt)}</div>
						{weatherIcons && weatherIcons.length > 0 && (
							<img src={weatherIcons[idx].normal} alt="current weather depiction" />
						)}
					</div>
				))}
			</div>
		</>
	)
}