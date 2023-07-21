import { ReactNode } from "react";
import styles from './box.module.scss'
import classNames from "classnames";

interface Props {
	children: ReactNode
	error?: boolean
}

export default function Box({ error = false, ...props }: Props) {
	return (
		<div className={classNames(styles.box, error && styles.error)}>
			{props.children}
		</div>
	)
}