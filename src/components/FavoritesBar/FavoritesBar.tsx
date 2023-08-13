import { AnimatePresence, motion, useIsPresent } from 'framer-motion';
import { useWeatherContext } from '../../contexts/useWeatherContext';
import { Button } from '../reuseables/Button/Button';
import styles from './favorites-bar.module.scss';

type Props = {
	favoriteCities: string[]
	toggleShow: (param: boolean) => void
}

export function FavoritesBar(props: Props) {
	const { city, setCity } = useWeatherContext()
	const isPresent = useIsPresent();

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
			<AnimatePresence custom={props.favoriteCities}>
				{props.favoriteCities.map((favCity, idx) => (
					<motion.li
						key={favCity}
						initial={{ scale: 0, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						exit={{ scale: 0, opacity: 0 }}
						transition={{ type: "spring", stiffness: 900, damping: 40 }}
						className={!isPresent ? styles.absolute : undefined}
						layout
					>
						<Button
							onClick={() => clickHandler(favCity)}
							isClicked={favCity === city}
							type="toggle"
							shape="round"
							width="70%"
						>
							{createAbb(favCity)}
						</Button>
					</motion.li>
				))}
			</AnimatePresence>
		</ul >
	)
}