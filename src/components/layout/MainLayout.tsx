import Header from '@/common/Header'
import { LayoutProps } from '@/models/common'
import * as React from 'react'

export function MainLayout({ children }: LayoutProps) {
	return (
		<React.Fragment>
			<Header />
			<main>{children}</main>
			{/* <Footer /> */}
		</React.Fragment>
	)
}
