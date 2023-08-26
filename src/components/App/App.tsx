import classNames from 'classnames'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { isMobileSafari } from 'react-device-detect'
import { useWeatherContext } from '../../contexts/useWeatherContext'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { getWeatherToDisplay } from '../../utils/display-weather'
import { FavoritesBar } from '../FavoritesBar/FavoritesBar'
import { FavoritesStar } from '../FavoritesStar/FavoritesStar'
import { Forecast } from '../Forecast/Forecast'
import { MainInfo } from '../MainInfo/MainInfo'
import { MobileLoader } from '../MobileLoader/MobileLoader'
import { MobileReturn } from '../MobileReturn/MobileReturn'
import { SearchBar } from '../SearchBar/SearchBar'
import { SecondaryInfo } from '../SecondaryInfo/SecondaryInfo'
import { Box } from '../reuseables/Box/Box'
import styles from './app.module.scss'
import './background.scss'

export function App() {
	const [favoriteCities, setFavoriteCities] = useLocalStorage<string[]>(
		'favoriteCities',
		[]
	)
	const [isFavMobileOpen, setIsFavMobileOpen] = useState<boolean>(false)
	const [isMobile] = useMediaQuery('only screen and (max-width: 1000px)')
	const { error, futureTime, isLoading, weatherSource } = useWeatherContext()

	return (
		<>
			{isLoading && isMobile ? (
				<MobileLoader />
			) : (
				<div
					className={classNames(
						styles.container,
						error && styles.errorOccured,
						favoriteCities.length === 0 && styles.containerWithoutFavorites,
						error &&
							favoriteCities.length === 0 &&
							styles.errorOccuredWithoutFavorites
					)}
					data-weather={
						!isMobile && getWeatherToDisplay(weatherSource?.weather[0].icon)
					}
				>
					<div className={styles.title}>
						<h1 className={classNames(isMobileSafari && styles.safari)}>
							Simple Weather
						</h1>
						{!isMobile && <p>A Simplified Source for Weather Information</p>}
					</div>
					<div className={styles.search}>
						<SearchBar />
					</div>
					{favoriteCities.length > 0 && (
						<>
							<div
								className={classNames(
									styles.favorites,
									isFavMobileOpen
										? styles.favoritesShowOnMobile
										: styles.favoritesHideOnMobile
								)}
							>
								{isMobile ? (
									<FavoritesBar
										favoriteCities={favoriteCities}
										toggleShow={setIsFavMobileOpen}
									/>
								) : (
									<motion.div
										initial={{ scaleX: 0, opacity: 0 }}
										animate={{ scaleX: 1, opacity: 1 }}
										exit={{ scaleX: 0, opacity: 0 }}
										transition={{ type: 'spring', stiffness: 900, damping: 40 }}
									>
										<FavoritesBar
											favoriteCities={favoriteCities}
											toggleShow={setIsFavMobileOpen}
										/>
									</motion.div>
								)}
							</div>
							<FavoritesStar
								show={isFavMobileOpen}
								toggleShow={setIsFavMobileOpen}
							/>
						</>
					)}
					{isMobile && (futureTime || error) && <MobileReturn />}
					{error ? (
						<div className={styles.error}>
							<Box error={true}>{error}</Box>
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
									<SecondaryInfo />
								</Box>
							</div>
							<div className={styles.forecast}>
								<Box forecast>
									<Forecast />
								</Box>
							</div>
						</>
					)}
				</div>
			)}
		</>
	)
}
