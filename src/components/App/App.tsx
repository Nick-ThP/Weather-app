import { useState } from 'react'
import { useWeatherContext } from '../../contexts/useWeatherContext'
import styles from './app.module.scss'
import FavoritesStar from '../FavoritesStar/FavoritesStar'
import FavoritesBar from '../FavoritesBar/FavoritesBar'
import classNames from 'classnames'
import SearchBar from '../SearchBar/SearchBar'
import MainInformation from '../MainInformation/MainInformation'

function App() {
	const [isFavMobileOpen, setIsFavMobileOpen] = useState(false)
	const contextData = useWeatherContext()
	console.log(contextData)

	return (
		<div className={classNames(styles.container, contextData.error && styles.errorOccured)}>
			<h1 className={styles.title}>Weather App</h1>
			<div className={styles.search}>
				<SearchBar />
			</div>
			<div className={classNames(styles.favorites, isFavMobileOpen
				? styles.favoritesShowOnMobile
				: styles.favoritesHideOnMobile
			)}>
				<FavoritesBar />
			</div>
			<FavoritesStar
				show={isFavMobileOpen}
				toggleShow={setIsFavMobileOpen}
			/>
			{contextData.error ? (
				<div className={styles.errorMessage}>
					{contextData.error}
				</div>
			) : (
				<>
					<div className={styles.box}>
						<MainInformation />
					</div>
					<div className={styles.box}>
						<MainInformation />
					</div>
					<div className={styles.box}>
						<MainInformation />
					</div>
					<div className={styles.box}>
						<MainInformation />
					</div>
				</>
			)}
		</div>
	)
}

export default App
