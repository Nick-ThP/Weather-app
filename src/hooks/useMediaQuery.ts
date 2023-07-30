import { useEffect, useState } from 'react';

export function useMediaQuery(initalQuery: string) {
	const [query, setQuery] = useState(initalQuery);
	const [matches, setMatches] = useState(false);

	useEffect(() => {
		if (!query) return

		const _onChange = (mql: MediaQueryListEvent) => {
			setMatches(mql.matches);
		}

		const mql = window.matchMedia(query)

		setMatches(mql.matches)

		try {
			mql.addEventListener("change", _onChange)
		} catch {
			mql.addListener(_onChange)
		}

		return () => {
			try {
				mql.removeEventListener("change", _onChange)
			} catch {
				mql.removeListener(_onChange)
			}
		}
	}, [query])

	return [matches, setQuery]
}