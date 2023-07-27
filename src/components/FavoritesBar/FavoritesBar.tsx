import { useWeatherContext } from '../../contexts/useWeatherContext'
import Button from '../reuseables/Button/Button'
import styles from './favorites-bar.module.scss'

type Props = {
	favoriteCities: string[]
	toggleShow: (param: boolean) => void
}

export default function FavoritesBar(props: Props) {
	const { city, setCity } = useWeatherContext()

	function clickHandler(city: string) {
		setCity(city)
		props.toggleShow(false)
		window.scrollTo(0, 0)
	}

	function createAbb(city: string) {
		if (city.split(' ').length === 1) {
			// One word
			return city.substring(0, 3).toUpperCase()
		}

		// Multiple words
		return city.split(' ').map(word => word.substring(0, 1)).join('').substring(0, 3).toUpperCase()
	}

	return (
		<div className={styles.container}>
			{props.favoriteCities.length > 0 && props.favoriteCities.map((favCity, idx) => (
				<Button
					key={idx}
					isClicked={favCity === city}
					clickFunc={() => clickHandler(favCity)}
					type="toggle"
					shape="round"
					width="70%"
				>
					{createAbb(favCity)}
				</Button>
			))}
		</div>
	)
}