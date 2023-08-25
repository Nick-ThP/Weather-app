import classNames from 'classnames'
import styles from './line.module.scss'

type Props = {
	type: 'box' | 'date'
	horizontalOnDesktop?: boolean
	midnightSplit?: boolean
}

export function Line({
	midnightSplit = false,
	horizontalOnDesktop = false,
	...props
}: Props) {
	return (
		<div
			className={classNames(
				styles.basis,
				styles[props.type],
				midnightSplit && styles.dateMidnightSplit,
				horizontalOnDesktop && styles.horizontalOnDesktop
			)}
		/>
	)
}
