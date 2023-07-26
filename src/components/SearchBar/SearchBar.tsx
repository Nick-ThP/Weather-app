import Fuse from 'fuse.js';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useWeatherContext } from '../../contexts/useWeatherContext';
import { City } from '../../data/city-types';
import cityData from '../../data/cityData.json';
import styles from './search-bar.module.scss';

export default function SearchBar() {
	const [fuseQuery, setFuseQuery] = useState('')
	const [input, setInput] = useState('')
	const { setCity, setError } = useWeatherContext()
	const inputRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		const searchTimeout = setTimeout(() => setFuseQuery(input), 200);

		return () => clearTimeout(searchTimeout);
	}, [input])

	const results = useMemo(() => {
		const fuse = new Fuse(cityData as City[], {
			keys: ['city']
		})

		if (fuseQuery) {
			return fuse.search(fuseQuery).map((city) => city.item)
		}

		return cityData
	}, [fuseQuery])

	function handleChooseCity(e: React.KeyboardEvent<HTMLInputElement>) {
		if (e.key === 'Enter' && inputRef.current) {
			if (results.length > 0) {
				setCity(results[0].city)
				setInput(results[0].city)
				inputRef.current.blur()
			} else {
				setCity('')
				setError('Sorry, this city does not exist in the data. \n Please adjust your search term to include a larger Danish city.')
			}
		}

		if (!e.keyCode && inputRef.current) {
			setCity(inputRef.current.value)
			setFuseQuery('')
			inputRef.current.blur()
		}
	}

	return (
		<div className={styles.container}>
			<input
				ref={inputRef}
				id="inputField"
				type="search"
				value={input}
				placeholder="Search for a city..."
				list="fuzzyList"
				onChange={(e) => setInput(e.target.value)}
				onKeyUp={(e) => handleChooseCity(e)}
			/>
			<datalist id="fuzzyList">
				{results.map((cityObj: City, idx) => (
					<option key={idx} value={cityObj.city} />
				))}
			</datalist>
		</div>
	)
}