import classNames from 'classnames';
import { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useWeatherContext } from "../../contexts/useWeatherContext";
import { useHorizontalScroll } from '../../hooks/useHorizontalScroll';
import { createDateInfo } from '../../utils/date-formatting';
import { createTemperatureInfo } from '../../utils/temperature-formatting';
import { TimeInfo } from '../App/App';
import { Button } from "../reuseables/Button/Button";
import { Line } from '../reuseables/Line/Line';
import styles from './forecast.module.scss';

type Props = {
	futureTimeInterval: TimeInfo | null
	setFutureTimeInterval: (val: TimeInfo | null) => void
}

export function Forecast(props: Props) {
	const [isForecastToggle, setIsForecastToggle] = useState<boolean>(false)
	const { weatherData, isLoading } = useWeatherContext()
	const scrollRef = useHorizontalScroll()

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
						<div className={styles.hours} ref={scrollRef}>
							{weatherData?.hourly.filter((hour, idx) => idx !== 0).map((hour, idx) => (
								<div className={styles.hourWithLine} key={idx}>
									{idx > 0 && (
										<Line type="date" midnightSplit={createDateInfo(hour.dt).time === '0:00'} />
									)}
									<div className={classNames(styles.hour, props.futureTimeInterval?.dt === hour.dt && styles.hourSelected)} onClick={() => props.setFutureTimeInterval(props.futureTimeInterval?.dt === hour.dt ? null : { type: 'hour', dt: hour.dt })}>
										<div>{createDateInfo(hour.dt).time}</div>
										<img
											src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}.png`}
											alt="current weather depiction"
										/>
										<div className={styles.temp}>{`${createTemperatureInfo(weatherData?.hourly[idx].temp)}°`}</div>
										<div className={classNames(styles.rain, !weatherData?.hourly[idx].rain && styles.rainHidden)}>
											{`${!weatherData?.hourly[idx].rain?.['1h'] ? '0.0' : Number(weatherData?.hourly[idx].rain?.['1h'].toString().split('.').pop())} mm`}
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
									<div className={classNames(styles.date, props.futureTimeInterval?.dt === date.dt && styles.hourSelected)} onClick={() => props.setFutureTimeInterval(props.futureTimeInterval?.dt === date.dt ? null : { type: 'date', dt: date.dt })}>
										<div>{createDateInfo(date.dt).dateShort}</div>
										<img
											src={`https://openweathermap.org/img/wn/${date.weather[0].icon}.png`}
											alt="current weather depiction"
										/>
										<div className={styles.temp}>
											{`${createTemperatureInfo(weatherData?.daily[idx].temp.max)}° / ${createTemperatureInfo(weatherData?.daily[idx].temp.min)}°`}
										</div>
										<div className={classNames(styles.rain, !weatherData?.daily[idx].rain && styles.rainHidden)}>
											{`${!weatherData?.daily[idx].rain ? '0.0' : Number(weatherData?.daily[idx].rain?.toString().substring(0, 3))} mm`}
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

