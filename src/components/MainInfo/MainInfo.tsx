import { useLayoutEffect, useState } from "react"
import { useWeatherContext } from "../../contexts/useWeatherContext"
import styles from './main-info.module.scss'
import classNames from "classnames"


interface Props {
	favoriteCities: string[]
	setFavoriteCities: (arr: string[]) => void
}

export default function MainInfo(props: Props) {
	const [isFavorite, setIsFavorite] = useState<boolean>(false)
	const { city, weatherIcons } = useWeatherContext()

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
				<h3>Current weather:</h3>
				{weatherIcons && weatherIcons.length > 0 && (
					<img src={weatherIcons[0].zoomed} alt="current weather depiction" />
				)}
			</div>
		</>
	)
}