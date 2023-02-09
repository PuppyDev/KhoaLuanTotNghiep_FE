import FormInputText from '@/components/common/Input/FormInputText'
import { signUp } from '@/schemas/Auth'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Grid, TextField, Typography } from '@mui/material'
import { ReactNode, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { ButtonAuth, HeaderSignUp, LinkSignIn, Wrapper } from './SignUpStyle'
import { Box } from '@mui/system'

type FormValues = {
	name: string
	email: string
	phone: string
	password: string
	confirmPass: string
}

const SignUp = () => {
	const {
		control,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<FormValues>({
		defaultValues: {
			name: '',
			email: '',
			phone: '',
			password: '',
			confirmPass: '',
		},
		resolver: yupResolver(signUp),
	})

	const [otp, setOtp] = useState<boolean>(false)

	const handleSignUp = handleSubmit((data) => {
		if (otp) console.log('🚀 ~ file: SignUp.tsx:38 ~ handleSignUp ~ data', data)
		if (!otp) setOtp(true)
	})

	const { t } = useTranslation()

	const handleReSendOTP = () => {
		console.log('vo')
	}

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
				<Grid
					item
					container
					direction="column"
					alignContent="center"
					justifyContent="center"
					width="100%"
					xs={6}
					style={{ padding: '0 60px' }}
				>
					{!otp && (
						<form
							onSubmit={handleSignUp}
							style={{ gap: 7, display: 'flex', flexDirection: 'column', width: '100%' }}
						>
							<HeaderSignUp variant="h2">{t('AUTH.REGISTER')}</HeaderSignUp>
							<FormInputText
								control={control}
								name="name"
								label={t('AUTH.Full_Name')}
								error={errors.name?.message}
							/>
							<FormInputText control={control} name="email" label="Email" error={errors.email?.message} />
							<FormInputText
								control={control}
								name="phone"
								label={t('AUTH.Phone')}
								error={errors.phone?.message}
							/>
							<FormInputText
								control={control}
								type="password"
								name="password"
								label={t('AUTH.Password')}
								error={errors.password?.message}
							/>
							<FormInputText
								control={control}
								type="password"
								name="confirmPass"
								label={t('AUTH.Confirm_Pass')}
								error={errors.confirmPass?.message}
							/>
							<ButtonAuth style={{ marginTop: 20 }} type="submit" variant="contained">
								{t('AUTH.REGISTER')}
							</ButtonAuth>
						</form>
					)}

					{otp && (
						<form
							onSubmit={handleSignUp}
							style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', gap: '20px' }}
						>
							<Typography variant="body1" color="initial" textAlign="center">
								Chúng tôi đã gửi về số điện thoại <span style={{ fontWeight: 'bold' }}>0911336236</span>{' '}
								một mã OTP. Vui lòng nhập mã OTP để hoàn tất việc đăng ký
							</Typography>

							<TextField label="Mã OTP" />

							<Box>
								<Button type="submit" variant="contained">
									Xác thực OTP
								</Button>
								<Button variant="contained" onClick={handleReSendOTP}>
									Gửi lại OTP
								</Button>
								<Button variant="contained" onClick={() => setOtp(false)}>
									Quay lại
								</Button>
							</Box>
						</form>
					)}
				</Grid>
				<Grid container item direction="column" alignContent="center" justifyContent="center" xs={6} gap={7}>
					<img src="https://colorlib.com/etc/regform/colorlib-regform-7/images/signup-image.jpg" />
					<LinkSignIn to="/login">{t('AUTH.Have_Account')}</LinkSignIn>
				</Grid>
			</Wrapper>
		</Grid>
	)
}

SignUp.GridCommon = ({ children, ...props }: { props: any; children: ReactNode }) => {
	return (
		<Grid container direction="column" alignContent="center" justifyContent="center" width="100%" {...props}>
			{children}
		</Grid>
	)
}

export default SignUp
