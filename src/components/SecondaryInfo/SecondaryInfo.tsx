
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
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { createDateInfo } from "../../utils/date-formatting"
import { convertMinutesToChunks } from '../../utils/minutes-to-chunks'
import { createTempOrTemps } from "../../utils/temperature-formatting"
import { createWindInfo } from "../../utils/wind-formatting"
import { Button } from '../reuseables/Button/Button'
import { Line } from "../reuseables/Line/Line"
import styles from './secondary-info.module.scss'

export function SecondaryInfo() {
	const [isMobile] = useMediaQuery('only screen and (max-width: 1000px)')
	const { allWeatherData, weatherSource, futureTime, isLoading, refresh } = useWeatherContext()

	ChartJS.register(
		CategoryScale,
		LinearScale,
		BarElement,
		Title,
		Tooltip,
		Legend
	)

	const chartBarAmount = 6

	const chartValues = useMemo(() => {
		if (allWeatherData?.minutely) {
			return convertMinutesToChunks(allWeatherData?.minutely
				.map(minute => minute.precipitation)
				.filter((_, idx) => idx < 60), chartBarAmount)
		}

		// Showcasing purposes
		return [3.5, 2.8, 3.7, 1.2, 8.5, 7.6]
	}, [allWeatherData])

	const chartLabels = useMemo(() => {
		if (allWeatherData?.minutely) {
			return allWeatherData?.minutely
				.map((time, idx) => (idx % 10 === 0) && idx < 51 && createDateInfo(time.dt).preciseTime)
				.filter(Boolean)
		}

		// Showcasing purposes
		return ['No', 'Rain', 'So', 'Just', 'Show', 'Casing']
	}, [allWeatherData])

	return (
		<div className={styles.wrapper}>
			{!(isMobile && futureTime) && (
				<>
					<div className={classNames(styles.column)}>
						{isLoading ? (
							<Skeleton count={3.5} className={styles.skeleton} />
						) : (
							<>
								{futureTime ? (
									<>
										{!isMobile && (
											<div className={styles.futureColumn}>
												<div className={styles.futureMessage}>
													<div>
														Future {futureTime?.type === 'date' ? 'date' : 'hour'}
													</div>
													<div>
														You have selected a future time interval. Click the return button below to return to the current hour interval.
													</div>
												</div>
												<Button
													type="standard"
													onClick={refresh}
												>
													Return
													<span>
														<svg
															className={styles.refreshIcon}
															width="24"
															height="24"
															onClick={refresh}
															viewBox="0 0 122.04 122.88">
															<path d="M4.73,9.3v39.28h39.28l4.63,0l-3.27-3.28L33.91,33.85c0.76-0.73,1.54-1.44,2.36-2.11 c1.08-0.88,2.22-1.72,3.38-2.48l0,0c6.02-3.92,13.21-6.21,20.94-6.21l0.01,0v-0.01c10.59,0,20.18,4.3,27.12,11.24 c6.94,6.94,11.24,16.53,11.24,27.11h-0.01v0.05h0.01c0,10.59-4.3,20.19-11.24,27.12c-6.94,6.94-16.53,11.24-27.11,11.24v-0.01 l-0.08,0v0.01c-3.7,0-7.39-0.54-10.93-1.59v0c-1.95-0.58-3.87-1.33-5.71-2.22c-9.39-4.54-16.65-12.8-19.87-22.87l-0.43-1.33 L0,71.82l0.47,2.3l0.01,0.06v0.01c0.8,3.84,2,7.62,3.53,11.24v0.01c1.51,3.55,3.38,6.98,5.53,10.19 c11.03,16.43,29.78,27.25,51.05,27.25l0.01,0v-0.01c16.96,0,32.33-6.88,43.43-17.99v-0.01c11.1-11.11,17.98-26.45,17.98-43.4 l0.01,0v-0.05h-0.01c0-16.96-6.88-32.32-18-43.43l0,0C92.93,6.89,77.58,0.02,60.63,0.01V0l-0.06,0v0.01 c-8.71,0-17.01,1.82-24.51,5.1c-1.21,0.53-2.42,1.11-3.6,1.71c-5.48,2.83-10.47,6.46-14.83,10.74L8,7.95L4.73,4.67V9.3L4.73,9.3 L4.73,9.3z" />
														</svg>
													</span>
												</Button>
											</div>
										)}
									</>
								) : (
									<div className={styles.chart}>
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
														displayColors: false,
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
														},
														callbacks: {
															label: (item) => {
																return `${item.formattedValue} mm`
															}
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
														text: allWeatherData?.minutely ? 'Rainfall (mm)' : '10 minute intervals of rain (mm)',
														color: 'rgba(0, 0, 0, 1)'

													},
												}
											}}
											data={{
												labels: chartLabels,
												datasets: [
													{
														borderRadius: 3,
														data: chartValues,
														backgroundColor: "#ec6e4c",
													},
												],
											}}
										/>
									</div>
								)}
							</>
						)}
					</div>
					<Line type="box" />
				</>
			)}
			<div className={classNames(styles.column, !isLoading && styles.columnJustification)}>
				{isLoading ? (
					<Skeleton count={3.5} className={styles.skeleton} />
				) : (
					<>
						{weatherSource?.feels_like && (
							<div className={styles.row}>
								<div className={styles.information}>
									<div>
										Feels like
									</div>
									{`${createTempOrTemps(weatherSource?.feels_like)} ${typeof weatherSource?.feels_like === 'number' ? 'C' : ''}`}
								</div>
							</div>
						)}
						{weatherSource?.wind_deg && (
							<div className={styles.row}>
								<div className={styles.information}>
									<div>
										Wind direction
									</div>
									<div>
										{createWindInfo(weatherSource?.wind_deg)}
									</div>
								</div>
							</div>
						)}
						<div className={styles.row}>
							<div className={styles.information}>
								<div>
									Wind gusts
								</div>
								<div>
									{weatherSource?.wind_gust ? `${weatherSource?.wind_gust.toString().split('.')[0]} km/h` : 'None'}
								</div>
							</div>
						</div>
						<div className={styles.row}>
							<div className={styles.information}>
								<div>
									Cloud cover
								</div>
								<div>
									{`${weatherSource?.clouds} %`}
								</div>
							</div>
						</div>
						<div className={styles.row}>
							<div className={styles.information}>
								<div>
									Humidity
								</div>
								<div>
									{`${weatherSource?.humidity} %`}
								</div>
							</div>
						</div>
						{weatherSource?.dew_point && (
							<div className={styles.row}>
								<div className={styles.information}>
									<div>
										Dew point
									</div>
									<div>
										{`${Math.round(weatherSource?.dew_point * 10) / 10}° C`}
									</div>
								</div>
							</div>
						)}
						<div className={styles.row}>
							<div className={styles.information}>
								<div>
									Pressure
								</div>
								<div>
									{`${weatherSource?.pressure} mb`}
								</div>
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	)
}