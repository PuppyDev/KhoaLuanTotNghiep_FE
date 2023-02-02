import { Route, Routes } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import RenderRouteHeader from './RenderRouteHeader'
import SignUp from 'pages/auth/SignUp'
import SignIn from 'pages/auth/SignIn'
import { ProfilePage } from 'pages/user'

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
