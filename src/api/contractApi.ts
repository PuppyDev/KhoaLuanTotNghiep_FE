import { IContract, IResContract } from './../models/contract'
import axiosClient from './axiosClient'

const BASES_URL = '/contract'

export const contractApi = {
	createContract(params: IContract) {
		return axiosClient.post<IResContract>(`${BASES_URL}/create-contract`, params)
	},
}
