import { useWeatherContext } from '../../contexts/useWeatherContext'
import styles from './app.module.scss'

function App() {
	const contextData = useWeatherContext()

	return (
		<div className={styles.appContainer}>
			<div className={styles.title}>Weather App</div>
			{contextData.error ? (
				<div className={styles.errorMessage}>{contextData.error}</div>
			) : (
				<>
					<div className={styles.search}></div>
					<div className={styles.favorites}></div>
					<div key="1" className={styles.col1}></div>
					<div key="2" className={styles.col2}></div>
					<div key="3" className={styles.col3}></div>
					<div key="4" className={styles.col4}></div>
				</>
			)}
		</div>
	)


}

export default App
