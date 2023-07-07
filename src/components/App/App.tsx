import { useState } from 'react'
import { useWeatherContext } from '../../contexts/useWeatherContext'
import styles from './app.module.scss'
import classNames from 'classnames'

function App() {
	const [isFavMobileActive, setIsFavMobileActive] = useState(false)
	const contextData = useWeatherContext()

	return (
		<div className={classNames(styles.appContainer, isFavMobileActive
			? styles.appContainerShowFavMobile
			: styles.appContainerHideFavMobile
		)}>
			<div className={styles.title}>Weather App</div>
			{contextData.error ? (
				<div className={styles.errorMessage}>{contextData.error}</div>
			) : (
				<>
					<div className={styles.search}></div>
					<div className={classNames(styles.favorites, isFavMobileActive
						? styles.favoritesShowFavMobile
						: styles.favoritesHideFavMobile
					)}></div>
					<div className={styles.favoritesStar} onClick={() => setIsFavMobileActive(!isFavMobileActive)}></div>
					<div className={styles.box}></div>
					<div className={styles.box}></div>
					<div className={styles.box}></div>
					<div className={styles.box}></div>
				</>
			)}
		</div>
	)


}

export default App
