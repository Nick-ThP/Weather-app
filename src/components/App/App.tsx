import classNames from 'classnames'
import { useState } from 'react'
import { useWeatherContext } from '../../contexts/useWeatherContext'
import useLocalStorage from '../../hooks/useLocalStorage'
import FavoritesBar from '../FavoritesBar/FavoritesBar'
import FavoritesStar from '../FavoritesStar/FavoritesStar'
import Forecast from '../Forecast/Forecast'
import MainInfo from '../MainInfo/MainInfo'
import SearchBar from '../SearchBar/SearchBar'
import Box from '../reuseables/Box/Box'
import styles from './app.module.scss'

function App() {
	const [favoriteCities, setFavoriteCities] = useLocalStorage<string[]>('favoriteCities', [
		'København',
		'Aarhus',
		'Odense',
		'Aalborg',
		'Esbjerg'
	])
	const [isFavMobileOpen, setIsFavMobileOpen] = useState<boolean>(false)
	const { error } = useWeatherContext()

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
					toggleShow={setIsFavMobileOpen}
				/>
			</div>
			<FavoritesStar
				show={isFavMobileOpen}
				toggleShow={setIsFavMobileOpen}
			/>
			{error ? (
				<div className={styles.error}>
					<Box error={true}>
						{error}
					</Box>
				</div>
			) : (
				<>
					<div className={styles.mainInfo}>
						<Box>
							<MainInfo
								favoriteCities={favoriteCities}
								setFavoriteCities={setFavoriteCities}
							/>
						</Box>
					</div>
					<div className={styles.secondaryInfo}>
						<Box>
							<MainInfo
								favoriteCities={favoriteCities}
								setFavoriteCities={setFavoriteCities}
							/>
						</Box>
					</div>
					<div className={styles.forecast}>
						<Box>
							<Forecast />
						</Box>
					</div>
				</>
			)}
		</div>
	)
}

export default App
