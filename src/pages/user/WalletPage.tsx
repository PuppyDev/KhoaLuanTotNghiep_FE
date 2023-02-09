import HeadingTitle from '@/components/common/Heading/HeadingTitle'
import { Button, Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useState } from 'react'

import AccountBalanceIcon from '@mui/icons-material/AccountBalance'

const WalletPage = () => {
	const [filterTransaction, setfilterTransaction] = useState('all')

	return (
		<>
			<HeadingTitle>Wallet BugHouse</HeadingTitle>

			<Grid container justifyContent="space-between" spacing={3}>
				<Grid item xs={4} style={{ paddingTop: 0 }}>
					<Box
						sx={{
							overflow: 'hidden',
						}}
					>
						<Box
							sx={{
								height: 130,
								alignItems: 'center',
								display: 'flex',
								justifyContent: 'center',
								flexDirection: 'column',
								background: '#3B71FE',
								color: 'white',
								borderRadius: '12px',
							}}
						>
							<Typography
								variant="h2"
								style={{ fontSize: 30, fontWeight: 'medium', fontFamily: 'monospace' }}
							>
								10.000.000 vnđ
							</Typography>
							<Typography
								variant="body1"
								color="inherit"
								style={{ fontSize: 18, fontFamily: 'monospace' }}
							>
								Số dư ví
							</Typography>
						</Box>
						<Button>Nạp tiền vào ví</Button>
						<Button>Rút Tiền</Button>
					</Box>
				</Grid>

				<Grid item xs={8} style={{ paddingTop: 0 }}>
					<Box
						sx={{
							background: '#fff',
							boxShadow: '0px 32px 60px #d3d3d31F',
							height: '600px',
							borderRadius: '20px',
							overflow: 'hidden',
						}}
					>
						<Box style={{ height: '30%', paddingBottom: '40px', borderBottom: '1px solid #E7ECF3' }}>
							<Typography
								variant="h4"
								color="initial"
								style={{
									fontFamily: 'monospace',
									fontWeight: 'bold',
									fontSize: '34px',
									padding: '40px 30px 0 ',
								}}
							>
								Wallet Transactions
							</Typography>

							<Box
								sx={{
									marginTop: '30px',
									display: 'flex',
									gap: '10px',
									padding: '0 30px',
								}}
							>
								<Button
									variant={filterTransaction === 'all' ? 'contained' : 'outlined'}
									onClick={() => setfilterTransaction('all')}
								>
									ALL
								</Button>
								<Button
									variant={filterTransaction === 'napTien' ? 'contained' : 'outlined'}
									onClick={() => setfilterTransaction('napTien')}
								>
									Nạp Tiền
								</Button>
								<Button
									variant={filterTransaction === 'rutTien' ? 'contained' : 'outlined'}
									onClick={() => setfilterTransaction('rutTien')}
								>
									Rút Tiền
								</Button>
							</Box>
						</Box>

						<Box
							sx={{
								height: '70%',
								overflow: 'auto',
								padding: '20px 30px 0',
								display: 'flex',
								flexDirection: 'column',
								gap: '25px',
							}}
						>
							<WalletPage.ItemTransaction />
							<WalletPage.ItemTransaction />
							<WalletPage.ItemTransaction />
						</Box>
					</Box>
				</Grid>
			</Grid>
		</>
	)
}

WalletPage.ItemTransaction = () => {
	return (
		<Grid container alignItems="center" spacing={2}>
			<Grid item xs={1.5} alignItems="center" container justifyContent="center">
				<Box
					sx={{
						width: '50px',
						height: '50px',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						borderRadius: '50%',
						background: '#3B71FE1F',
						color: '#145CE6',
					}}
				>
					<AccountBalanceIcon />
				</Box>
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
