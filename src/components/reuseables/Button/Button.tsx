import classNames from 'classnames'
import { ReactNode } from 'react'
import { useMediaQuery } from '../../../hooks/useMediaQuery'
import styles from './button.module.scss'

export type Props = {
	children: ReactNode
	onClick: (val?: unknown) => void
	isClicked?: boolean
	type?: 'standard' | 'toggle'
	width?: string
	mobileWidth?: string
	shape?: 'rectangular' | 'round'
}

export function Button({
	type = 'standard',
	width = 'auto',
	mobileWidth = width,
	shape = 'rectangular',
	...props
}: Props) {
	const [isMobile] = useMediaQuery('only screen and (max-width: 1000px)')

	function createClick() {
		if (props.onClick) {
			switch (type) {
				case 'standard':
					return props.onClick()
				case 'toggle':
					return props.isClicked ? undefined : props.onClick()
				default:
					break
			}
		}
	}

	return (
		<button
			className={classNames(props.isClicked && styles.clicked, styles[shape])}
			onClick={createClick}
			style={{ width: isMobile ? mobileWidth : width }}
			data-testid={isMobile ? 'mobile-button' : 'desktop-button'}
		>
			{props.children}
		</button>
	)
}
