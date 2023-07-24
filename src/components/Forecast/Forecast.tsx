import { useState } from 'react'
import { useWeatherContext } from "../../contexts/useWeatherContext"
import Button from "../reuseables/Button/Button";
import styles from './forecast.module.scss'

export default function Forecast() {
	const [forecastToggle, setForecastToggle] = useState<boolean>(true)
	const { weatherData, weatherIcons } = useWeatherContext()
	const amountOfDates = 9

	function createDateInfo(timeStamp: number) {
		const fullDate = new Date(timeStamp * 1000);
		const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

		return `${weekDays[fullDate.getDay()].substring(0, 3)} ${fullDate.getDate()}/${fullDate.getMonth()}\n${fullDate.getHours()}:00`
	}

	function toggleDayWeek() {
		setForecastToggle(!forecastToggle)
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.toggle}>
				<Button
					isClicked={forecastToggle}
					clickFunc={toggleDayWeek}
					clickType='toggle'
				>
					Next 24 hours
				</Button>
				<Button
					isClicked={!forecastToggle}
					clickFunc={toggleDayWeek}
					clickType='toggle'
				>
					Next full week
				</Button>
			</div>
			{forecastToggle ? (
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
			) : (
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
			)}
		</div>
	)
}