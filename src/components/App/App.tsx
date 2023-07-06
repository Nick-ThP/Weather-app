import { useWeatherContext } from '../../contexts/useWeatherContext'
import styles from './app.module.sass'

function App() {
	const contextData = useWeatherContext()

	return (
		<>
			{contextData.error && (
				<div className={styles.errorContainer}>{contextData.error}</div>
			)}


		</>
	)


}

export default App
