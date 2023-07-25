import classNames from "classnames"
import { useLayoutEffect, useState } from "react"
import { useWeatherContext } from "../../contexts/useWeatherContext"
import rain from '../../images/rain.png'
import sun from '../../images/sun.png'
import wind from '../../images/wind.png'
import { createDateInfo } from "../../utils/date-formatting"
import styles from './main-info.module.scss'

interface Props {
	favoriteCities: string[]
	setFavoriteCities: (arr: string[]) => void
}

export default function MainInfo(props: Props) {
	const [isFavorite, setIsFavorite] = useState<boolean>(false)
	const { city, weatherData } = useWeatherContext()

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
			props.setFavoriteCities([city, ...props.favoriteCities].sort())
		}
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.column}>
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
						<div className={styles.date}>
							{`${createDateInfo(weatherData?.current.dt).date} - ${createDateInfo(weatherData?.current.dt).time}`}
						</div>
					)}
				</div>
				<div className={styles.row}>
					{`Currently ${weatherData?.current.weather[0].description}`}
				</div>
				<div className={styles.row}>
					<div className={styles.temp}>{`${weatherData?.current.temp.toString().substring(0, 2)}°`}</div>
						<img
							src={`https://openweathermap.org/img/wn/${weatherData?.current.weather[0].icon}@2x.png`}
							alt="current weather depiction"
						/>
				</div>
			</div>
			<div className={styles.line} />
			<div className={styles.column}>
				<div className={styles.row}>
					<img className={styles.icon} src={sun} alt="UV Index" />
					<div className={styles.description}>Current UV max: {weatherData?.current.uvi}</div>
				</div>
				<div className={styles.row}>
					<img className={styles.icon} src={wind} alt="Wind" />
					<div className={styles.description}>Wind speed: {weatherData?.current.wind_speed} m/s</div>
				</div>
				<div className={styles.row}>
					<img className={styles.icon} src={rain} alt="Rainfall" />
					<div className={styles.description}>Rain this hour: {weatherData?.hourly[0].pop} mm</div>
				</div>
			</div>
		</div>
	)
}