import BugHouseLogo from '@/assets/images/LogoBugHouse1.png'
import { AccountCircleOutlined, CreditCard, ExpandMore, Logout, PersonOutlineOutlined } from '@mui/icons-material'
import { Avatar, Menu, MenuItem, Typography } from '@mui/material'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { HeaderContainer, NavHeader, paperProps } from './HeaderStyle'
import useAuth from '@/hooks/useAuth'

const Header = () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
	const navigate = useNavigate()
	const open = Boolean(anchorEl)

	const { user } = useAuth()

	const handleClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget)

	const handleClose = (to?: string) => {
		if (to) navigate(to)
		setAnchorEl(null)
	}
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
					<AccountCircleOutlined /> <Typography variant="body1"> My Profile </Typography>
				</MenuItem>
				<MenuItem onClick={() => handleClose()}>
					<PersonOutlineOutlined /> Manage account
				</MenuItem>
				<MenuItem onClick={() => handleClose('booking')}>
					<CreditCard /> Bookings
				</MenuItem>
				<MenuItem onClick={() => handleClose('/mywallet')}>
					<CreditCard /> My wallate
				</MenuItem>
				<MenuItem onClick={() => handleClose()}>
					<Logout /> Logout
				</MenuItem>
			</Menu>
		</>
	)
}

export default Header
