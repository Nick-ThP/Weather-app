import { useWeatherContext } from "../../contexts/useWeatherContext"
import styles from './main-information.module.scss'

export default function MainInformation() {
	const {city, weatherData} = useWeatherContext()

	return (
		<div className={styles.container}>
			<h2>{city}</h2>
			<div>{weatherData?.name}</div>
		</div>
	)
}