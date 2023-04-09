import { roomApi } from '@/api/roomApi'
import Card from '@/components/common/Card'
import RoomItem from '@/components/common/Room/RoomItem'
import RoomFilterLocation from '@/features/Room/RoomFilterLocation'
import { ArrayFrom, getPathNameAfterSlah, itemData, randomId } from '@/utils/index'
import { decode } from '@/utils/super-function'
import { Box, Grid, Pagination } from '@mui/material'
import Typography from '@mui/material/Typography/Typography'
import { useQuery } from '@tanstack/react-query'
import { HomePageContent, ListRoom, WrapperBackground } from 'pages/Home/HomeStyles'
import { useEffect, useState } from 'react'
import { IParamsGetRoom } from '@/models/room'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import queryString from 'query-string'
import SEO from '@/components/seo'
const _page = 1
const _limit = 10

const RoomsLocation = () => {
	const location = useLocation()
	const [searchFilter, setSearchFilter] = useState<IParamsGetRoom>({
		page: _page,
		limit: _limit,
	})

	const { t } = useTranslation()
	const navigate = useNavigate()

	useEffect(() => {
		getRoomFromURL()
	}, [location, searchFilter])

	const getRoomFromURL = () => {
		try {
			const keySearch = decode(getPathNameAfterSlah(location.pathname))
			console.log('🚀 ~ file: RoomsLocation.tsx:20 ~ useEffect ~ keySearch', keySearch)
			if (keySearch === '/all') {
			}
			// const querySearch = location.search
		} catch (error) {
			navigate('/notFound')
		}
	}

	const {
		data: roomData,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['getAllNewRoom', searchFilter],
		queryFn: () => roomApi.getAllRoom(searchFilter),
		staleTime: 60 * 1000,
	})

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [searchFilter])

	const handleApplySearchFilter = (dataSearchFilter: any) => {
		const search = queryString.stringify(dataSearchFilter)
		console.log('search', search)
		console.log('decode', queryString.parse(search))
	}

	return (
		<WrapperBackground style={{ minHeight: '92vh' }}>
			<SEO title="Bughoue 🤡 - Search..." />
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
									{t('Room.Results')}
								</Typography>
								<ListRoom>
									{isLoading && ArrayFrom(10).map(() => <RoomItem.Skeleton key={randomId()} />)}

									{roomData &&
										roomData.data &&
										roomData.data.items &&
										roomData.data.items.length > 0 &&
										roomData.data.items.map((room) => (
											<RoomItem
												key={room._id}
												to={`/room/${room._id}`}
												roomItem={room}
											></RoomItem>
										))}
								</ListRoom>
								<Box
									style={{
										paddingTop: '20px',
										width: '100%',
										display: 'flex',
										justifyContent: 'center',
									}}
								>
									{!isLoading && (
										<Pagination
											onChange={(_, page) => setSearchFilter((pre) => ({ ...pre, page }))}
											count={roomData?.data?.totalPages || 0}
											page={searchFilter.page}
										/>
									)}
								</Box>
							</Card>
						</Grid>
					</Grid>
				</Box>
			</HomePageContent>
		</WrapperBackground>
	)
}

export default RoomsLocation
