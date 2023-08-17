import classNames from 'classnames'
import { useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { useWeatherContext } from "../../contexts/useWeatherContext"
import { useHorizontalScroll } from '../../hooks/useHorizontalScroll'
import { createDateInfo } from '../../utils/date-formatting'
import { Button } from "../reuseables/Button/Button"
import { Line } from '../reuseables/Line/Line'
import styles from './forecast.module.scss'
import { formatTemperature } from '../../utils/weather-formatting'

export function Forecast() {
	const [isForecastToggle, setIsForecastToggle] = useState<boolean>(true)
	const { allWeatherData, futureTime, isLoading, setFutureTime } = useWeatherContext()
	const scrollRef = useHorizontalScroll()

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
							isClicked={isForecastToggle}
							onClick={() => setIsForecastToggle(!isForecastToggle)}
							type="toggle"
							width="10.5rem"
							mobileWidth="50%"
						>
							Next 48 hours
						</Button>
						<Button
							isClicked={!isForecastToggle}
							onClick={() => setIsForecastToggle(!isForecastToggle)}
							type="toggle"
							width="10.5rem"
							mobileWidth="50%"
						>
							Next full week
						</Button>
					</div>
					{isForecastToggle ? (
						<div className={styles.hours} ref={scrollRef}>
							{allWeatherData?.hourly.filter((_, idx) => idx !== 0).map((hour, idx) => (
								<div className={styles.hourWithLine} key={idx}>
									{idx > 0 && (
										<Line type="date" midnightSplit={createDateInfo(hour.dt).time === '0:00'} />
									)}
									<div className={classNames(styles.hour, futureTime?.dt === hour.dt && styles.hourSelected)} onClick={() => setFutureTime(futureTime?.dt === hour.dt ? null : { type: 'hour', dt: hour.dt })}>
										<div>{createDateInfo(hour.dt).time}</div>
										<img
											src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}.png`}
											alt="current weather depiction"
										/>
										<div className={styles.temp}>
											{`${formatTemperature(hour.temp)}°`}
										</div>
										<div className={classNames(styles.rain, !hour.rain && styles.rainHidden)}>
											{`${hour.rain && Math.round(hour.rain?.['1h'] * 10) / 10} mm`}
										</div>
									</div>
								</div>
							))}
						</div>
					) : (
						<div className={styles.dates}>
							{allWeatherData?.daily.map((date, idx) => (
								<div className={styles.dateWithLine} key={idx}>
									{idx > 0 && (
										<Line type="date" />
									)}
									<div className={classNames(styles.date, futureTime?.dt === date.dt && styles.hourSelected)} onClick={() => setFutureTime(futureTime?.dt === date.dt ? null : { type: 'date', dt: date.dt })}>
										<div>{createDateInfo(date.dt).dateShort}</div>
										<img
											src={`https://openweathermap.org/img/wn/${date.weather[0].icon}.png`}
											alt="current weather depiction"
										/>
										<div className={styles.temp}>
											{`${formatTemperature(date.temp.max)}° / ${formatTemperature(date.temp.min)}°`}
										</div>
										<div className={classNames(styles.rain, !date.rain && styles.rainHidden)}>
											{`${date.rain && Math.round(date.rain * 10) / 10} mm`}
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

