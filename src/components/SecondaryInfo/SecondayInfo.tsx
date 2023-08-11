
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
import { useMemo } from 'react'
import { Bar } from 'react-chartjs-2'
import Skeleton from "react-loading-skeleton"
import { useWeatherContext } from "../../contexts/useWeatherContext"
import { createDateInfo } from "../../utils/date-formatting"
import { convertMinutesToChunks } from '../../utils/minutes-to-chunks'
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


	const precipitationArray = useMemo(() => {
		return weatherData?.minutely.map((minute, idx) => idx < 60 ? Math.random() * 0.1 : null).filter(minute => minute !== null) as number[]
	}, [weatherData])
	console.log("📡 ~ file: SecondayInfo.tsx:45 ~ precipitationArray ~ precipitationArray:", precipitationArray)

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
										options={{
											aspectRatio: 1.15,
											maintainAspectRatio: false,
											responsive: true,
											animation: {
												duration: 300,
												easing: 'easeOutSine',
											},
											scales: {
												y: {
													suggestedMin: 0,
													suggestedMax: 5,
													grid: {
														color: 'rgba(0, 0, 0, .3)',
													},
													ticks: {
														color: 'rgba(0, 0, 0, 1)',
														font: {
															family: "sans-serif",
															size: 12
														},
													}
												},
												x: {
													grid: {
														color: 'rgba(0, 0, 0, .3)',
													},
													ticks: {
														color: 'rgba(0, 0, 0, 1)',
														font: {
															family: "'Cabin', sans-serif",
															size: 12
														}
													}
												}
											},
											plugins: {
												tooltip: {
													intersect: false,
													backgroundColor: "rgba(0, 0, 0, 1)",
													titleColor: "#f3a893",
													bodyColor: "#f3a893",
													bodySpacing: 2,
													padding: 12,
													position: "nearest",
													cornerRadius: 12,
													titleFont: {
														family: "'Cabin', sans-serif",
														size: 16
													}
												},
												legend: {
													display: false
												},
												title: {
													font: {
														size: 16,
														family: "'Cabin', sans-serif"
													},
													display: true,
													text: 'Rainfall (mm)',
													color: 'rgba(0, 0, 0, 1)'

												},
											}
										}}
										data={{
											labels: weatherData?.minutely.map((time, idx) => (idx % 10 === 0) && idx < 51 && createDateInfo(time.dt).preciseTime).filter(Boolean),
											datasets: [
												{
													borderRadius: 12,
													data: convertMinutesToChunks(precipitationArray, 6),
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