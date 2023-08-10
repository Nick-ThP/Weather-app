import classNames from "classnames"
import { useLayoutEffect, useState } from "react"
import Skeleton from "react-loading-skeleton"
import 'react-loading-skeleton/dist/skeleton.css'
import { useWeatherContext } from "../../contexts/useWeatherContext"
import { useMediaQuery } from "../../hooks/useMediaQuery"
import rain from '../../images/rain.png'
import sun from '../../images/sun.png'
import sunrise from '../../images/sunrise.png'
import sunset from '../../images/sunset.png'
import wind from '../../images/wind.png'
import { createDateInfo } from "../../utils/date-formatting"
import { createTemperatureInfo } from "../../utils/temperature-formatting"
import { Line } from "../reuseables/Line/Line"
import styles from './main-info.module.scss'


interface Props {
	favoriteCities: string[]
	setFavoriteCities: (arr: string[]) => void
}

export function MainInfo(props: Props) {
	const [isFavorite, setIsFavorite] = useState<boolean>(false)
	const [isMobile] = useMediaQuery('only screen and (max-width: 1000px)')
	const { city, weatherData, isLoading } = useWeatherContext()

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
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 576 512">
								<path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" />
							</svg>
						</div>
						<div className={styles.row}>
							{weatherData?.current.dt && (
								<div className={styles.currentDate}>
									{`${createDateInfo(weatherData?.current.dt).dateShort} - ${createDateInfo(weatherData?.current.dt).time}`}
								</div>
							)}
						</div>
						<div className={styles.row}>
							<div className={styles.currentWeather}>
								{weatherData?.current.weather[0].description.split('').map((letter, idx) => idx === 0 ? letter.toUpperCase() : letter).join('')}
							</div>
						</div>
						<div className={styles.row}>
							{weatherData?.current.temp && (
								<div className={styles.temp}>{`${createTemperatureInfo(weatherData?.current.temp)}°`}</div>
							)}
							{weatherData?.current.weather[0].icon && (
								<img
									className={styles.dynamicIcon}
									src={`https://openweathermap.org/img/wn/${weatherData?.current.weather[0].icon}@2x.png`}
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
							<img className={styles.staticIcon} src={sun} alt="UV Index" />
							<div className={styles.description}>
								<div>
									UV index
								</div>
								<div>
									{`${Number(weatherData?.current.uvi.toString().substring(0, 3))} ${Number(weatherData?.current.uvi) < 6 ? '(low)' : Number(weatherData?.current.uvi) < 8 ? '(high)' : '(very high)'}`}
								</div>
							</div>
						</div>
						<div className={styles.row}>
							<img className={styles.staticIcon} src={wind} alt="Wind" />
							<div className={styles.description}>
								<div>
									Wind speed
								</div>
								<div>
									{Number(weatherData?.current.wind_speed.toString().substring(0, 3))} m/s
								</div>
							</div>
						</div>
						<div className={styles.row}>
							<img className={styles.staticIcon} src={rain} alt="Rainfall" />
							<div className={styles.description}>
								<div>
									Rain this hour
								</div>
								<div>
									{weatherData?.current.rain ? Number(weatherData?.current.rain?.["1h"].toString().substring(0, 3)) : 0} mm
								</div>
							</div>
						</div>
						<Line type="box" horizontalOnDesktop />
						<div className={styles.sunRow}>
							<div className={styles.sunInfo}>
								<img className={styles.staticIcon} src={sunrise} alt="sunrise" />
								{weatherData?.current.sunrise && (
									<div>
										{createDateInfo(weatherData?.current.sunrise).preciseTime}
									</div>
								)}
							</div>
							<div className={styles.sunInfo}>
								<img className={styles.staticIcon} src={sunset} alt="sunset" />
								{weatherData?.current.sunset && (
									<div>
										{createDateInfo(weatherData?.current.sunset).preciseTime}
									</div>
								)}
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	)
}