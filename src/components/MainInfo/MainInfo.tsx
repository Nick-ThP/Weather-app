import classNames from "classnames"
import { useLayoutEffect, useMemo, useState } from "react"
import Skeleton from "react-loading-skeleton"
import 'react-loading-skeleton/dist/skeleton.css'
import { useWeatherContext } from "../../contexts/useWeatherContext"
import { Current, Daily } from "../../contexts/weather-data-types"
import { useMediaQuery } from "../../hooks/useMediaQuery"
import rain from '../../images/rain.png'
import sun from '../../images/sun.png'
import sunrise from '../../images/sunrise.png'
import sunset from '../../images/sunset.png'
import wind from '../../images/wind.png'
import { createDateInfo } from "../../utils/date-formatting"
import { createTempOrTemps } from "../../utils/temperature-formatting"
import { TimeInfo } from "../App/App"
import { Line } from "../reuseables/Line/Line"
import styles from './main-info.module.scss'

interface Props {
	weatherSource: Current | Daily | null
	futureTimeInterval: TimeInfo | null
	favoriteCities: string[]
	setFavoriteCities: (arr: string[]) => void
}

export function MainInfo(props: Props) {
	const [isFavorite, setIsFavorite] = useState<boolean>(false)
	const [isMobile] = useMediaQuery('only screen and (max-width: 1000px)')
	const { city, isLoading, weatherData, refresh } = useWeatherContext()

	useLayoutEffect(() => {
		if (props.favoriteCities.find(favCity => favCity === city)) {
			setIsFavorite(true)
		} else {
			setIsFavorite(false)
		}
	}, [props.favoriteCities, city])

	function favoriteClickHandler(city: string) {
		if (props.favoriteCities.find(favCity => favCity === city)) {
			props.setFavoriteCities(props.favoriteCities.filter(favCity => favCity !== city))
		} else {
			props.setFavoriteCities([...props.favoriteCities, city].sort())
		}
	}

	function createRainInfo(rain: number | { '1h': number }) {
		if (props.futureTimeInterval?.type === 'date' && typeof rain === 'number') {
			return Math.round(rain * 10) / 10
		} else if (typeof rain === 'object' && rain['1h']) {
			return Math.round(rain['1h'] * 10) / 10
		}
	}

	function createUvScore(uv: number) {
		let scoreString = ''

		if (uv === 0) {
			scoreString = '(none)'
		} else if (uv < 6) {
			scoreString = '(low)'
		} else if (uv < 8) {
			scoreString = '(high)'
		} else if (uv > 8) {
			scoreString = '(very high)'
		}

		return `${Math.round(uv * 10) / 10} ${scoreString}`
	}

	function findSunInfo(hourDateStamp: number, sunInfo: 'sunrise' | 'sunset') {
		if (props.futureTimeInterval?.type === 'hour') {
			const intervalDate = new Date(hourDateStamp * 1000).getDate()
			const correspondingDate = weatherData?.daily.find(date => new Date(date.dt * 1000).getDate() === intervalDate)

			if (correspondingDate) {
				return createDateInfo(correspondingDate[sunInfo]).preciseTime
			}
		}

		return null
	}

	return (
		<div className={styles.wrapper}>
			<div className={classNames(styles.column, (!isMobile && !isLoading) && styles.columnFirst)}>
				{isLoading ? (
					<Skeleton count={3.5} className={styles.skeleton} />
				) : (
					<>
						<div className={styles.row}>
							<h2>{city}</h2>
							<svg
								className={classNames(styles.star, isFavorite
									? styles.starFavorite
									: styles.starNotFavorite
								)}
								onClick={() => favoriteClickHandler(city)}
								viewBox="0 0 576 512"
							>
								<path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" />
							</svg>
						</div>
						<div className={styles.row}>
							{props.weatherSource?.dt && (
								<div className={styles.currentDate}>
									<div>
										{createDateInfo(props.weatherSource?.dt).dateFull}
									</div>
									<div className={styles.refreshSpan}>
										{props.futureTimeInterval?.type !== 'date' && (
											<>
												{createDateInfo(props.weatherSource?.dt).preciseTime}
											</>
										)}
										<svg
											className={styles.refreshIcon}
											viewBox="0 0 64 64"
											onClick={refresh}
										>
											<path d="M 22 12 C 16.486 12 12 16.486 12 22 L 12 23 C 12 24.104 12.896 25 14 25 C 15.104 25 16 24.104 16 23 L 16 22 C 16 18.691 18.691 16 22 16 L 42 16 C 45.309 16 48 18.691 48 22 L 48 24 L 45.107422 24 C 44.213422 24 43.685313 25.003281 44.195312 25.738281 L 49.089844 32.8125 C 49.529844 33.4495 50.471109 33.4495 50.912109 32.8125 L 55.806641 25.738281 C 56.314641 25.003281 55.788531 24 54.894531 24 L 52 24 L 52 22 C 52 16.486 47.514 12 42 12 L 22 12 z M 14 30.708984 C 13.654375 30.708984 13.308391 30.869 13.087891 31.1875 L 8.1953125 38.261719 C 7.6873125 38.996719 8.2134219 40 9.1074219 40 L 12 40 L 12 42 C 12 47.514 16.486 52 22 52 L 42 52 C 47.514 52 52 47.514 52 42 L 52 41 C 52 39.896 51.104 39 50 39 C 48.896 39 48 39.896 48 41 L 48 42 C 48 45.309 45.309 48 42 48 L 22 48 C 18.691 48 16 45.309 16 42 L 16 40 L 18.892578 40 C 19.786578 40 20.314688 38.996719 19.804688 38.261719 L 14.910156 31.1875 C 14.690156 30.869 14.345625 30.708984 14 30.708984 z" />
										</svg>
									</div>
								</div>
							)}
						</div>
						<div className={styles.row}>
							<div className={styles.currentWeather}>
								{props.weatherSource?.weather[0].description.split('').map((letter, idx) => idx === 0 ? letter.toUpperCase() : letter).join('')}
							</div>
						</div>
						<div className={styles.row}>
							{props.weatherSource?.temp && (
								<div className={classNames(styles.temp, typeof props.weatherSource?.temp === 'object' && styles.tempTwo)}>
									{createTempOrTemps(props.weatherSource?.temp)}
								</div>
							)}
							{props.weatherSource?.weather[0].icon && (
								<img
									className={styles.dynamicIcon}
									src={`https://openweathermap.org/img/wn/${props.weatherSource?.weather[0].icon}@2x.png`}
									alt="current weather depiction"
								/>
							)}
						</div>
					</>
				)}
			</div>
			<Line type="box" />
			<div className={classNames(styles.column, (!isMobile && !isLoading) && styles.columnSecond)}>
				{isLoading ? (
					<Skeleton count={3.5} className={styles.skeleton} />
				) : (
					<>
						<div className={styles.row}>
							<img className={styles.staticIcon} src={sun} alt="UV index" />
							<div className={styles.description}>
								<div>
									UV index
								</div>
								<div>
									{createUvScore(props.weatherSource?.uvi || 0)}
								</div>
							</div>
						</div>
						{props.weatherSource?.wind_speed && (
							<div className={styles.row}>
								<img className={styles.staticIcon} src={wind} alt="Wind" />
								<div className={styles.description}>
									<div>
										Wind speed
									</div>
									<div>
										{Math.round(props.weatherSource?.wind_speed * 10) / 10} m/s
									</div>
								</div>
							</div>
						)}
						<div className={styles.row}>
							<img className={styles.staticIcon} src={rain} alt="Rainfall" />
							<div className={styles.description}>
								<div>
									{props.futureTimeInterval?.type === 'date' ? 'Rainfall' : 'Rain this hour'}
								</div>
								<div>
									{props.weatherSource?.rain ? createRainInfo(props.weatherSource?.rain) : 0} mm
								</div>
							</div>
						</div>
						<Line type="box" horizontalOnDesktop />
						<div className={styles.sunRow}>
							<div className={styles.sunInfo}>
								<img className={styles.staticIcon} src={sunrise} alt="sunrise" />
								{props.weatherSource?.dt && (
									<>
										{props.weatherSource.sunrise ? (
											<>
												{createDateInfo(props.weatherSource?.sunrise).preciseTime}
											</>
										) : (
											<>
												{findSunInfo(props.weatherSource?.dt, 'sunrise')}
											</>
										)}
									</>
								)}
							</div>
							<div className={styles.sunInfo}>
								<img className={styles.staticIcon} src={sunset} alt="sunset" />
								{props.weatherSource?.dt && (
									<>
										{props.weatherSource.sunset ? (
											<>
												{createDateInfo(props.weatherSource?.sunset).preciseTime}
											</>
										) : (
											<>
												{findSunInfo(props.weatherSource?.dt, 'sunset')}
											</>
										)}
									</>
								)}
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	)
}