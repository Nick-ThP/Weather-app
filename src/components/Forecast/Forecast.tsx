import classNames from 'classnames';
import { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useWeatherContext } from "../../contexts/useWeatherContext";
import { createDateInfo } from '../../utils/date-formatting';
import { Button } from "../reuseables/Button/Button";
import { Line } from '../reuseables/Line/Line';
import styles from './forecast.module.scss';

export function Forecast() {
	const [isForecastToggle, setIsForecastToggle] = useState<boolean>(false)
	const { weatherData, isLoading } = useWeatherContext()

	function toggleForecast() {
		setIsForecastToggle(!isForecastToggle)
	}

	return (
		<div className={classNames(styles.wrapper, isLoading && styles.skeletonWrapper)}>
			{isLoading ? (
				<>
					<div className={styles.skeletons}>
						<Skeleton className={styles.skeleton} circle count={12} inline width={'4rem'} height={'4rem'} />
					</div>
					<div className={styles.skeletons}>
						<Skeleton className={styles.skeleton} count={12} inline width={'4rem'} height={'.75rem'} />
					</div>
				</>
			) : (
				<>
					<div className={styles.buttons}>
						<Button
							isClicked={!isForecastToggle}
							clickFunc={toggleForecast}
							type="toggle"
							width="10.5rem"
							mobileWidth="50%"
						>
							Next full week
						</Button>
						<Button
							isClicked={isForecastToggle}
							clickFunc={toggleForecast}
							type="toggle"
							width="10.5rem"
							mobileWidth="50%"
						>
							Next 48 hours
						</Button>
					</div>
					{isForecastToggle ? (
						<div className={styles.hours}>
							{weatherData?.hourly.map((hour, idx) => (
								<div className={styles.hourWithLine} key={idx}>
									{idx > 0 && (
										<Line type="date" midnightSplit={createDateInfo(hour.dt).time === '0:00'} />
									)}
									<div className={styles.hour}>
										<div>{createDateInfo(hour.dt).time}</div>
										<img
											src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}.png`}
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
									<div className={styles.date}>
										<div>{createDateInfo(date.dt).dateShort}</div>
										<img
											src={`https://openweathermap.org/img/wn/${date.weather[0].icon}.png`}
											alt="current weather depiction"
										/>
										<div className={styles.temp}>
											{`${weatherData?.daily[idx].temp.max.toString().substring(0, 2)}° / ${weatherData?.daily[idx].temp.min.toString().substring(0, 2)}°`}
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

