import Header from '@/common/Header'
import { LayoutProps } from '@/models/common'
import { Box, styled } from '@mui/system'

export function HomeLayout({ children }: LayoutProps) {
	return (
		<Box>
			<Header />
			<main style={{ background: '#fafafb' }}>{children}</main>
		</Box>
	)
}
