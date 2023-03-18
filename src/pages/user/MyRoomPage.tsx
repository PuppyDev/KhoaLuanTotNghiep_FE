import HeadingTitle from '@/components/common/Heading/HeadingTitle'
import RoomItem from '@/components/common/Room/RoomItem'
import { decode, encode } from '@/utils/super-function'
import { ListRoom } from 'pages/Home/HomeStyles'
import querystring from 'query-string'
import { useTranslation } from 'react-i18next'

const MyRoomPage = () => {
	const { t } = useTranslation()

	return (
		<>
			<HeadingTitle>{t('My_room_page')}</HeadingTitle>

			<ListRoom>
				<RoomItem
					to={'/room/addRoom/' + encode('12') + '?' + querystring.stringify({ isRented: true })}
					isOwner
				></RoomItem>
				<RoomItem to={'/room/addRoom/' + encode('12')} isOwner></RoomItem>
			</ListRoom>
		</>
	)
}

export default MyRoomPage
