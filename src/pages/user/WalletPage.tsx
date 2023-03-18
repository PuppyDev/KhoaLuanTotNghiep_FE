import HeadingTitle from '@/components/common/Heading/HeadingTitle'
import { Button, Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useState } from 'react'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'

//@ts-ignore
import Swal from 'sweetalert2/dist/sweetalert2.js'
import {
	IconItemTransaction,
	ListItemTransaction,
	StyledButtonFilterWallet,
	StyledButtonWallet,
	StyledWalletCard,
	StyledWrapButtonGroupWallet,
	StyledWrapRightWallet,
} from './style'
import { useTranslation } from 'react-i18next'

const WalletPage = () => {
	const [filterTransaction, setfilterTransaction] = useState('all')

	const { t } = useTranslation()

	const handleTopUp = () => {
		Swal.fire({
			title: 'Số tiền muốn nạp vào ví',
			input: 'text',
			inputAttributes: {
				autocapitalize: 'off',
			},
			showCancelButton: true,
			confirmButtonText: 'Nạp',
			cancelButtonText: 'Huỷ',
			showLoaderOnConfirm: true,
			preConfirm: (values: string | number) => {
				console.log('🚀 ~ file: WalletPage.tsx:38 ~ handleTopUp ~ values:', values)
			},
			allowOutsideClick: () => !Swal.isLoading(),
		}).then((result: any) => {
			console.log('🚀 ~ file: WalletPage.tsx:30 ~ handleTopUp ~ result:', result)
		})
	}

	return (
		<>
			<HeadingTitle>{t('Wallet.Heading')}</HeadingTitle>

			<Grid container justifyContent="space-between" spacing={3}>
				<Grid item xs={4} style={{ paddingTop: 0 }}>
					<Box
						sx={{
							overflow: 'hidden',
						}}
					>
						<StyledWalletCard>
							<p className="textBlance">10.000.000 vnđ</p>
							<Typography
								variant="body1"
								color="inherit"
								style={{ fontSize: 18, fontFamily: 'monospace' }}
							>
								{t('Wallet.Balance')}
							</Typography>
						</StyledWalletCard>
						<StyledButtonWallet onClick={handleTopUp}>{t('Wallet.Top_up')}</StyledButtonWallet>
						<StyledButtonWallet>{t('Wallet.WithDraw')}</StyledButtonWallet>
					</Box>
				</Grid>

				<Grid item xs={8} style={{ paddingTop: 0, paddingBottom: 40 }}>
					<StyledWrapRightWallet>
						<Box style={{ height: '30%', paddingBottom: '40px', borderBottom: '1px solid #E7ECF3' }}>
							<p className="headingWallet">{t('Wallet.Transactions')}</p>

							<StyledWrapButtonGroupWallet>
								<StyledButtonFilterWallet
									className={`${filterTransaction === 'all' && 'active'}`}
									onClick={() => setfilterTransaction('all')}
								>
									{t('Wallet.All')}
								</StyledButtonFilterWallet>
								<StyledButtonFilterWallet
									className={`${filterTransaction === 'napTien' && 'active'}`}
									onClick={() => setfilterTransaction('napTien')}
								>
									{t('Wallet.Top_up')}
								</StyledButtonFilterWallet>
								<StyledButtonFilterWallet
									className={`${filterTransaction === 'rutTien' && 'active'}`}
									onClick={() => setfilterTransaction('rutTien')}
								>
									{t('Wallet.WithDraw')}
								</StyledButtonFilterWallet>
							</StyledWrapButtonGroupWallet>
						</Box>

						<ListItemTransaction>
							<WalletPage.ItemTransaction />
							<WalletPage.ItemTransaction />
							<WalletPage.ItemTransaction />
						</ListItemTransaction>
					</StyledWrapRightWallet>
				</Grid>
			</Grid>
		</>
	)
}

WalletPage.ItemTransaction = () => {
	return (
		<Grid container alignItems="center" spacing={2}>
			<Grid item xs={1.5} alignItems="center" container justifyContent="center">
				<IconItemTransaction>
					<AccountBalanceIcon />
				</IconItemTransaction>
			</Grid>

			<Grid item xs>
				<Typography style={{ fontSize: '18px' }} color="initial">
					Booking
				</Typography>

				<Typography style={{ fontSize: '18px' }} color="#84878B">
					Booking ID <span style={{ color: 'black' }}>NR710746375497578453</span>
				</Typography>

				<Typography style={{ fontSize: '14px' }} color="#84878B">
					My Cash Debited
				</Typography>
			</Grid>

			<Grid item xs={2}>
				<Typography style={{ fontSize: '18px' }} color="#222529" fontWeight="Bold">
					$ 526
				</Typography>
			</Grid>
		</Grid>
	)
}

export default WalletPage
