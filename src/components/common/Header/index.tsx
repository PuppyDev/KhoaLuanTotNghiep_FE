import BugHouseLogo from '@/assets/images/LogoBugHouse1.png'
import useAuth from '@/hooks/useAuth'
import {
	AccountCircleOutlined,
	CreditCard,
	ExpandMore,
	LockOpenOutlined,
	Logout,
	PersonOutlineOutlined,
} from '@mui/icons-material'
import {
	Avatar,
	Button,
	FormControl,
	FormHelperText,
	Input,
	InputLabel,
	Menu,
	MenuItem,
	Typography,
	Modal,
	Box,
	TextField,
} from '@mui/material'
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined'
import { MouseEventHandler, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { HeaderContainer, NavHeader, paperProps } from './HeaderStyle'

import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { ResetPassSchema } from '@/schemas/Auth'
import ShowNostis from '@/utils/show-noti'

const Header = () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
	const navigate = useNavigate()
	const open = Boolean(anchorEl)

	const { user } = useAuth()

	const handleClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget)

	const handleClose = (to?: string, callBack?: any) => {
		if (to) navigate(to)
		if (callBack) callBack()
		setAnchorEl(null)
	}

	const [isOpen, setIsOpen] = useState(false)

	return (
		<>
			<HeaderContainer>
				<Link to={'/'}>
					<img style={{ width: 80 }} src={BugHouseLogo} />
				</Link>

				<NavHeader onClick={(e) => !user && handleClick(e)}>
					{user ? (
						<Avatar sx={{ width: 32, height: 32 }} onClick={() => navigate('/login')} />
					) : (
						<>
							<Avatar
								sx={{ width: 32, height: 32 }}
								srcSet="https://mui.com/static/images/avatar/1.jpg"
							/>

							<Typography variant="body1" sx={{ fontWeight: '600', fontSize: 14, marginRight: 2 }}>
								Delowar
							</Typography>

							<ExpandMore />
						</>
					)}
				</NavHeader>
			</HeaderContainer>

			<Menu
				anchorEl={anchorEl}
				id="account-menu"
				open={open}
				onClose={() => handleClose()}
				onClick={() => handleClose()}
				PaperProps={paperProps}
				transformOrigin={{ horizontal: 'right', vertical: 'top' }}
				anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
			>
				<MenuItem onClick={() => handleClose('profile/1')}>
					<AccountCircleOutlined /> <Typography variant="body1"> Tài khoản của tôi </Typography>
				</MenuItem>
				<MenuItem onClick={() => handleClose()}>
					<PersonOutlineOutlined /> Manage account
				</MenuItem>
				<MenuItem onClick={() => handleClose('room/booking')}>
					<CreditCard /> Phòng đã thuê
				</MenuItem>
				<MenuItem onClick={() => handleClose('/mywallet')}>
					<CreditCard /> Ví BugHouse
				</MenuItem>
				<MenuItem onClick={() => handleClose('/room/addroom')}>
					<PostAddOutlinedIcon /> Đăng tin
				</MenuItem>
				<MenuItem
					onClick={() => {
						setIsOpen(true)
						handleClose()
					}}
				>
					<LockOpenOutlined /> <p> Đổi mật khẩu</p>
				</MenuItem>
				<MenuItem onClick={() => handleClose()}>
					<Logout /> Đăng xuất
				</MenuItem>
			</Menu>

			<Header.ChangePasswordForm isOpen={isOpen} handleClose={() => setIsOpen(false)} />
		</>
	)
}

Header.ChangePasswordForm = ({ isOpen, handleClose }: { isOpen: boolean; handleClose: () => void }) => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm({
		resolver: yupResolver(ResetPassSchema),
	})
	const handleChangePass = async (data: any) => {
		try {
			handleClose()
			ShowNostis.success('Oke đổi được pass gòi á nha ^^')
		} catch (error) {
			ShowNostis.error('Lỗi gòi bạn ơi :))) ')
		}
	}

	return (
		<>
			<Modal open={isOpen} onClose={handleClose}>
				<Box
					sx={{
						borderRadius: '8px',
						position: 'absolute',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
						width: 450,
						boxShadow: 24,
						background: 'white',
						padding: '40px 25px 10px 25px',
					}}
				>
					<p
						style={{
							textAlign: 'center',
							fontSize: '30px',
							fontWeight: '600',
							marginBottom: '10px',
						}}
					>
						Đổi mật khẩu
					</p>
					<form className="form" onSubmit={handleSubmit(handleChangePass)}>
						<FormControl fullWidth margin="dense">
							<TextField
								label={
									errors.currentPass ? (errors.currentPass?.message as string) : 'Mật khẩu hiện tại '
								}
								variant="standard"
								id="password-current"
								type="password"
								{...register('currentPass')}
								error={Boolean(errors.currentPass)}
							/>
						</FormControl>
						<FormControl fullWidth margin="dense" error={Boolean(errors.newPass)}>
							<TextField
								label={errors.newPass ? (errors.newPass?.message as string) : 'Mật Khẩu mới'}
								variant="standard"
								id="password-new"
								type="password"
								{...register('newPass')}
								error={Boolean(errors.newPass)}
							/>
						</FormControl>
						<FormControl fullWidth margin="dense" error={Boolean(errors.confirmPass)}>
							<TextField
								label={
									errors.confirmPass ? (errors.confirmPass?.message as string) : 'Xác nhận mật khẩu'
								}
								variant="standard"
								id="password-confirm"
								type="password"
								{...register('confirmPass')}
								error={Boolean(errors.confirmPass)}
							/>
						</FormControl>
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							<Button
								type="submit"
								variant="contained"
								color="primary"
								disabled={Boolean(isSubmitting)}
								style={{ margin: '16px auto', textTransform: 'none' }}
							>
								Thay Đổi
							</Button>
						</div>
					</form>
				</Box>
			</Modal>
		</>
	)
}

export default Header
