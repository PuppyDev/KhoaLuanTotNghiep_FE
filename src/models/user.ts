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
