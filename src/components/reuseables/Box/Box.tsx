import classNames from "classnames";
import { ReactNode } from "react";
import styles from './box.module.scss';

interface Props {
	children: ReactNode
	error?: boolean
	forecast?: boolean
}

export function Box({ error = false, forecast = false, ...props }: Props) {
	return (
		<div className={classNames(styles.box, error && styles.error, forecast && styles.forecast)}>
			{props.children}
		</div>
	)
}