import { roomApi } from '@/api/roomApi'
import HeadingTitle from '@/components/common/Heading/HeadingTitle'
import RoomItem from '@/components/common/Room/RoomItem'
import { ArrayFrom, randomId } from '@/utils/index'
import { useQuery } from '@tanstack/react-query'
import { StyledMiddle } from 'pages/auth/styles'
import { ListRoom } from 'pages/Home/HomeStyles'
import { useTranslation } from 'react-i18next'

const MyRoomPage = () => {
	const { t } = useTranslation()

	const {
		data: listForRent,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['getRoomRented'],
		queryFn: () => roomApi.getRoomForRent(),
		refetchOnWindowFocus: false,
	})

	return (
		<>
			<HeadingTitle>{t('My_room_page')}</HeadingTitle>

			<ListRoom>
				{isLoading && ArrayFrom(4).map((_) => <RoomItem.Skeleton key={randomId()} />)}
				{!isLoading &&
					listForRent &&
					listForRent.data &&
					listForRent.data.items.length > 0 &&
					listForRent.data.items.map((item) => (
						<RoomItem to={`/room/${item.room._id}`} key={item._id} roomItem={item.room} isRented />
					))}

				{listForRent && listForRent.data.items.length === 0 && <StyledMiddle>Nothing</StyledMiddle>}
			</ListRoom>
		</>
	)
}

export default MyRoomPage
