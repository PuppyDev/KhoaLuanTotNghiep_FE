import CottageOutlinedIcon from '@mui/icons-material/CottageOutlined'
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import StraightenOutlinedIcon from '@mui/icons-material/StraightenOutlined'
import { Box } from '@mui/system'
import { CardRoomItem, RoomItemHeading, RoomPreviewItem, RoomPreviews, RoomPrice } from './styles/RoomItemStyles'

const RoomItem = ({ to }: { to: string }) => {
	return (
		<CardRoomItem to={to}>
			<Box className="roomItemImage">
				<img src="https://bayleaf.s3.ap-southeast-1.amazonaws.com/property-images/fa7d4c8e-692e-4cc7-bf85-0fcad740b16c/2b271aa2-779e-4bb3-b9dc-0a730084fc22-46325561_1975119655915194_6045991570992267264_n.jpg" />
			</Box>

			<Box className="roomItemContent">
				<RoomItemHeading>Ký túc xá quận Thủ Đức</RoomItemHeading>

				<RoomPreviews>
					<RoomPreviewItem>
						<CottageOutlinedIcon style={{ fontSize: '24px' }} />
						Ký túc xá
					</RoomPreviewItem>
					<RoomPreviewItem>
						<PersonOutlineOutlinedIcon style={{ fontSize: '24px' }} />
						Nam / Nữ
						<div />
						<StraightenOutlinedIcon style={{ fontSize: '24px' }} />
						30m2
					</RoomPreviewItem>
					<RoomPreviewItem>
						<FmdGoodOutlinedIcon style={{ fontSize: '24px' }} />
						10 Đường sô 4, Phường Hiệp Bình
					</RoomPreviewItem>
				</RoomPreviews>
			</Box>

			<RoomPrice>
				<span
					style={{
						fontSize: '48px',
						lineHeight: '68px',
						fontWeight: 'bold',
					}}
				>
					1,5
				</span>
				tr/người
			</RoomPrice>
		</CardRoomItem>
	)
}

export default RoomItem
