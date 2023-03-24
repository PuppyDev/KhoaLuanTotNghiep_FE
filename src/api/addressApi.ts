import axiosClient from './axiosClient'

const BASES_URL = '/address'

export const addressApi = {
	getAllDistrics() {
		return axiosClient.get<{ listDitrict: string[] }>(`${BASES_URL}/ditricts`)
	},

	getAllWards(districtName: string) {
		return axiosClient.get<{ wards: string[] }>(`${BASES_URL}/wards/${districtName}`)
	},

	getAllStreets(districtName: string) {
		return axiosClient.get<{ streets: string[] }>(`${BASES_URL}/streets/${districtName}`)
	},
}
