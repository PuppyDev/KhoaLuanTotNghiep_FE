import { Grid, Typography, Button, Box } from '@mui/material'
import { styled } from '@mui/system'

export const RoomDetailContent = styled(Grid)({
	marginTop: '10px',
	color: '#666666',
	fontSize: '12px',
	display: 'flex',
})

export const HeadingCardDetail = styled(Typography)({
	fontSize: '24px',
	color: '#333333',
	fontWeight: 'bold',
	display: 'inline-flex',
	alignItems: 'center',
	gap: '15px',
	background: '#f6f7f9',
	padding: '10px 15px',
	borderRadius: '24px',
})

export const DetailRoom = styled(Grid)({
	marginTop: '10px',

	'@media only screen and (max-width: 900px )': {
		flexDirection: 'column-reverse',
	},
})

export const RoomUtiliti = styled(Grid)({
	display: 'flex',
	alignItems: 'center',
	gap: '10px',

	'& > svg': {
		fontSize: '32px',
		color: 'rgb(102, 102, 102)',
	},
})

export const RoomDetailGallary = styled(Box)({
	height: '500px',
	borderRadius: '20px',
	overflow: 'hidden',
	boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px;',

	'& > .cc_swiper_wrapper': {
		userSelect: 'none',
		height: '100%',
	},

	img: {
		width: '100%',
		height: '100%',
		objectFit: 'cover',
	},
})

export const HeadingRoomBlock = styled(Box)({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	marginTop: '32px',

	'& > .headingRoom': {
		margin: 0,
		padding: 0,
		fontSize: '32px',
		color: '#333333',
		fontWeight: '600',
	},
})

export const ButtonRent = styled(Button)({
	background: '#F73486',
	padding: '10px 0',
	display: 'block',
	minWidth: '150px',
	borderRadius: '28px',

	color: 'white',
	textTransform: 'none',
	fontSize: '16px',
	transition: 'all .4s',

	'&:hover': {
		opacity: '0.6',
		background: '#F73486',
	},

	'&.disabled': {
		opacity: '0.6',
		background: '#fd7cb2',
		cursor: 'not-allowed',
	},
})

export const ModalContract = styled(Box)({
	//@ts-ignore
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	position: 'absolute',
	width: '75%',
	background: 'white',
	boxShadow: 24,
	borderRadius: '10px',
	padding: '20px',
	overflowY: 'scroll',
	height: '90vh',

	'&::-webkit-scrollbar-track': {
		backgroundColor: '#f5f5f5',
	},

	'&::-webkit-scrollbar': {
		width: '5px',
		backgroundColor: '#f6f5f2',
	},

	'&::-webkit-scrollbar-thumb': {
		backgroundColor: '#ccc',
		borderRadius: '6px',
	},
})
