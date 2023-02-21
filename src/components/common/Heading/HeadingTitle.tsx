import { Typography } from '@mui/material'
import React, { PropsWithChildren } from 'react'

const HeadingTitle: React.FC<PropsWithChildren> = ({ children }) => {
	return (
		<Typography
			variant="h3"
			color="initial"
			fontWeight="bold"
			sx={{
				borderBottom: '1px solid #E7ECF3',
				width: '100%',
				marginBottom: '50px',
				paddingBottom: '40px',
				fontFamily: 'Nunito',
			}}
		>
			{children}
		</Typography>
	)
}

export default HeadingTitle
