import { userApi } from '@/api/userApi'
import { setUserInfo } from '@/app/authSlice'
import { useAppDispatch, useAppSelector } from '@/app/hook'
import BugHouseLogo from '@/assets/images/LogoBugHouse1.png'
import { CommonPagination } from '@/models/common'
import { INotification } from '@/models/notification'
import { ResetPassSchema } from '@/schemas/Auth'
import ShowNostis from '@/utils/show-noti'
import { formatDate } from '@/utils/time'
import { yupResolver } from '@hookform/resolvers/yup'
import {
	AccountCircleOutlined,
	AddHomeOutlined,
	BedroomParentOutlined,
	CancelOutlined,
	ExpandMore,
	GiteOutlined,
	LanguageOutlined,
	LockOpenOutlined,
	Logout,
	NotificationsActiveOutlined,
	PaymentsOutlined,
	ReceiptLongOutlined,
} from '@mui/icons-material'
import CheckIcon from '@mui/icons-material/Check'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import {
	Avatar,
	Badge,
	Box,
	Button,
	CircularProgress,
	Drawer,
	FormControl,
	Menu,
	MenuItem,
	Modal,
	TextField,
	Typography,
} from '@mui/material'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import {
	HeaderContainer,
	NavHeader,
	paperProps,
	StyledContentDrawer,
	StyledMiddleContent,
	StyledNotificationItem,
	StyledWrapHeader,
	StyledWrapModal,
} from './HeaderStyle'

const Header = () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
	const navigate = useNavigate()
	const open = Boolean(anchorEl)
	const { user } = useAppSelector((state) => state.authSlice.userInfo)
	const [openDrawer, setOpenDrawer] = useState(false)

	const { data: notificationList, isLoading } = useQuery({
		queryKey: ['getAllNotifications'],
		queryFn: userApi.getAllNotifications,
		keepPreviousData: true,
		refetchOnWindowFocus: false,
	})

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

	const notificationUnCheck = notificationList?.data.items.filter((notification) => !notification.isChecked).length

	const dispatch = useAppDispatch()

	return (
		<>
			<HeaderContainer>
				<Link to={'/'}>
					<img style={{ width: 80 }} src={BugHouseLogo} />
				</Link>
				<StyledWrapHeader>
					<Badge color="secondary" badgeContent={notificationUnCheck || 0}>
						<NotificationsNoneIcon className="icon_notification" onClick={() => setOpenDrawer(true)} />
					</Badge>
					<NavHeader onClick={(e) => user && handleClick(e)}>
						{!user ? (
							<Avatar className="avatar" onClick={() => navigate('/login')} />
						) : (
							<>
								<Avatar className="avatar" srcSet="https://api.multiavatar.com/123.png" />
								<span className="name_heading">{user.username}</span>
								<ExpandMore />
							</>
						)}
					</NavHeader>
				</StyledWrapHeader>
			</HeaderContainer>

			<Header.Notifications
				openDrawer={openDrawer}
				setOpenDrawer={setOpenDrawer}
				notificationList={notificationList?.data || null}
				isLoading={isLoading}
			/>

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
					<GiteOutlined /> {t('Header.Room_for_rent')}
				</MenuItem>
				<MenuItem onClick={() => handleClose('/room/rented')}>
					<BedroomParentOutlined /> {t('Header.Room_rented')}
				</MenuItem>
				<MenuItem onClick={() => handleClose('/mywallet')}>
					<PaymentsOutlined /> {t('Header.Wallet')}
				</MenuItem>
				<MenuItem onClick={() => handleClose('/room/addroom')}>
					<AddHomeOutlined /> {t('Header.Post')}
				</MenuItem>
				<MenuItem onClick={() => handleClose('/invoices')}>
					<ReceiptLongOutlined /> {t('Header.Invoices')}
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
				<MenuItem
					onClick={() =>
						handleClose('/login', () => {
							localStorage.removeItem('dataUser')
							ShowNostis.success('Logout success !!!')
							dispatch(setUserInfo(null))
						})
					}
				>
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

Header.Notifications = ({
	openDrawer = false,
	setOpenDrawer,
	isLoading = false,
	notificationList,
}: {
	openDrawer: boolean
	setOpenDrawer: (val: boolean) => void
	isLoading: boolean
	notificationList: CommonPagination<INotification[]> | null
}) => {
	const { t } = useTranslation()
	const queryClient = useQueryClient()
	const ruleRender = !isLoading && notificationList && notificationList.items && notificationList.items.length > 0

	const checkNotiMutate = useMutation({
		mutationFn: userApi.checkNotification,
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ['getAllNotifications'] })
		},
		onError: (err) => {
			ShowNostis.error('Something wrong please contact an admin')
		},
	})

	const handleCheckNotification = (e: any, noti_id: string) => {
		e.preventDefault()
		if (!checkNotiMutate.isLoading) checkNotiMutate.mutate(noti_id)
	}

	const getIcons = (type: string) => {
		switch (type) {
			case 'CONTINUE_RENTAL':
				return <AddHomeOutlined fontSize="large" color="action" />
			case 'NOTIFICATION':
				return <NotificationsActiveOutlined fontSize="large" color="info" />
			case 'CANCEL_REQUEST':
				return <CancelOutlined fontSize="large" color="error" />
			case 'INVOICE_TO_PAY':
				return <ReceiptLongOutlined fontSize="large" color="secondary" />
			default: {
				return <InfoOutlinedIcon fontSize="large" color="error" />
			}
		}
	}

	return (
		<Drawer anchor="left" open={openDrawer} onClose={() => setOpenDrawer(false)}>
			<StyledContentDrawer>
				<p className="Heading">{t('Header.Notifications')}</p>

				{isLoading && (
					<StyledMiddleContent>
						<CircularProgress style={{ color: '#F73486' }} />
					</StyledMiddleContent>
				)}

				{!ruleRender && (
					<StyledMiddleContent>
						<div className="wrapContent">
							<img
								className="img"
								src="https://blog.tryshiftcdn.com/uploads/2021/01/notifications@2x.jpg"
								alt=""
							/>
							<p className="heading">{t('Header.No_notices')}</p>
							<p>{t('Header.Sub_no_notices')}</p>
						</div>
					</StyledMiddleContent>
				)}

				{ruleRender &&
					notificationList.items.map((notification) => (
						<StyledNotificationItem
							className={`${notification.isChecked ? 'checked' : 'notCheck'}`}
							key={notification._id}
						>
							{getIcons(notification.type)}
							<Box className="middle">
								<p className="headingNotification">{t(`Header.${notification.type}`)}</p>
								<p style={{ margin: '10px 0' }}>{notification.content}</p>
								<p>
									<span style={{ fontWeight: 'bold' }}> {t('Header.time')} </span> :{' '}
									{formatDate(new Date(notification.createdAt))}
								</p>
							</Box>
							{!notification.isChecked && (
								<Box
									className="check-notification"
									onClick={(e) => handleCheckNotification(e, notification._id)}
								>
									{checkNotiMutate.isLoading ? (
										<CircularProgress color="primary" size={14} />
									) : (
										<CheckIcon />
									)}
								</Box>
							)}
						</StyledNotificationItem>
					))}
			</StyledContentDrawer>
		</Drawer>
	)
}

export default Header
