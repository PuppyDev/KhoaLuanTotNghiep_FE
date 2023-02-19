export const getPathNameAfterSlah = (pathName: string) => {
	return pathName.split('/').join('')
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
