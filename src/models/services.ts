import { room } from './room'

export interface IServiceRes {
	_id: string
	oldIndicator: number
	newIndicator: number
	service: IService
	quality: number
	amount: number
	atMonth: number
	atYear: number
	type: number
	enable: boolean
	createdAt: string
	updatedAt: string
}

export interface IService {
	_id: string
	name: string
	description: string
	basePrice: number
	unit: string
}

export interface IDemainService {
	serviceId: string
	quality: number
	newIndicator: number
}

export interface IUpdateServiceParams {
	roomId: string
	demandInfo: {
		atMonth: number | string
		demands: IDemainService[]
	}
}

export interface IResContract {
	contract: {
		_id: string
		period: number
		lessor: {
			_id: string
			username: string
			email: string
			phone: string
			name: string
			avatar: string
		}
		room: room
		dateRent: string
		payTime: string
		payMode: string
		payment: number
		enable: boolean
		penaltyFeeEndRent: number
		status: string
		plusContract: string
		renter: {
			_id: string
			username: string
			email: string
			phone: string
			name: string
			avatar: string
		}
		createdAt: string
		updatedAt: string
	}
}
