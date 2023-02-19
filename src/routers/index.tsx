import { HomeLayout } from '@/components/layout/HomeLayout'
import Home from 'pages/Home'
import SignIn from 'pages/auth/SignIn'
import SignUp from 'pages/auth/SignUp'
import UpdateId from 'pages/auth/UpdateId'
import RoomDetail from 'pages/room'
import RoomsLocation from 'pages/room/RoomsLocation'
import { ProfilePage } from 'pages/user'
import BookingPage from 'pages/user/BookingPage'
import WalletPage from 'pages/user/WalletPage'
import { Route, Routes } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import RenderRouteHeader from './RenderRouteHeader'
import AddRoom from 'pages/room/AddRoom'
import AdminRoute from './AdminRoute'
import PageNotFound from 'pages/notFoundPage'

const mainRoutes = [
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

const RoutesHomeLayout = [
	{
		id: 1,
		element: <Home />,
		pathName: '/',
	},
	{
		id: 2,
		element: <RoomDetail />,
		pathName: '/room/:roomid',
	},
	{
		id: 3,
		element: <RoomsLocation />,
		pathName: '/:location',
	},
	{
		id: 4,
		element: <AddRoom />,
		pathName: '/room/addRoom',
	},
]

const AdminRoutesLayout = [
	{
		id: 1,
		element: 'Admin Page',
		pathName: '/',
	},
]

const PathRouter = () => {
	return (
		<Routes>
			{/* Normal Route */}
			<Route element={<RenderRouteHeader />}>
				{mainRoutes.map((item) => (
					<Route path={item.pathName} key={item.id} element={<PrivateRoute>{item.element}</PrivateRoute>} />
				))}
				<Route path="*" element={<PageNotFound />} />
			</Route>

			{/* Logined Router */}
			{RoutesHomeLayout.map((item) => (
				<Route path={item.pathName} key={item.id} element={<HomeLayout>{item.element}</HomeLayout>} />
			))}

			{/* Admin Router */}
			{AdminRoutesLayout.map((route) => (
				<Route
					path={`/admin${route.pathName}`}
					key={route.id}
					element={<AdminRoute>{route.element}</AdminRoute>}
				/>
			))}

			<Route path="/login" element={<SignIn />} />
			<Route path="/register" element={<SignUp />} />
		</Routes>
	)
}

export default PathRouter
