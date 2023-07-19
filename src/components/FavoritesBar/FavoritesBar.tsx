import classNames from 'classnames'
import { useWeatherContext } from '../../contexts/useWeatherContext'
import styles from './favorites-bar.module.scss'

type Props = {
	favoriteCities: string[]
}

export default function FavoritesBar(props: Props) {
	const { city, setCity } = useWeatherContext()

	function createAbb(city: string) {
		if (city.split(' ').length === 1) {
			// One word
			return city.substring(0, 3).toUpperCase()
		}

		// Multiple words
		return city.split(' ').map(word => word.substring(0, 1)).join('').substring(0, 3).toUpperCase()
	}

	return (
		<ul>
			{props.favoriteCities.length > 0 && props.favoriteCities.map((favCity, idx) => (
				<li
					key={idx}
					className={classNames(favCity === city && styles.chosen)}
					onClick={() => setCity(favCity)}
				>
					{createAbb(favCity)}
				</li>
			))}
		</ul>
	)
}