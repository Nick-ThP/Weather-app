import classNames from 'classnames'
import { ReactNode } from 'react'
import styles from './button.module.scss'

type Props = {
	children: ReactNode
	isClicked: boolean
	clickFunc?: () => void
	type?: 'toggle' | 'action'
}


export default function Button(props: Props) {
	function createClick() {
		if (props.clickFunc) {
			switch (props.type) {
				case 'action':
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
			className={classNames(props.isClicked ? styles.clicked : styles.unclicked)}
			onClick={createClick}
		>
			{props.children}
		</button>
	)
}