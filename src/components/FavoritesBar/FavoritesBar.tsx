import { AnimatePresence, motion } from 'framer-motion';
import { useWeatherContext } from '../../contexts/useWeatherContext';
import { Button } from '../reuseables/Button/Button';
import styles from './favorites-bar.module.scss';

type Props = {
	favoriteCities: string[]
	toggleShow: (param: boolean) => void
}

export function FavoritesBar(props: Props) {
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
		<ul>
			<AnimatePresence>
				{props.favoriteCities.map((favCity, idx) => (
					<motion.li
						key={favCity}
						initial={{ opacity: 0, x: -30 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: -30 }}
						transition={{ duration: .5 }}
						className={styles.individualButtonWrapper}
					>
						<Button
							isClicked={favCity === city}
							clickFunc={() => clickHandler(favCity)}
							type="toggle"
							shape="round"
							width="70%"
						>
							{createAbb(favCity)}
						</Button>
					</motion.li>
				))}
			</AnimatePresence>
		</ul>
	)
}