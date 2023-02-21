import { Box, Typography } from '@mui/material'
import { styled } from '@mui/system'
import { Link } from 'react-router-dom'

export const CardRoomItem = styled(Link)({
	padding: '13px 0',
	borderBottom: '1px solid #CDCDCD',
	display: 'flex',
	gap: '16px',
	textDecoration: 'none',
	color: 'black',

	'& > .roomItemImage': {
		width: '216px',
		height: '152px',
		borderRadius: '8px',
		objectFit: 'cover',
		overflow: 'hidden',

		'& > img': {
			width: '100%',
			height: '100%',
		},
	},

	'& > .roomItemContent': {
		display: 'flex',
		flexDirection: 'column',
		flex: '1 1 0',
		alignItems: 'flex-start',
		height: '100%',
		gap: '20px',

		'@media only screen and (max-width: 765px)': {
			gap: '5px',
		},
	},

	'@media only screen and (max-width: 765px)': {
		flexDirection: 'column',

		'& > .roomItemImage': {
			width: '100%',
			height: '250px',
		},
	},
})

export const RoomItemHeading = styled(Typography)({
	color: 'black',
	fontSize: '20px',
	fontFamily: 'Nunito',
	fontWeight: '600',
	margin: 0,
})

export const RoomPreviews = styled(Box)({
	gap: '16px',
	display: 'flex',
	flexDirection: 'column',
	color: '#666666',
	fontSize: '16px',
	fontWeight: '100',

	'@media only screen and (max-width: 900px)': {
		gap: '10px',
	},
})

export const RoomPreviewItem = styled(Box)({
	display: 'flex',
	alignItems: 'center',
	gap: '15px',
	fontWeight: '600',
	fontFamily: 'Nunito',
})

export const RoomPrice = styled(Box)({
	display: 'flex',
	alignItems: 'center',
	color: '#F73486',
	textAlign: 'center',
	flexDirection: 'column',
	justifyContent: 'center',

	'& > span': {
		fontSize: '48px',
		lineHeight: '68px',
		fontWeight: 'bold',
	},
})

// export const Modal
