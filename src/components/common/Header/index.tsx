import BugHouseLogo from '@/assets/images/LogoBugHouse1.png'
import useAuth from '@/hooks/useAuth'
import {
	AccountCircleOutlined,
	CreditCard,
	ExpandMore,
	LockOpenOutlined,
	Logout,
	PersonOutlineOutlined,
	LanguageOutlined,
} from '@mui/icons-material'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined'
import {
	Avatar,
	Badge,
	Box,
	Button,
	Drawer,
	FormControl,
	Menu,
	MenuItem,
	Modal,
	TextField,
	Typography,
} from '@mui/material'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import {
	HeaderContainer,
	NavHeader,
	paperProps,
	StyledContentDrawer,
	StyledNotificationItem,
	StyledWrapHeader,
	StyledWrapModal,
} from './HeaderStyle'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import DoneIcon from '@mui/icons-material/Done'
import { ResetPassSchema } from '@/schemas/Auth'
import ShowNostis from '@/utils/show-noti'
import { formatDate } from '@/utils/time'
import { yupResolver } from '@hookform/resolvers/yup'
import { useTranslation } from 'react-i18next'
const Header = () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
	const navigate = useNavigate()
	const open = Boolean(anchorEl)

	const { user } = useAuth()
	const [openDrawer, setOpenDrawer] = useState(false)

	const handleClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget)

	const handleClose = (to?: string, callBack?: any) => {
		if (to) navigate(to)
		if (callBack) callBack()
		setAnchorEl(null)
	}
	const { t, i18n } = useTranslation()
	const [isOpen, setIsOpen] = useState(false)

	const handleChangeLang = () => {
		const lang = i18n.language === 'en' ? 'vi' : 'en'
		i18n.changeLanguage(lang)
		localStorage.setItem('lang', lang)
	}

	return (
		<>
			<HeaderContainer>
				<Link to={'/'}>
					<img style={{ width: 80 }} src={BugHouseLogo} />
				</Link>
				<StyledWrapHeader>
					<Badge badgeContent={4} color="secondary">
						<NotificationsNoneIcon className="icon_notification" onClick={() => setOpenDrawer(true)} />
					</Badge>
					<NavHeader onClick={(e) => !user && handleClick(e)}>
						{user ? (
							<Avatar className="avatar" onClick={() => navigate('/login')} />
						) : (
							<>
								<Avatar
									className="avatar"
									srcSet="https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-6/326706851_905071507593208_1684832252594277761_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=FVDo1ljBqpAAX9L_Ibl&_nc_ht=scontent.fsgn2-7.fna&oh=00_AfDit6WnL3XB4EBzCoNr-HFO14fEDcUsOJJE9QxxE0D0rQ&oe=6419E0FF"
								/>
								<span className="name_heading">Yone Doan</span>
								<ExpandMore />
							</>
						)}
					</NavHeader>
				</StyledWrapHeader>
			</HeaderContainer>

			<Drawer anchor="left" open={openDrawer} onClose={() => setOpenDrawer(false)}>
				<StyledContentDrawer>
					<p className="Heading">{t('Header.Notifications')}</p>
					<StyledNotificationItem className="error">
						<InfoOutlinedIcon fontSize="large" color="error" />
						<Box>
							<p className="headingNotification">Thanh toán hợp đồng không thành công</p>
							<p style={{ margin: '10px 0' }}>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam corrupti
							</p>
							<p>
								<span style={{ fontWeight: 'bold' }}> Thời gian </span> : {formatDate(new Date())}
							</p>
						</Box>
					</StyledNotificationItem>

					<StyledNotificationItem className="warning">
						<WarningAmberIcon fontSize="large" color="warning" />
						<Box>
							<p className="headingNotification">Thanh toán hợp đồng thành công</p>
							<p style={{ margin: '10px 0' }}>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam corrupti
							</p>
							<p>
								<span style={{ fontWeight: 'bold' }}> Thời gian </span> : {formatDate(new Date())}
							</p>
						</Box>
					</StyledNotificationItem>

					<StyledNotificationItem className="success">
						<DoneIcon fontSize="large" color="success" />
						<Box>
							<p className="headingNotification">Thanh toán hợp đồng thành công</p>
							<p style={{ margin: '10px 0' }}>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam corrupti
							</p>
							<p>
								<span style={{ fontWeight: 'bold' }}> Thời gian </span> : {formatDate(new Date())}
							</p>
						</Box>
					</StyledNotificationItem>
				</StyledContentDrawer>
			</Drawer>

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
				<MenuItem onClick={() => handleClose('/profile/1')}>
					<AccountCircleOutlined /> <Typography variant="body1"> {t('Header.My_account')} </Typography>
				</MenuItem>
				<MenuItem onClick={() => handleClose('/room/myRooms')}>
					<PersonOutlineOutlined /> {t('Header.Room_for_rent')}
				</MenuItem>
				<MenuItem onClick={() => handleClose('/room/rented')}>
					<CreditCard /> {t('Header.Room_rented')}
				</MenuItem>
				<MenuItem onClick={() => handleClose('/mywallet')}>
					<CreditCard /> {t('Header.Wallet')}
				</MenuItem>
				<MenuItem onClick={() => handleClose('/room/addroom')}>
					<PostAddOutlinedIcon /> {t('Header.Post')}
				</MenuItem>
				<MenuItem
					onClick={() => {
						setIsOpen(true)
						handleClose()
					}}
				>
					<LockOpenOutlined /> <p> {t('Header.Change_password')}</p>
				</MenuItem>
				<MenuItem onClick={handleChangeLang}>
					<LanguageOutlined /> <p> {t('Header.Change_lang')}</p>
				</MenuItem>
				<MenuItem onClick={() => handleClose()}>
					<Logout /> {t('Header.Logout')}
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
	const { t } = useTranslation()
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
				<StyledWrapModal>
					<p className="heading_changepassword">{t('Header.Change_password')}</p>
					<form className="form" onSubmit={handleSubmit(handleChangePass)}>
						<FormControl fullWidth margin="dense">
							<TextField
								label={
									errors.currentPass
										? (errors.currentPass?.message as string)
										: t('Header.Current_pass')
								}
								variant="standard"
								type="password"
								{...register('currentPass')}
								error={Boolean(errors.currentPass)}
							/>
						</FormControl>
						<FormControl fullWidth margin="dense" error={Boolean(errors.newPass)}>
							<TextField
								label={errors.newPass ? (errors.newPass?.message as string) : t('Header.New_pass')}
								variant="standard"
								type="password"
								{...register('newPass')}
								error={Boolean(errors.newPass)}
							/>
						</FormControl>
						<FormControl fullWidth margin="dense" error={Boolean(errors.confirmPass)}>
							<TextField
								label={
									errors.confirmPass
										? (errors.confirmPass?.message as string)
										: t('Header.Confirm_pass')
								}
								variant="standard"
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
								{t('Header.Change')}
							</Button>
						</div>
					</form>
				</StyledWrapModal>
			</Modal>
		</>
	)
}

export default Header
