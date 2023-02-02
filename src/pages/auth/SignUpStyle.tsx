import LoadingButton from '@mui/lab/LoadingButton'
import { Grid, TextField, Typography } from '@mui/material'
import { styled } from '@mui/system'
import { Link } from 'react-router-dom'

export const Wrapper = styled(Grid)({
	maxWidth: '900px',
	height: '600px',
	width: '100%',
	boxShadow: '0 15px 16.83px 0.17px rgb(0 0 0 / 5%)',

	borderRadius: '20px',
	background: '#fff',
})

export const LinkSignIn = styled(Link)({
	fontSize: 14,
	color: '#222',
	display: 'block',
	textAlign: 'center',
})

export const HeaderSignUp = styled(Typography)({
	lineHeight: '1.66',
	margin: 0,
	padding: 0,
	fontWeight: 700,
	color: '#222',
	fontFamily: 'Poppins, san-serif',
	fontSize: 36,
})

export const Input = styled(TextField)({
	width: '100%',
})

export const ButtonAuth = styled(LoadingButton)({
	display: 'inline',
	textTransform: 'none',
})

export const FormControl = styled('form')(() => ({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	width: '100%',
	gap: 10,
	padding: 80,
}))
