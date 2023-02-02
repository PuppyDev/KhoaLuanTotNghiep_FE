import FormInputText from '@/components/common/Input/FormInputText'
import { schema } from '@/schemas/Auth'
import { yupResolver } from '@hookform/resolvers/yup'
import { Grid } from '@mui/material'
import { useForm } from 'react-hook-form'
import { ButtonAuth, HeaderSignUp, LinkSignIn, Wrapper } from './SignUpStyle'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

type FormValues = {
	email: string
	password: string
}

const SignIn = () => {
	const {
		control,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<FormValues>({
		defaultValues: {
			email: '',
			password: '',
		},
		resolver: yupResolver(schema),
	})

	const handleSignIn = handleSubmit((data) => {
		setTimeout(() => {
			console.log('meomeo')
		}, 3000)
	})

	const { t } = useTranslation()

	return (
		<Grid
			container
			direction="column"
			alignContent="center"
			justifyContent="center"
			height="100vh"
			style={{ background: '#f8f8f8' }}
		>
			<Wrapper container direction="row" alignItems="center" justifyContent="center">
				<Grid container item direction="column" alignContent="center" justifyContent="center" xs={6} gap={7}>
					<img src="https://colorlib.com/etc/regform/colorlib-regform-7/images/signin-image.jpg" />
					<LinkSignIn to="/register">{t('AUTH.Not_Have_Account')}</LinkSignIn>
				</Grid>

				<Grid item width="100%" xs={6}>
					<form
						onSubmit={handleSignIn}
						style={{
							display: 'flex',
							flexDirection: 'column',
							width: '100%',
							gap: 10,
							padding: 60,
						}}
					>
						<HeaderSignUp variant="h2">{t('AUTH.LOGIN')}</HeaderSignUp>

						<FormInputText
							control={control}
							name="email"
							label="Email"
							error={errors.email?.message || null}
						/>

						<FormInputText
							control={control}
							name="password"
							label={t('AUTH.Password')}
							type="password"
							error={errors.password?.message || null}
						/>

						<Link
							to="/"
							style={{
								textAlign: 'right',
								fontSize: 12,
								textDecoration: 'unset',
							}}
						>
							{t('AUTH.Forgot_Your_Pass')} ?
						</Link>

						<ButtonAuth disabled={isSubmitting} type="submit" variant="contained">
							{t('AUTH.LOGIN')} {t('NOW')}
						</ButtonAuth>
					</form>
				</Grid>
			</Wrapper>
		</Grid>
	)
}

export default SignIn
