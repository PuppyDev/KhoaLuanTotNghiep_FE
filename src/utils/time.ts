export const getCurrentDate = () => {
	const date = new Date()
	const day = date.getDate()
	const month = date.getMonth() + 1
	const year = date.getFullYear()
	return {
		day,
		month,
		year,
	}
}

export function formatDate(date: Date): string {
	const options: Intl.DateTimeFormatOptions = {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
		hour12: false, // set to true if you want 12-hour format instead of 24-hour format
	}
	return date.toLocaleString('en-GB', options)
}
