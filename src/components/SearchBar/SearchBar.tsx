import { useMemo, useState, useEffect } from 'react';
import styles from './search-bar.module.scss'
import cityData from '../../data/cityData.json'
import Fuse from 'fuse.js';
import { City } from '../../data/city-types';
import { useWeatherContext } from '../../contexts/useWeatherContext';

export default function SearchBar() {
	const [fuseQuery, setFuseQuery] = useState('')
	const [input, setInput] = useState('')
	const { setCity } = useWeatherContext()

	useEffect(() => {
		const searchTimeout = setTimeout(() => setFuseQuery(input), 1000);

		return () => clearTimeout(searchTimeout);
	}, [input])

	const results = useMemo(() => {
		const fuse = new Fuse(cityData as City[], {
			keys: ['city']
		})

		return fuse.search(fuseQuery).map((city) => city.item)
	}, [fuseQuery])

	function clickHandler(city: string) {
		setCity(city)
		setInput('')
	}

	return (
		<div className={styles.container}>
			<div className={styles.input}>
				<input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
			</div>
			{results && (
				<ul className={styles.searchResults}>
					{results.map((cityObj: City) => (
						<li key={cityObj.id} onClick={() => clickHandler(cityObj.city)}>
							{cityObj.city}
						</li>
					))}
				</ul>
			)}
		</div>
	)
}