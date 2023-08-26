import classNames from 'classnames'
import { ReactNode } from 'react'
import { useWeatherContext } from '../../../contexts/useWeatherContext'
import styles from './box.module.scss'

interface Props {
	children: ReactNode
	error?: boolean
	forecast?: boolean
}

export function Box({ error = false, forecast = false, ...props }: Props) {
	const { futureTime } = useWeatherContext()

	return (
		<div className={classNames(styles.box, error && styles.error, forecast && styles.forecast, futureTime && styles.border)}>
			{props.children}
		</div>
	)
}
