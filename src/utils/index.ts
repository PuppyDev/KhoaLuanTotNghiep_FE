export const getPathNameAfterSlah = (pathName: string) => {
	const arrayPath = pathName.split('/')

	return arrayPath[arrayPath.length - 1]
}

export const randomId = () => {
	var S4 = function () {
		return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
	}
	return S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4()
}

export const itemData = [
	{
		img: 'https://bayleaf.s3.amazonaws.com/property-images%2F1673341812709_IMG_5285.JPG',
		title: 'Breakfast',
		rows: 2,
		cols: 2,
	},
	{
		img: 'https://bayleaf.s3.amazonaws.com/property-images%2F1673341812709_IMG_5286.JPG',
		title: 'Burger',
		rows: 2,
		cols: 2,
	},
	{
		img: 'https://bayleaf.s3.amazonaws.com/property-images%2F1673341812707_IMG_5284.JPG',
		title: 'Camera',
		rows: 2,
		cols: 2,
	},
	{
		img: 'https://bayleaf.s3.amazonaws.com/property-images%2F1673341812709_IMG_5287.JPG',
		title: 'Coffee',
		cols: 2,
		rows: 2,
	},
]

export const ArrayFrom = (to: number) => {
	return Array.from(Array(to).keys())
}

export function maskEmail(email: string): string {
	const [username, domain] = email.split('@')
	const maskedUsername = `${username.charAt(0)}${'*'.repeat(username.length - 2)}${username.slice(-1)}`
	const maskedDomain = `${domain.charAt(0)}${'*'.repeat(domain.length - 2)}${domain.slice(-1)}`
	return `${maskedUsername}@${maskedDomain}`
}
