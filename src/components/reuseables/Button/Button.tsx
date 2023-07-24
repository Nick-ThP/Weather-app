import { ReactNode } from 'react'
import styles from './button.module.scss'
import classNames from 'classnames'

type Props = {
	children: ReactNode
	isClicked: boolean
	clickFunc?: () => void
	clickType?: 'toggle' | 'action'
}


export default function Button(props: Props) {
	function createClick() {
		if (props.clickFunc) {
			switch (props.clickType) {
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