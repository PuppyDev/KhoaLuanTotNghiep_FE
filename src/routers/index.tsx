import SignIn from 'pages/auth/SignIn'
import SignUp from 'pages/auth/SignUp'
import UpdateId from 'pages/auth/UpdateId'
import { ProfilePage } from 'pages/user'
import BookingPage from 'pages/user/BookingPage'
import WalletPage from 'pages/user/WalletPage'
import { Route, Routes } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import RenderRouteHeader from './RenderRouteHeader'

const mainRoutes = [
	{
		id: 1,
		element: 'Main Component',
		pathName: '/',
	},
	{
		id: 2,
		element: <ProfilePage />,
		pathName: '/profile/:id',
	},
	{
		id: 3,
		element: <BookingPage />,
		pathName: '/booking',
	},
	{
		id: 4,
		element: <WalletPage />,
		pathName: '/MyWallet',
	},
	{
		id: 5,
		element: <UpdateId />,
		pathName: '/registerAuth',
	},
]

const PathRouter = () => {
	return (
		<Routes>
			<Route element={<RenderRouteHeader />}>
				{mainRoutes.map((item) => (
					<Route path={item.pathName} key={item.id} element={<PrivateRoute>{item.element}</PrivateRoute>} />
				))}
				<Route path="*" element={<>Not Found Page</>} />
			</Route>
			<Route path="/login" element={<SignIn />} />
			<Route path="/register" element={<SignUp />} />
		</Routes>
	)
}

export default PathRouter
