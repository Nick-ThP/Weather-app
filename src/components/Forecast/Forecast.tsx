import classNames from 'classnames';
import { useState } from 'react';
import { useWeatherContext } from "../../contexts/useWeatherContext";
import { createDateInfo } from '../../utils/date-formatting';
import Button from "../reuseables/Button/Button";
import styles from './forecast.module.scss';

export default function Forecast() {
	const [isForecastToggle, setIsForecastToggle] = useState<boolean>(true)
	const { weatherData } = useWeatherContext()

	function toggleForecast() {
		setIsForecastToggle(!isForecastToggle)
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.toggle}>
				<Button
					isClicked={isForecastToggle}
					clickFunc={toggleForecast}
					type='toggle'
				>
					Next 48 hours
				</Button>
				<Button
					isClicked={!isForecastToggle}
					clickFunc={toggleForecast}
					type='toggle'
				>
					Next full week
				</Button>
			</div>
			{isForecastToggle ? (
				<div className={styles.dates}>
					{weatherData?.hourly.filter((_, idx) => idx % 3 === 0).map((date, idx) => (
						<div
							className={classNames(styles.date, createDateInfo(date.dt).time.length === 4 && Number(createDateInfo(date.dt).time.substring(0, 1)) <= 2 && styles.dateAfterMidnight)} key={idx}
						>
							<div>{createDateInfo(date.dt).time}</div>
							<img
								src={`https://openweathermap.org/img/wn/${date.weather[0].icon}.png`}
								alt="current weather depiction"
							/>
							<div className={styles.temp}>{`${weatherData?.hourly[idx].temp.toString().substring(0, 2)}°`}</div>
							<div className={styles.rain}>
								{(Number(weatherData?.hourly[idx].pop?.toString().substring(0, 3)) > 0 && `${Number(weatherData?.hourly[idx].pop?.toString().substring(0, 3))} mm`) || ''}
							</div>
						</div>
					))}
				</div>
			) : (
				<div className={styles.dates}>
					{weatherData?.daily.map((date, idx) => (
						<div className={styles.date} key={idx}>
							<div>{createDateInfo(date.dt).date}</div>
							<img
								src={`https://openweathermap.org/img/wn/${date.weather[0].icon}.png`}
								alt="current weather depiction"
							/>
							<div className={styles.temp}>{`${weatherData?.daily[idx].temp.toString().substring(0, 2)}°`}</div>
						</div>
					))}
				</div>
			)}
		</div>
	)
}