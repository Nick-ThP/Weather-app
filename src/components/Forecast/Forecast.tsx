import classNames from 'classnames';
import { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useWeatherContext } from "../../contexts/useWeatherContext";
import { createDateInfo } from '../../utils/date-formatting';
import { Button } from "../reuseables/Button/Button";
import { Line } from '../reuseables/Line/Line';
import styles from './forecast.module.scss';

export function Forecast() {
	const [isForecastToggle, setIsForecastToggle] = useState<boolean>(true)
	const { weatherData, isLoading } = useWeatherContext()

	function toggleForecast() {
		setIsForecastToggle(!isForecastToggle)
	}

	return (
		<div className={classNames(styles.wrapper, isLoading && styles.skeletonWrapper)}>
			{isLoading ? (
				// <div className={styles.skeletonWrapper}>
					<Skeleton circle count={5} className={styles.skeleton} />
				// </div>
			) : (
				<>
					<div className={styles.buttons}>
						<Button
							isClicked={isForecastToggle}
							clickFunc={toggleForecast}
							type="toggle"
							width="10.5rem"
						>
							Next 48 hours
						</Button>
						<Button
							isClicked={!isForecastToggle}
							clickFunc={toggleForecast}
							type="toggle"
							width="10.5rem"
						>
							Next full week
						</Button>
					</div>
					{isForecastToggle ? (
						<div className={styles.hours}>
							{weatherData?.hourly.filter((_, idx) => idx % 3 === 0).map((date, idx) => (
								<div className={styles.hourWithLine} key={idx}>
									{idx > 0 && (
										<Line type="date" midnightSplit={createDateInfo(date.dt).time.length === 4 && Number(createDateInfo(date.dt).time.substring(0, 1)) <= 2} />
									)}
									<div className={styles.date}>
										<div>{createDateInfo(date.dt).time}</div>
										<img
											src={`https://openweathermap.org/img/wn/${date.weather[0].icon}.png`}
											alt="current weather depiction"
										/>
										<div className={styles.temp}>{`${weatherData?.hourly[idx].temp.toString().substring(0, 2)}°`}</div>
										<div className={classNames(styles.rain, Number(weatherData?.hourly[idx].pop?.toString().substring(0, 3)) === 0.0 && styles.rainHidden)}>
											{`${Number(weatherData?.hourly[idx].pop?.toString().substring(0, 3)) === 0.0 ? '0.0' : Number(weatherData?.hourly[idx].pop?.toString().substring(0, 3))} mm`}
										</div>
									</div>
								</div>
							))}
						</div>
					) : (
						<div className={styles.dates}>
							{weatherData?.daily.map((date, idx) => (
								<div className={styles.dateWithLine} key={idx}>
									{idx > 0 && (
										<Line type="date" />
									)}
									<div className={styles.date} >
										<div>{createDateInfo(date.dt).dateFull}</div>
										<img
											src={`https://openweathermap.org/img/wn/${date.weather[0].icon}.png`}
											alt="current weather depiction"
										/>
										<div className={styles.temp}>
											{`${weatherData?.daily[idx].temp.min.toString().substring(0, 2)}° / ${weatherData?.daily[idx].temp.max.toString().substring(0, 2)}°`}
										</div>
										<div className={classNames(styles.rain, Number(weatherData?.daily[idx].pop?.toString().substring(0, 3)) === 0.0 && styles.rainHidden)}>
											{`${Number(weatherData?.daily[idx].pop?.toString().substring(0, 3)) === 0.0 ? '0.0' : Number(weatherData?.daily[idx].pop?.toString().substring(0, 3))} mm`}
										</div>
									</div>
								</div>
							))}
						</div>
					)}
				</>
			)}
		</div>
	)
}

