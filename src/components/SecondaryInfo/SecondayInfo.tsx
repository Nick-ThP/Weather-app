import classNames from "classnames"
import Skeleton from "react-loading-skeleton"
import { useWeatherContext } from "../../contexts/useWeatherContext"
import { createDateInfo } from "../../utils/date-formatting"
import { Line } from "../reuseables/Line/Line"
import styles from './secondary-info.module.scss'

export function SecondayInfo() {
	const { weatherData, isLoading } = useWeatherContext()

	return (
		<div className={styles.wrapper}>
			<div className={classNames(styles.column)}>
				{isLoading ? (
					<Skeleton count={4.5} className={styles.skeleton} />
				) : (
					<>
						<div className={styles.row}>
							<div className={styles.information}>
								<div>
									Clouds
								</div>
								<div>
									{weatherData?.current.clouds}
								</div>
							</div>
						</div>
						<div className={styles.row}>
							<div className={styles.information}>
								<div>
									Dew points
								</div>
								<div>
									{weatherData?.current.dew_point}
								</div>
							</div>
						</div>
						<div className={styles.row}>
							<div className={styles.information}>
								<div>
									Humidity
								</div>
								<div>
									{weatherData?.current.humidity}
								</div>
							</div>
						</div>
						<div className={styles.row}>
							<div className={styles.information}>
								<div>
									Pressure
								</div>
								<div>
									{weatherData?.current.pressure}
								</div>
							</div>
						</div>
						<div className={styles.row}>
							<div className={styles.information}>
								<div>
									Visibility
								</div>
								<div>
									{weatherData?.current.visibility}
								</div>
							</div>
						</div>
					</>
				)}
			</div>
			<Line type="box" />
			<div className={classNames(styles.column)}>
				{isLoading ? (
					<Skeleton count={4.5} className={styles.skeleton} />
				) : (
					<>
						<div className={styles.row}>
							<div className={styles.information}>
								<div>
									Sunrise
								</div>
								{weatherData?.current.sunrise && (
									<div>
										{createDateInfo(weatherData?.current.sunrise).time}
									</div>
								)}
							</div>
						</div>
						<div className={styles.row}>
							<div className={styles.information}>
								<div>
									Sunset
								</div>
								{weatherData?.current.sunset && (
									<div>
										{createDateInfo(weatherData?.current.sunset).time}
									</div>
								)}
							</div>
						</div>
						<div className={styles.row}>
							<div className={styles.information}>
								<div>
									Wind degree
								</div>
								<div>
									{weatherData?.current.wind_deg}
								</div>
							</div>
						</div>
						<div className={styles.row}>
							<div className={styles.information}>
								<div>
									Wind gust
								</div>
								<div>
									{weatherData?.current.wind_gust}
								</div>
							</div>
						</div>
						<div className={styles.row}>
							<div className={styles.information}>
								<div>
									Feels like
								</div>
								<div>
									{weatherData?.current.feels_like}
								</div>
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	)
}