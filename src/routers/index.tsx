import { HomeLayout } from '@/components/layout/HomeLayout'
import AuthenPage from 'pages/auth/AuthenPage'
import ForgotPassPage from 'pages/auth/ForgotPassPage'
import SignIn from 'pages/auth/SignIn'
import SignUp from 'pages/auth/SignUp'
import UpdateId from 'pages/auth/UpdateId'
import Home from 'pages/Home'
import PageNotFound from 'pages/notFoundPage'
import PaymentPageHandle from 'pages/payment'
import RoomDetail from 'pages/room'
import AddRoom from 'pages/room/AddRoom'
import DeclareRoomPage from 'pages/room/DeclareRoomPage'
import RoomsLocation from 'pages/room/RoomsLocation'
import { ProfilePage } from 'pages/user'
import BookingPage from 'pages/user/BookingPage'
import MyRoomPage from 'pages/user/MyRoomPage'
import WalletPage from 'pages/user/WalletPage'
import { Route, Routes } from 'react-router-dom'
import { randomId } from '../utils'
import AdminRoute from './AdminRoute'
import PrivateRoute from './PrivateRoute'
import RenderRouteHeader from './RenderRouteHeader'

const mainRoutes = [
	{
		id: 2,
		element: <ProfilePage />,
		pathName: '/profile/:id',
	},
	{
		id: 3,
		element: <BookingPage />,
		pathName: '/room/rented',
	},
	{
		id: 4,
		element: <WalletPage />,
		pathName: '/MyWallet',
	},
	{
		id: 6,
		element: <MyRoomPage />,
		pathName: '/room/myRooms',
	},
	{
		id: 7,
		element: <PaymentPageHandle />,
		pathName: '/bh/payment-confirmation',
	},
	{
		id: 8,
		element: <DeclareRoomPage />,
		pathName: '/room/myRooms/:idRoom',
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
		pathName: '/search/:location',
	},
	{
		id: 4,
		element: <AddRoom />,
		pathName: '/room/addRoom',
	},
	{
		id: 5,
		element: <AddRoom />,
		pathName: '/room/addRoom/:id',
	},
]

const AdminRoutesLayout = [
	{
		id: 1,
		element: 'Admin Page',
		pathName: '/',
	},
]

const AuthRoutes = [
	{
		element: <SignIn />,
		pathName: '/login',
	},
	{
		element: <SignUp />,
		pathName: '/register',
	},
	{
		element: <AuthenPage />,
		pathName: '/authOtp',
	},
	{
		element: <ForgotPassPage />,
		pathName: '/forgot-password',
	},
	{
		element: <UpdateId />,
		pathName: '/registerAuth',
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

			{AuthRoutes.map((route) => (
				<Route path={route.pathName} key={randomId()} element={route.element} />
			))}
		</Routes>
	)
}

export default PathRouter
