import { Box, Grid, Typography } from '@mui/material'
import { styled } from '@mui/system'
import { Link } from 'react-router-dom'

export const HomeBanner = styled('div')({
	backgroundImage: 'url("https://www.ohanaliving.vn/542ac03681516bcca0dd605bedd41a2b.jpg")',
	height: '700px',
	backgroundRepeat: 'no-repeat',
	backgroundSize: 'cover',
	backgroundPosition: 'center center',
	fontFamily: 'Nunito',

	'@media only screen and (max-width: 1441px)': {
		height: '500px',
	},
})

export const WrapperBanner = styled(Box)({
	maxWidth: '1440px',
	margin: '0 auto',
	display: 'flex',
	alignItems: 'center',
	height: '100%',
	padding: '0 32px',

	'@media only screen and (max-width: 1441px)': {
		maxWidth: '1000px',
	},
})

export const ContentBanner = styled(Box)({
	width: '50%',
	display: 'flex',
	justifyContent: 'center',
	flexDirection: 'column',
})

export const HeadingBanner = styled('p')({
	fontSize: '32px',
	color: 'white',
	fontFamily: 'Nunito',
	lineHeight: '48px',
	letterSpacing: 0,
	textShadow: '0 2px 8px rgb(0 0 0 / 24%)',
	fontWeight: 'bold',
})

export const SearchBanner = styled(Box)({
	height: '60px',
	display: 'flex',
	alignItems: 'center',
	background: 'white',

	marginTop: '40px',
	border: '1px solid white',
	borderRadius: '16px',
	padding: '0 18px',

	width: 'fit-content',
	position: 'relative',
})

export const SearchLocation = styled('div')({
	fontSize: '24px',
	display: 'flex',
	alignItems: 'center',
	gap: '20px',
	paddingRight: '20px',
	borderRight: '1px solid #B4B4B4',
})

export const SearchFeature = styled('input')({
	width: '412px',
	padding: '16px',
	border: 'none',
	outline: 'none',

	fontSize: '20px',
	color: '#8F8F8F',
})

export const SearchResult = styled('div')({
	position: 'absolute',
	width: '412px',
	background: 'white',
	top: '100%',
	right: '0',
	listStyle: 'none',
	padding: '0',
	marginTop: '10px',
	borderRadius: '16px',
	boxShadow: '0 2px 8px 0 rgb(0 0 0 / 16%)',
	overflow: 'hidden',
})

export const SearchResultItem = styled(Link)({
	padding: '12px 10px',
	display: 'block',
	textDecoration: 'none',
	color: '#000000',
	transition: 'all .4s',

	'&:not(:last-child)': {
		borderBottom: '1px solid #CDCDCD',
	},

	'&:hover': {
		background: '#eeeeee',
	},
})

export const SearchResultNoData = styled('div')({
	height: '150px',
	background: 'white',
	boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
})

export const HomePageContent = styled(Box)`
	width: 1440px;
	margin: 0 auto;
	padding: 0 32px;
	padding-bottom: 50px;
	font-family: Nunito;

	@media only screen and (max-width: 1441px) {
		width: 98%;
	}

	& .heading__homepage {
		text-align: center;
		font-size: 40px;
		font-weight: bold;
		padding: 40px 0;
	}
`

export const WrapperBackground = styled('section')`
	/* background: #f6f5f2; */

	&.min__height90 {
		min-height: '92vh';
	}
`

export const TrendingSearch = styled('section')({})

export const TrendingHeader = styled('p')({
	color: '#333333',
	fontFamily: 'Nunito',
	fontSize: '32px',
	padding: '32px 0 24px',
	fontWeight: 'bold',
	margin: 0,
})

export const TrendingList = styled('ul')({
	width: '100%',
	listStyle: 'none',
	margin: 0,
	padding: 0,
	display: 'grid',
	gridTemplateColumns: 'repeat(6, 1fr)',
	gap: '40px',

	'@media only screen and (max-width: 1441px)': {
		gap: '5px',
	},
})

export const TrendingItem = styled('li')({
	textTransform: 'capitalize',
	minHeight: '130px',
	background: 'blue',

	backgroundRepeat: 'no-repeat',
	backgroundSize: 'cover',
	borderRadius: '12px',

	fontSize: '14px',
	fontWeight: 'bold',
	boxShadow: '0 4px 12px 0 rgb(0 0 0 / 8%)',
	backgroundImage: 'url("https://www.ohanaliving.vn/4d99b9c4047ed44e88d916c96a16462f.jpg")',
	overflow: 'hidden',

	'& > a': {
		backgroundImage: 'linear-gradient(-180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 100%)',
		display: 'flex',
		alignItems: 'flex-end',
		justifyContent: 'center',
		height: '100%',

		width: '100%',
		color: 'white',
		textDecoration: 'unset',
		paddingBottom: '12px',
		transition: 'all 0.3s',

		'&:hover': {
			backgroundImage: 'linear-gradient(-180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 100%)',
		},
	},

	'&:nth-of-type(2)': {
		backgroundImage: 'url("https://www.ohanaliving.vn/942f65c3633188ad20aef85af3cc6cb9.jpg")',
	},

	'&:nth-of-type(3)': {
		backgroundImage: 'url("https://www.ohanaliving.vn/c24f2f4900e66ad42bc5819ef97687c3.jpg")',
	},

	'&:nth-of-type(4)': {
		backgroundImage: 'url("https://www.ohanaliving.vn/820479a65182bbe3c48ac1649d82aa8a.jpg")',
	},

	'&:nth-of-type(5)': {
		backgroundImage: 'url("https://www.ohanaliving.vn/56357e2482d5e085d5439d64308b8ccf.jpg")',
	},

	'&:nth-of-type(6)': {
		backgroundImage: 'url("https://www.ohanaliving.vn/954a28da0e0c77e373bdfdc41c22c1c3.jpg")',
	},
})

export const RoomSection = styled(Grid)({
	borderRadius: '20px',
	marginTop: '32px',
})

export const NewRoom = styled(Box)({
	borderRadius: '20px',
	padding: '32px 32px 24px',
	background: 'white',

	'& > .heading': {
		fontSize: '24px',
		fontWeight: 'bold',
		fontFamily: 'Nunito',
		margin: 0,
		marginBottom: '32px',
		color: '#333333',
	},
})

export const VerifiAccount = styled(Box)({
	padding: '32px 32px 24px',
	borderRadius: '20px',
	background: 'white',

	'& > .heading ': {
		fontSize: '24px',
		fontWeight: 'bold',
		color: '#333333',
		display: 'flex',
		alignItems: 'center',
		gap: '10px',
	},

	'& > .verifiContent': {
		marginTop: '45px',
	},
})

export const RoomItemHeading = styled(Typography)({
	color: 'black',
	fontSize: '20px',
	fontFamily: 'Nunito',
	fontWeight: '600',
	margin: 0,
})

export const ListRoom = styled('ul')({
	padding: 0,
	margin: 0,
	listStyle: 'none',
})
