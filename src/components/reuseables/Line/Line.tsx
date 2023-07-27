import classNames from 'classnames'
import styles from './line.module.scss'

type Props = {
	type: 'box' | 'date'
	midnightSplit?: boolean
}


export default function Line({midnightSplit = false, ...props}: Props) {
	console.log(midnightSplit)
	return (
		<div className={classNames(styles.basis, styles[props.type], midnightSplit && styles.dateMidnightSplit)} />
	)
}