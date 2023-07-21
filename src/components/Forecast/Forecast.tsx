import { useWeatherContext } from "../../contexts/useWeatherContext"
import Box from "../reuseables/Box/Box"
import styles from './forecast.module.scss'

export default function Forecast() {
	const { weatherData } = useWeatherContext()
	const amountOfDates = 5

	return (
		<Box>
			<h3>Weather forecast for the next 5 days</h3>
			<div className={styles.dates}>
				{weatherData?.list?.filter((_, idx) => idx - 1 <= amountOfDates).map((date, idx) => (
					<div className={styles.date} key={idx}>
						{date.dt_txt}
					</div>
				))}
			</div>
		</Box>
	)
}