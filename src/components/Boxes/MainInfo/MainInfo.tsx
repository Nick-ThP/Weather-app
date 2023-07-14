import { useWeatherContext } from "../../../contexts/useWeatherContext"
import styles from './main-info.module.scss'


export default function MainInfo() {
	const {city, weatherData, weatherIcons} = useWeatherContext()

	return (
		<div className={styles.container}>
			<h2>{city}</h2>
			<img src={weatherIcons?.zoomed} alt="current weather depiction" />
		</div>
	)
}