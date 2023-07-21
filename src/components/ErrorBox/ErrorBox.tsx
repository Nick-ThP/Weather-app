import { useWeatherContext } from "../../contexts/useWeatherContext"
import styles from './error.module.scss'

export default function Error() {
	const { error } = useWeatherContext()

	return (
		<div className={styles.container}>
			{error}
		</div>
	)
}