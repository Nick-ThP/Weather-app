import classNames from "classnames";
import { ReactNode } from "react";
import { useWeatherContext } from "../../../contexts/useWeatherContext";
import { Button } from "../Button/Button";
import styles from './box.module.scss';

interface Props {
	children: ReactNode
	error?: boolean
	forecast?: boolean
}

export function Box({ error = false, forecast = false, ...props }: Props) {
	const { refresh } = useWeatherContext()

	return (
		<div className={classNames(styles.box, error && styles.error, forecast && styles.forecast)}>
			{props.children}
			{error && (
				<Button onClick={refresh}>
					Refresh
				</Button>
			)}
		</div>
	)
}