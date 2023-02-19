export interface Room {}

export interface RoomFilters {
	price: {
		min: number
		max: number
	}
	utilities: {}
	typeRoom: {
		all: boolean
		isRent: boolean
		isShareRoom: boolean
		isDormRoom: boolean
		isWholeHouse: boolean
		isApartment: boolean
	}
	sex: {
		male: boolean
		female: boolean
		all: boolean
	}
}
