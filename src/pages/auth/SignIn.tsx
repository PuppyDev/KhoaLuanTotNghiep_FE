import { authApi } from '@/api/authApi'
import { setUserInfo, setVerifiedInfo } from '@/app/authSlice'
import { useAppDispatch } from '@/app/hook'
import FormInputText from '@/components/common/Input/FormInputText'
import SEO from '@/components/seo'
import { FormValuesSignIn, ResponseSignIn, VerifyType } from '@/models/auth'
import ShowNostis from '@/utils/show-noti'
import { CircularProgress, Grid } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import { ButtonAuth, HeaderSignUp, LinkSignIn, Wrapper } from './styles'

const SignIn = () => {
	const {
		control,
		handleSubmit,
		formState: { errors, isSubmitting, isValid },
	} = useForm<FormValuesSignIn>({
		// resolver: yupResolver(schema),
	})
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const handleSignIn = async (data: FormValuesSignIn) => {
		try {
			const response = await authApi.login(data)
			console.log('🚀 ~ file: SignIn.tsx:28 ~ handleSignIn ~ response:', response)

			// @ts-ignore
			if (response?.message === 'You must update your identity!') {
				dispatch(setVerifiedInfo(response.data as VerifyType))
				return navigate('/registerAuth')
			}
			// if (response) {
			// 	dispatch(setVerifiedInfo(response?.data as VerifyType))
			// 	navigate('/authOtp')
			// }

			if (response) {
				dispatch(setUserInfo(response.data as ResponseSignIn))

				localStorage.setItem('dataUser', JSON.stringify(response?.data as ResponseSignIn))
				ShowNostis.success('Login successfully!!!')
				return navigate('/')
			}
		} catch (error: any) {
			if (error) ShowNostis.error(error?.data.message || 'something went wrong')
		}
	}

	const { t } = useTranslation()

	return (
		<>
			<SEO title="Bughoue - Sign in" />
			<Grid
				container
				direction="column"
				alignContent="center"
				justifyContent="center"
				height="100vh"
				style={{ background: '#f8f8f8' }}
			>
				<Wrapper container direction="row" alignItems="center" justifyContent="center">
					<Grid
						container
						item
						direction="column"
						alignContent="center"
						justifyContent="center"
						xs={6}
						gap={7}
					>
						<img src="https://colorlib.com/etc/regform/colorlib-regform-7/images/signin-image.jpg" />
						<LinkSignIn to="/register">{t('AUTH.Not_Have_Account')}</LinkSignIn>
					</Grid>

					<Grid item width="100%" xs={6}>
						<form
							onSubmit={handleSubmit(handleSignIn)}
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
								name="username"
								label="Username"
								error={errors.username?.message || null}
							/>

							<FormInputText
								control={control}
								name="password"
								label={t('AUTH.Password')}
								type="password"
								error={errors.password?.message || null}
							/>

							<Link
								to="/forgot-password"
								style={{
									textAlign: 'right',
									fontSize: 12,
									textDecoration: 'unset',
								}}
							>
								{t('AUTH.Forgot_Your_Pass')} ?
							</Link>

							<ButtonAuth disabled={isSubmitting || !isValid} type="submit" variant="contained">
								{isSubmitting ? <CircularProgress size={25} /> : t('AUTH.LOGIN') + ' ' + t('NOW')}
							</ButtonAuth>
						</form>
					</Grid>
				</Wrapper>
			</Grid>
		</>
	)
}

export default SignIn
