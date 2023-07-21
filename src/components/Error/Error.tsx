import { useWeatherContext } from "../../contexts/useWeatherContext"
import Box from "../reuseables/Box/Box"

export default function Error() {
	const { error } = useWeatherContext()

	return (
		<Box error={true}>
			{error}
		</Box>
	)
}