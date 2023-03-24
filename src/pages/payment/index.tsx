import { commonApi } from '@/api/index'
import ShowNostis from '@/utils/show-noti'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const PaymentPageHandle = () => {
	const location = useLocation()
	const navigate = useNavigate()

	const postTopupWallet = async () => {
		try {
			if (location.search) {
				const response = await commonApi.confirmWallet(location.search)
				navigate('/mywallet')
				ShowNostis.success('Nap tien thanh cong!!!')
			}
		} catch (error) {
			ShowNostis.error('Nap tien that bai, loi giao dich')
			console.log('🚀 ~ file: index.tsx:17 ~ postTopupWal ~ error:', error)
		}
	}

	useEffect(() => {
		postTopupWallet()
	}, [])

	return <div></div>
}

export default PaymentPageHandle
