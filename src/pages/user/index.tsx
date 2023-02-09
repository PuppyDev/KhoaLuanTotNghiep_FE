import HeadingTitle from '@/components/common/Heading/HeadingTitle'
import CheckCircleSharpIcon from '@mui/icons-material/CheckCircleSharp'
import DoneIcon from '@mui/icons-material/Done'
import { Avatar, Grid, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'

export const ProfilePage = () => {
	return (
		<Grid container alignItems="flex-start" justifyContent="space-between">
			<Grid
				item
				sm={4}
				md={4}
				lg={3}
				container
				alignItems="center"
				direction="column"
				sx={{
					border: '1px solid #E7ECF3',
					padding: '25px 30px ',
					borderRadius: '10px',
				}}
			>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						flexDirection: 'column',
						borderBottom: '1px solid #F5F6F7',
						gap: '25px',
						width: '100%',
						paddingBottom: '20px',
					}}
				>
					<Avatar sx={{ width: 170, height: 170 }} srcSet="https://mui.com/static/images/avatar/1.jpg" />
					<Typography sx={{ fontSize: 34 }} fontWeight="bold">
						Jonathan Due
					</Typography>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							borderRadius: '32px',
							padding: '10px 25px',
							gap: '10px',
							background: '#F4F5F6',
							color: '#777E90',
						}}
					>
						<DoneIcon fontSize="small" /> Indentity verified
					</Box>
				</Box>

				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						flexDirection: 'column',
						gap: '25px',
						width: '100%',
						padding: '25px 0',
					}}
				>
					<Box
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
							width: '100%',
						}}
					>
						<Typography variant="body2" fontSize={14} color="initial" fontWeight="bold">
							From
						</Typography>

						<Typography variant="body1" fontSize={14} color="#84878B">
							United State
						</Typography>
					</Box>

					<Box
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
							width: '100%',
						}}
					>
						<Typography variant="body2" fontSize={14} color="initial" fontWeight="bold">
							Member Since
						</Typography>
						<Typography variant="body1" fontSize={14} color="#84878B">
							05.06.1996
						</Typography>
					</Box>

					<button
						style={{
							width: '100%',
							background: '#878CFF',
							borderRadius: '20px',
							padding: '15px 0',
							color: 'white',
							border: 'none',
							outline: 'none',
							cursor: 'pointer',
							marginTop: '20px',
							fontWeight: '500',
						}}
					>
						Edit My Data
					</button>
				</Box>
			</Grid>

			<Grid
				container
				item
				sm={8}
				md={8}
				lg={9}
				style={{
					padding: '0 40px',
				}}
			>
				<HeadingTitle>My Profile</HeadingTitle>

				<Box
					style={{
						width: '100%',
						borderRadius: '20px',
						padding: '20px 30px',
						background: '#FFFFFF',
						border: '1px solid #f3f3f3',
						boxShadow: '0px 10px 24px -15px rgba(27, 27, 27, 0.12)',
						display: 'flex',
						flexDirection: 'column',
						gap: '15px',
						marginBottom: '40px',
					}}
				>
					<Typography variant="body2" color="initial" sx={{ fontSize: '22px', fontWeight: '600' }}>
						Complete your Profile
					</Typography>

					<Typography
						variant="body1"
						color="#3B3E44"
						sx={{
							fontFamily: 'Poppins',
							fontStyle: 'normal',
							fontWeight: '400',
							fontSize: '14px',
							lineHeight: '24px',
						}}
					>
						Get the best out of BugHouse by adding the remaining details!
					</Typography>

					<Box sx={{ display: 'flex', gap: '10px' }}>
						<ProfilePage.CardVerified contentDisplay="Verified Email ID" />
						<ProfilePage.CardVerified contentDisplay="Verified mobile Number" />
						<ProfilePage.CardVerified contentDisplay="Complete Basic Info" />
					</Box>
				</Box>

				<Grid container spacing={5}>
					<ProfilePage.InputFeild name="City" defaultValue="ZuiChi" />
					<ProfilePage.InputFeild name="Street address" defaultValue="ZuiChi" />
					<ProfilePage.InputFeild name="Email address" defaultValue="baodakmil123@gmail.com" />
					<ProfilePage.InputFeild name="Date Of Birth" defaultValue="07.12.1997" />
					<ProfilePage.InputFeild name="Gender" defaultValue="Male" />
					<ProfilePage.InputFeild name="ID Number" defaultValue="245422915" />
				</Grid>

				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						width: '100%',
						marginTop: '40px',
					}}
				>
					<button
						style={{
							background: '#878CFF',
							borderRadius: '20px',
							padding: '15px 40px',
							color: 'white',
							border: 'none',
							outline: 'none',
							cursor: 'pointer',
							fontWeight: '500',
						}}
					>
						Edit My Data
					</button>
				</Box>
			</Grid>
		</Grid>
	)
}

ProfilePage.CardVerified = ({ contentDisplay }: { contentDisplay: string }) => {
	return (
		<span
			style={{
				color: 'black',
				fontSize: '14px',
				background: '#E7ECF3',
				padding: '10px 25px',
				borderRadius: 30,
				display: 'flex',
				alignItems: 'center',
				gap: 10,
			}}
		>
			<CheckCircleSharpIcon sx={{ color: '#145CE6' }} /> {contentDisplay}
		</span>
	)
}

ProfilePage.InputFeild = ({
	name,
	defaultValue,
	disabled = false,
}: {
	name: string
	defaultValue: string
	disabled?: boolean
}) => {
	return (
		<Grid item md={6} xs={12} sx={{ width: '100%' }}>
			<Typography variant="body1" color="#84878B" fontWeight="bold">
				{name}
			</Typography>

			<div
				style={{
					width: '100%',
					border: '1px solid #DEDFE1',
					borderRadius: 10,
					overflow: 'hidden',
					marginTop: '10px',
				}}
			>
				<input
					type="text"
					style={{
						outline: 'none',
						fontSize: 14,
						border: 'none',
						padding: '15px 20px',
						width: '100%',
					}}
					defaultValue={defaultValue}
					disabled
				/>
			</div>
		</Grid>
	)
}
