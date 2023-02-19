import RoomFilterLocation from '@/features/Room/RoomFilterLocation'
import { getPathNameAfterSlah } from '@/utils/index'
import { HomePageContent, ListRoom, WrapperBackground } from 'pages/Home/HomeStyles'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Grid, Box, Pagination } from '@mui/material'
import Card from '@/components/common/Card'
import RoomItem from '@/components/common/Room/RoomItem'
import Typography from '@mui/material/Typography/Typography'
import { decode } from '@/utils/super-function'

const RoomsLocation = () => {
	const location = useLocation()

	const [dataSearch, setdataSearch] = useState<null>(null)
	const [searchFilter, setSearchFilter] = useState()

	useEffect(() => {
		const keySearch = decode(getPathNameAfterSlah(location.pathname))
		console.log('🚀 ~ file: RoomsLocation.tsx:20 ~ useEffect ~ keySearch', keySearch)
	}, [location, searchFilter])

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])

	const handleApplySearchFilter = (dataSearchFilter: any) => {
		setSearchFilter(dataSearchFilter)
	}

	return (
		<WrapperBackground style={{ minHeight: '92vh' }}>
			<HomePageContent>
				<Box style={{ paddingTop: '40px' }}>
					<Grid container spacing="32px">
						<Grid item xs={12} md={3.3}>
							<Card isPadding={false}>
								<RoomFilterLocation onApply={handleApplySearchFilter} />
							</Card>
						</Grid>
						<Grid item xs={12} md={8.7}>
							<Card>
								<Typography
									style={{
										fontSize: '24px',
										paddingBottom: '32px',
										fontWeight: '600',
										color: '#333333',
									}}
								>
									Kết quả
								</Typography>
								<ListRoom>
									<RoomItem to="/room/1"></RoomItem>
									<RoomItem to="/room/12"></RoomItem>
									<RoomItem to="/room/13"></RoomItem>
								</ListRoom>
								<Box
									style={{
										paddingTop: '20px',
										width: '100%',
										display: 'flex',
										justifyContent: 'center',
									}}
								>
									<Pagination count={10} color="secondary" />
								</Box>
							</Card>
						</Grid>
					</Grid>
				</Box>

				{/* <CircularProgress style={{ color: '#F73486' }} /> */}
			</HomePageContent>
		</WrapperBackground>
	)
}

export default RoomsLocation
