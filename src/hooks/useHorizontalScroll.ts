import { RefObject, useEffect, useRef } from 'react';

export function useHorizontalScroll(): RefObject<HTMLDivElement> {
	const elRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const el = elRef.current;

		if (el) {
			const onWheel = (e: WheelEvent) => {
				if (e.deltaY === 0) {
					return;
				}

				if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
					e.preventDefault();
					el.scrollLeft += e.deltaX;
				} else {
					el.scrollTo({ left: el.scrollLeft + e.deltaY });
				}
			};

			el.addEventListener('wheel', onWheel);

			return () => el.removeEventListener('wheel', onWheel);
		}
	}, []);

	return elRef;
}