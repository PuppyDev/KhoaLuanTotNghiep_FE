import { Route, Routes } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import RenderRouteHeader from './RenderRouteHeader'

const mainRoutes = [
	{
		id: 1,
		element: 'Main Component',
		pathName: '/',
	},
]

const PathRouter = () => {
	return (
		<Routes>
			<Route element={<RenderRouteHeader />}>
				{mainRoutes.map((item) => (
					<Route path={item.pathName} key={item.id} element={<PrivateRoute>{item.element}</PrivateRoute>} />
				))}
				<Route path="*" element={<>Error page</>} />
			</Route>
			<Route path="/login" element={<>Login page</>} />
			<Route path="/register" element={<>register page</>} />
		</Routes>
	)
}

export default PathRouter
