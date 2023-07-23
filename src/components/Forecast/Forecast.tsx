import { useWeatherContext } from "../../contexts/useWeatherContext"
import styles from './forecast.module.scss'

export default function Forecast() {
	const { weatherData, weatherIcons } = useWeatherContext()
	const amountOfDates = 9

	function createDateInfo(timeStamp: number) {
		const fullDate = new Date(timeStamp * 1000);
		const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

		return `${weekDays[fullDate.getDay()].substring(0, 3)} ${fullDate.getDate()}/${fullDate.getMonth()}\n${fullDate.getHours()}:00`
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.switches}>
				<h3>Next 24 hours</h3>
				<h3>Next full week</h3>
			</div>
			<div className={styles.dates}>
				{weatherData?.list?.filter((_, idx) => idx <= amountOfDates - 1).map((date, idx) => (
					<div className={styles.date} key={idx}>
						<div>{createDateInfo(date.dt)}</div>
						{weatherIcons && weatherIcons.length > 0 && (
							<img src={weatherIcons[idx].normal} alt="current weather depiction" />
						)}
						<div className={styles.temp}>{`${weatherData?.list[idx].main.temp.toString().substring(0, 2)}°`}</div>
					</div>
				))}
			</div>
		</div>
	)
}