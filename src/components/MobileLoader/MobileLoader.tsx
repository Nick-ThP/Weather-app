import { PuffLoader } from 'react-spinners'
import styles from './mobile-loader.module.scss'

export function MobileLoader() {
	return (
		<div className={styles.container}>
			<PuffLoader size={250} color={'#ec6e4c'} />
		</div>
	)
}
