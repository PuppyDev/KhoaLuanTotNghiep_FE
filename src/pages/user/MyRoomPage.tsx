import HeadingTitle from '@/components/common/Heading/HeadingTitle'
import RoomItem from '@/components/common/Room/RoomItem'
import { ListRoom } from 'pages/Home/HomeStyles'

const MyRoomPage = () => {
	return (
		<>
			<HeadingTitle>Phòng đã đăng</HeadingTitle>

			<ListRoom>
				<RoomItem to="/room/1"></RoomItem>
				<RoomItem to="/room/12"></RoomItem>
				<RoomItem to="/room/13"></RoomItem>
			</ListRoom>
		</>
	)
}

export default MyRoomPage
