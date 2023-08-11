
import {
	BarElement,
	CategoryScale,
	Chart as ChartJS,
	Legend,
	LinearScale,
	Title,
	Tooltip,
} from 'chart.js'
import classNames from "classnames"
import { Bar } from 'react-chartjs-2'
import Skeleton from "react-loading-skeleton"
import { useWeatherContext } from "../../contexts/useWeatherContext"
import { createDateInfo } from "../../utils/date-formatting"
import { createTemperatureInfo } from "../../utils/temperature-formatting"
import { createWindInfo } from "../../utils/wind-formatting"
import { TimeInfo } from '../App/App'
import { Button } from '../reuseables/Button/Button'
import { Line } from "../reuseables/Line/Line"
import styles from './secondary-info.module.scss'

type Props = {
	futureTimeInterval: TimeInfo | null
	setFutureTimeInterval: (val: TimeInfo | null) => void
}

export function SecondayInfo(props: Props) {
	const { weatherData, isLoading } = useWeatherContext()

	ChartJS.register(
		CategoryScale,
		LinearScale,
		BarElement,
		Title,
		Tooltip,
		Legend
	)

	return (
		<div className={styles.wrapper}>
			<div className={classNames(styles.column, !isLoading && styles.columnJustification)}>
				{isLoading ? (
					<Skeleton count={3.5} className={styles.skeleton} />
				) : (
					<>
						{props.futureTimeInterval ? (
							<div className={styles.futureMessage}>
								<div>
									You have currently selected a future time interval.
									Please click below to return to the current hour interval.
								</div>
								<Button
									type="standard"
									clickFunc={() => props.setFutureTimeInterval(null)}
								>
									Return
								</Button>
							</div>
						) : (
							<div className={styles.chart}>
								{weatherData?.current.temp && (
									<Bar
										width="5rem"
										height="10rem"
										options={{
											maintainAspectRatio: false,
											responsive: true,
											animation: {
												duration: 300,
												easing: 'easeInOutSine',
											},
											scales: {
												y: {
													min: 0,
													max: 1,
												},
											},
											plugins: {
												legend: {
													display: false
												},
												title: {
													font: {
														size: 16,
														family: "'Cabin', sans-serif"
													},
													display: true,
													text: 'Rainfall this hour (mm)',

												}
											},
										}}
										data={{
											labels: weatherData?.minutely.map(time => createDateInfo(time.dt).preciseTime),
											datasets: [
												{
													data: weatherData?.minutely.map(time => time.precipitation),
													backgroundColor: "#ec6e4c",
												},
											],
										}}
									/>
								)}
							</div>
						)}
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
									Feels like
								</div>
								{weatherData?.current.feels_like && (
									<div>
										{`${createTemperatureInfo(weatherData?.current.feels_like)}° C`}
									</div>
								)}
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
									{weatherData?.current.wind_gust ? `${weatherData?.current.wind_gust.toString().split('.')[0]} km/h` : 'None'}
								</div>
							</div>
						</div>
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
								{weatherData?.current.dew_point && (
									<div>
										{`${weatherData?.current.dew_point}° C`}
									</div>
								)}
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
				)
				}
			</div >
		</div >
	)
}