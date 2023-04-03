import { roomApi } from '@/api/roomApi'
import HeadingTitle from '@/components/common/Heading/HeadingTitle'
import RoomItem from '@/components/common/Room/RoomItem'
import { ArrayFrom, randomId } from '@/utils/index'
import { useQuery } from '@tanstack/react-query'
import { ListRoom } from 'pages/Home/HomeStyles'
import { useTranslation } from 'react-i18next'
import { StyledWrapPage } from './style'

const BookingPage = () => {
	const { t } = useTranslation()

	const {
		data: listRoomRented,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['getRoomRented'],
		queryFn: () => roomApi.getRoomrented(),
		refetchOnWindowFocus: false,
	})

	const isRenderItem = !isLoading && listRoomRented && listRoomRented.data && listRoomRented.data.items.length > 0

	return (
		<StyledWrapPage>
			<HeadingTitle>{t('ROOM_RENTED')}</HeadingTitle>

			<ListRoom>
				{isLoading && ArrayFrom(4).map((_) => <RoomItem.Skeleton key={randomId()} />)}
				{isRenderItem &&
					listRoomRented.data.items.map((item) => (
						<RoomItem
							to={`/room/${item?.room?._id}`}
							key={item._id}
							roomItem={item?.room}
							rentAndLessorInfo={item}
							isRented
						/>
					))}
			</ListRoom>
		</StyledWrapPage>
	)
}

export default BookingPage
