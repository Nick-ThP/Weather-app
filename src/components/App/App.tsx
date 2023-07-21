import { useState } from 'react'
import { useWeatherContext } from '../../contexts/useWeatherContext'
import styles from './app.module.scss'
import FavoritesStar from '../FavoritesStar/FavoritesStar'
import FavoritesBar from '../FavoritesBar/FavoritesBar'
import classNames from 'classnames'
import SearchBar from '../SearchBar/SearchBar'
import MainInfo from '../MainInfo/MainInfo'
import Error from '../Error/Error'
import useLocalStorage from '../../hooks/useLocalStorage'
import Forecast from '../Forecast/Forecast'

function App() {
	const [favoriteCities, setFavoriteCities] = useLocalStorage<string[]>('favoriteCities', [])
	const [isFavMobileOpen, setIsFavMobileOpen] = useState<boolean>(false)
	const { error } = useWeatherContext()

	function favoriteClickHandler(city: string) {
		if (favoriteCities.find(favCity => favCity === city)) {
			setFavoriteCities(favoriteCities.filter(favCity => favCity !== city))
		} else {
			setFavoriteCities([city, ...favoriteCities].sort())
		}
	}

	return (
		<div className={classNames(styles.container, error && styles.errorOccured)}>
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
				<FavoritesBar
					favoriteCities={favoriteCities}
				/>
			</div>
			<FavoritesStar
				show={isFavMobileOpen}
				toggleShow={setIsFavMobileOpen}
			/>
			{error ? (
				<div className={styles.error}>
					<Error />
				</div>
			) : (
				<>
					<div className={styles.mainInfo}>
						<MainInfo
							favoriteCities={favoriteCities}
							setFavoriteCities={setFavoriteCities}
							favoriteClickHandler={favoriteClickHandler}
						/>
					</div>
					<div className={styles.secondaryInfo}>
						<MainInfo
							favoriteCities={favoriteCities}
							setFavoriteCities={setFavoriteCities}
							favoriteClickHandler={favoriteClickHandler}
						/>
					</div>
					<div className={styles.forecast}>
						<Forecast />
					</div>
				</>
			)}
		</div>
	)
}

export default App
