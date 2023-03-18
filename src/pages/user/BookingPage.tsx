import HeadingTitle from '@/components/common/Heading/HeadingTitle'
import RoomItem from '@/components/common/Room/RoomItem'
import { ListRoom } from 'pages/Home/HomeStyles'
import { useTranslation } from 'react-i18next'
import { StyledWrapPage } from './style'

const BookingPage = () => {
	const { t } = useTranslation()

	return (
		<StyledWrapPage>
			<HeadingTitle>{t('ROOM_RENTED')}</HeadingTitle>

			<ListRoom>
				<RoomItem to="/room/1" isRented></RoomItem>
				<RoomItem to="/room/12" isRented></RoomItem>
				<RoomItem to="/room/13" isRented></RoomItem>
			</ListRoom>
		</StyledWrapPage>
	)
}

export default BookingPage
