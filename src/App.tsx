import { CircularProgress } from '@mui/material'
import { Suspense } from 'react'
import PathRouter from 'routers'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify'
import './app.css'
import 'sweetalert2/src/sweetalert2.scss'

function App() {
	return (
		<Suspense fallback={<CircularProgress />}>
			<PathRouter />
			<ToastContainer />
		</Suspense>
	)
}

export default App
