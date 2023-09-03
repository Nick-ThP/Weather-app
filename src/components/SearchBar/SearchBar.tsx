import Fuse from 'fuse.js'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useWeatherContext } from '../../context/useWeatherContext'
import { City } from '../../data/city-data-types'
import cityData from '../../data/cityData.json'
import styles from './search-bar.module.scss'

export function SearchBar() {
	const [fuseQuery, setFuseQuery] = useState('')
	const [input, setInput] = useState('')
	const { city, setCity, setError } = useWeatherContext()
	const inputRef = useRef<HTMLInputElement>(null)
	const cityRef = useRef<string>(city)

	useEffect(() => {
		if (cityRef.current !== city && input !== city) {
			setInput('')
		}

		cityRef.current = city
	}, [city, input])

	useEffect(() => {
		const debounce = setTimeout(() => {
			setFuseQuery(input.charAt(0).toUpperCase() + input.slice(1))
		}, 100)

		return () => clearTimeout(debounce)
	}, [input])

	const results = useMemo(() => {
		const fuse = new Fuse(cityData as City[], {
			threshold: 0.1,
			keys: ['city']
		})

		if (fuseQuery) {
			return fuse.search(fuseQuery).map((city) => city.item)
		}

		return cityData.filter((_, idx) => idx < 10)
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
			<div className={styles.search} data-text={input !== '' ? true : false}>
				<input
					ref={inputRef}
					id='inputField'
					type='search'
					value={input}
					placeholder='Search for a city...'
					list='fuzzyList'
					autoComplete='off'
					onChange={(e) => setInput(e.target.value)}
					onKeyUp={(e) => handleChooseCity(e)}
				/>
				<datalist id='fuzzyList' data-testid='datalist'>
					{results.map((cityObj, idx) => (
						<option key={idx} value={cityObj.city} />
					))}
				</datalist>
			</div>
		</div>
	)
}
