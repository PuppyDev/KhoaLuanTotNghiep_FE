export interface IContract {
	period: number
	room: string
	dateRent: string
	payTime: string
	payment: number
	payMode: string
	renterInfo: string
}

export interface IResContract {
	period: string
	renter: string
	room: string
	dateRent: string
	payTime: string
	payMode: string
	payment: number
	enable: boolean
	_id: string
	lessor: string
	createdAt: string
	updatedAt: string
}
