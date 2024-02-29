export const getCraftingTime = (timeInSeconds: number): string => {
	if (timeInSeconds === 0) {
		return 'Instant';
	}

	const hours = Math.floor(timeInSeconds / 3600);
	const minutes = Math.floor((timeInSeconds % 3600) / 60);
	const seconds = timeInSeconds % 60;

	const hoursString = hours > 0 ? `${hours}h ` : '';
	const minutesString = minutes > 0 ? `${minutes}m ` : '';
	const secondsString = seconds > 0 ? `${seconds}s` : '';

	return `${hoursString}${minutesString}${secondsString}`.trim();
}
