export interface IInvoice {
	contractId: string
	invoiceInfo: {
		listServiceDemands: IServiceDemaind[]
	}
}

export interface IServiceDemaind {
	_id: string
	oldIndicator: number
	newIndicator: number
	service: string
	quality: number
	amount: number
	atMonth: number
	atYear: number
	type: number
	enable: boolean
	createdAt: string
	updatedAt: string
}

export interface IResInvoice {
	vat: 0.1
	payStatus: string
	amount: number
	paymentMethod: number
	enable: boolean
	_id: string
	serviceDemands: [string]
}
