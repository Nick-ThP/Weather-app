import classNames from 'classnames'
import { ReactNode } from 'react'
import styles from './button.module.scss'

type Props = {
	children: ReactNode
	isClicked?: boolean
	clickFunc?: (val?: unknown) => void
	type?: 'standard' | 'toggle'
	width?: string
	shape?: 'rectangular' | 'round'
}

export function Button({
	type = 'standard',
	width = 'auto',
	shape = 'rectangular',
	...props
}: Props) {
	function createClick() {
		if (props.clickFunc) {
			switch (type) {
				case 'standard':
					return props.clickFunc()
				case 'toggle':
					return props.isClicked ? undefined : props.clickFunc()
				default:
					break
			}
		}
	}

	return (
		<button
			className={classNames(props.isClicked && styles.clicked, styles[shape])}
			onClick={createClick}
			style={{ width: width }}
		>
			{props.children}
		</button>
	)
}