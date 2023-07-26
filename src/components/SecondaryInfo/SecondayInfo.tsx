import { useWeatherContext } from "../../contexts/useWeatherContext"
import styles from './secondary-info.module.scss'

export default function SecondayInfo() {
	const { weatherData } = useWeatherContext()

	return (
		<div className={styles.wrapper}>
			{weatherData?.current.clouds}
		</div>
	)
}