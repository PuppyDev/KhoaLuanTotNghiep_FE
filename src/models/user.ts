export interface IUserWallet {
	walletAddress: string
	amount: number
}

export interface IResUserWallet {
	paymentUrl: string
}

export interface IWalletInfo {
	walletPrivateKey: string
	walletAddress: string
	balance: number | string
}

export interface IOwnerInfo {
	avatar: string
	identity: string
	name: string
	phone: string
	username: string
	_id: string
}

export interface ITransaction {
	_id: string
	transactionId: string
	action: string
	data: null
	prevBalance: number
	actionAmount: number
	balance: number
	isReverted: boolean
	isDeleted: boolean
	createdAt: string
	updatedAt: string
	__v: number
}
