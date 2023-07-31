import { PuffLoader } from 'react-spinners'
import styles from './mobile-loader.module.scss'

export function MobileLoader() {
	return (
		<div className={styles.container}>
			<PuffLoader size={250} color={'#EC6E4C'} />
		</div>
	)
}