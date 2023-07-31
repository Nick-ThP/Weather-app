import classNames from "classnames"
import Skeleton from "react-loading-skeleton"
import { useWeatherContext } from "../../contexts/useWeatherContext"
import { createDateInfo } from "../../utils/date-formatting"
import { createWindInfo } from "../../utils/wind-formatting"
import { Line } from "../reuseables/Line/Line"
import styles from './secondary-info.module.scss'

export function SecondayInfo() {
	const { weatherData, isLoading } = useWeatherContext()

	return (
		<div className={styles.wrapper}>
			<div className={classNames(styles.column, !isLoading && styles.columnJustification)}>
				{isLoading ? (
					<Skeleton count={3.5} className={styles.skeleton} />
				) : (
					<>
						<div className={styles.row}>
							<div className={styles.information}>
								<div>
									Feels like
								</div>
								<div>
									{`${weatherData?.current.feels_like.toString().substring(0, 2)}° C`}
								</div>
							</div>
						</div>
						<div className={styles.row}>
							<div className={styles.information}>
								<div>
									Wind direction
								</div>
								{weatherData?.current.wind_deg && (
									<div>
										{createWindInfo(weatherData?.current.wind_deg)}
									</div>
								)}
							</div>
						</div>
						<div className={styles.row}>
							<div className={styles.information}>
								<div>
									Wind gusts
								</div>
								<div>
									{weatherData?.current.wind_gust ? `${weatherData?.current.wind_gust} km/h` : 'None'}
								</div>
							</div>
						</div>
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
					</>
				)}
			</div>
			<Line type="box" />
			<div className={classNames(styles.column, !isLoading && styles.columnJustification)}>
				{isLoading ? (
					<Skeleton count={3.5} className={styles.skeleton} />
				) : (
					<>
						<div className={styles.row}>
							<div className={styles.information}>
								<div>
									Cloud cover
								</div>
								<div>
									{`${weatherData?.current.clouds} %`}
								</div>
							</div>
						</div>
						<div className={styles.row}>
							<div className={styles.information}>
								<div>
									Humidity
								</div>
								<div>
									{`${weatherData?.current.humidity} %`}
								</div>
							</div>
						</div>
						<div className={styles.row}>
							<div className={styles.information}>
								<div>
									Dew point
								</div>
								<div>
									{`${weatherData?.current.dew_point.toString().substring(0, 2)}° C`}
								</div>
							</div>
						</div>
						<div className={styles.row}>
							<div className={styles.information}>
								<div>
									Pressure
								</div>
								<div>
									{`↔ ${weatherData?.current.pressure} mb`}
								</div>
							</div>
						</div>
						<div className={styles.row}>
							<div className={styles.information}>
								<div>
									Visibility
								</div>
								<div>
									{`${weatherData?.current.visibility} m`}
								</div>
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	)
}