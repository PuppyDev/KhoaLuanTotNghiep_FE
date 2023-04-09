import { CircularProgress } from '@mui/material'
import { Suspense } from 'react'
import PathRouter from 'routers'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify'
import 'sweetalert2/src/sweetalert2.scss'
import './app.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Create a client
const queryClient = new QueryClient()

function App() {
	return (
		<Suspense fallback={<CircularProgress />}>
			<QueryClientProvider client={queryClient}>
				<PathRouter />
				<ToastContainer />
			</QueryClientProvider>
		</Suspense>
	)
}

export default App
