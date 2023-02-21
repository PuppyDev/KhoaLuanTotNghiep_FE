import HeadingTitle from '@/components/common/Heading/HeadingTitle'
import RoomItem from '@/components/common/Room/RoomItem'
import { ListRoom } from 'pages/Home/HomeStyles'

const BookingPage = () => {
	return (
		<>
			<HeadingTitle>Phòng đã thuê</HeadingTitle>

			<ListRoom>
				<RoomItem to="/room/1"></RoomItem>
				<RoomItem to="/room/12"></RoomItem>
				<RoomItem to="/room/13"></RoomItem>
			</ListRoom>
		</>
	)
}

export default BookingPage
