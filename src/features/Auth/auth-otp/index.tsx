import React, { useState } from 'react'
import { StyledButtonOtp, StyledHeading, StyledMainOtp, StyledWrapOTP } from './styles'
import Illustration from '@/assets/images/Illustration.svg'
import { Box, Button } from '@mui/material'
import OtpInput from 'react-otp-input'
import { maskEmail } from '@/utils/index'
const AuthOtpContainer = () => {
	const [otp, setOtp] = useState('')

	const handleChange = (otpTyping: string) => {
		setOtp(otpTyping)
	}

	return (
		<StyledWrapOTP>
			<img src={Illustration} alt="" />

			<StyledHeading>
				<Box className="main-heading">OTP Verification</Box>
				<Box className="sub-heading">Code sent via mail to {maskEmail('giangvo0206@gmail.com')}</Box>
			</StyledHeading>

			<StyledMainOtp>
				<Box className="heading">OTP Number</Box>

				<Box className="content">
					<OtpInput
						value={otp}
						inputStyle={{
							border: '1px solid transparent',
							borderRadius: '8px',
							background: '#F8FAFC',
							width: '54px',
							height: '54px',
							fontSize: '12px',
							color: '#000',
							fontWeight: '400',
							caretColor: 'blue',
						}}
						focusStyle={{
							outline: 'none',
							background: '#F8FAFC',
							border: '1px solid #0E4160',
							borderRadius: '12px',
						}}
						onChange={handleChange}
						numInputs={4}
						separator={<span style={{ padding: '0px 10px' }}> - </span>}
						shouldAutoFocus
					/>
				</Box>
			</StyledMainOtp>

			<StyledButtonOtp>
				<Button className="button-continue" disabled={otp.length < 4} variant="contained">
					Continue
				</Button>

				<p className="button-resend">Resend code</p>
			</StyledButtonOtp>
		</StyledWrapOTP>
	)
}

export default AuthOtpContainer
