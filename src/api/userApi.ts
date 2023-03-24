import { IResUserWallet, IUserWallet, IWalletInfo } from '@/models/user'
import axiosClient from './axiosClient'

const BASES_URL = '/users'

export const userApi = {
	topupMoney(params: IUserWallet) {
		return axiosClient.post<IResUserWallet>(`${BASES_URL}/wallet-connect`, params)
	},

	getWalletInfo() {
		return axiosClient.get<IWalletInfo>(`${BASES_URL}/me/wallet`)
	},
}
