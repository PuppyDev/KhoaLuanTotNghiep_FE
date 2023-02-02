import { styled, Box } from '@mui/system'

export const HeaderContainer = styled(Box)({
	padding: '0 40px',
	height: 78,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	background: '#FAFAFA',
})

export const NavHeader = styled(Box)({
	display: 'flex',
	alignItems: 'center',
	gap: 10,
	cursor: 'pointer',
})

export const paperProps = {
	elevation: 0,

	sx: {
		filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
		mt: 1.5,
		width: '238px',
		borderRadius: '20px',
		overflow: 'hidden',
		gap: 2,

		'& .MuiList-root': {
			padding: 0,
		},

		'& .MuiSvgIcon-root': {
			color: '#777E90',
		},

		'& .MuiButtonBase-root': {
			gap: '20px',
		},

		'& .MuiMenuItem-root': {
			padding: '15px 20px',
		},
	},
}
