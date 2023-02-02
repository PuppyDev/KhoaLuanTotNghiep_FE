import { CircularProgress } from '@mui/material'
import { Suspense } from 'react'
import PathRouter from 'routers'
import './app.css'

function App() {
	return (
		<Suspense fallback={<CircularProgress />}>
			<PathRouter />
		</Suspense>
	)
}

export default App
