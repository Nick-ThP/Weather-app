import { useState } from 'react'
import { useWeatherContext } from '../../contexts/useWeatherContext'
import styles from './app.module.scss'
import FavoritesStar from '../FavoritesStar/FavoritesStar'
import FavoritesBar from '../FavoritesBar/FavoritesBar'
import classNames from 'classnames'
import SearchBar from '../SearchBar/SearchBar'
import MainInfo from '../Boxes/MainInfo/MainInfo'
import Error from '../Boxes/Error/Error'

function App() {
	const [isFavMobileOpen, setIsFavMobileOpen] = useState(false)
	const contextData = useWeatherContext()

	return (
		<div className={classNames(styles.container, contextData.error && styles.errorOccured)}>
			<div className={styles.title}>
				<h1>Weather App</h1>
			</div>
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
				<div className={styles.error}>
					<Error />
				</div>
			) : (
				<>
					<div className={styles.mainInfo}>
						<MainInfo />
					</div>
					<div className={styles.secondaryInfo}>
						<MainInfo />
					</div>
					<div className={styles.forecast}>
						<MainInfo />
					</div>
				</>
			)}
		</div>
	)
}

export default App
