import CottageOutlinedIcon from '@mui/icons-material/CottageOutlined'
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import StraightenOutlinedIcon from '@mui/icons-material/StraightenOutlined'
import { FormControl, InputLabel, MenuItem, Modal, Select, TextField } from '@mui/material'
import { Box } from '@mui/system'
import { useForm } from 'react-hook-form'
import { CardRoomItem, RoomItemHeading, RoomPreviewItem, RoomPreviews, RoomPrice } from './styles/RoomItemStyles'
import { useState } from 'react'
import { randomId } from '@/utils/index'

const RoomItem = ({ to, isRented, isOwner }: { to: string; isRented?: boolean; isOwner?: boolean }) => {
	const { register } = useForm({})

	const [isOpenService, setIsOpenService] = useState(false)

	return (
		<>
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
							<div>Nam / Nữ</div>
							<StraightenOutlinedIcon style={{ fontSize: '24px' }} />
							30m2
						</RoomPreviewItem>
						<RoomPreviewItem>
							<FmdGoodOutlinedIcon style={{ fontSize: '24px' }} />
							10 Đường sô 4, Phường Hiệp Bình
						</RoomPreviewItem>
					</RoomPreviews>
				</Box>

				<div style={{ display: 'flex', flexDirection: 'column' }}>
					<span
						onClick={(e) => {
							e.preventDefault()
							setIsOpenService(true)
						}}
					>
						Khai báo Dịch Vụ
					</span>
					<p
						onClick={(e) => {
							e.preventDefault()
							console.log('Vo')
						}}
					>
						Xem hợp đồng
					</p>
					<p>Trạng thái: 'Đã thuê'</p>
				</div>

				<RoomPrice>
					<span>1,5</span>
					tr/người
				</RoomPrice>
			</CardRoomItem>
			<Modal
				open={isOpenService}
				onClose={() => {
					setIsOpenService(false)
				}}
			>
				<Box
					sx={{
						position: 'absolute' as 'absolute',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
						width: 700,
						bgcolor: 'white',
						boxShadow: 24,
						p: 4,
						borderRadius: '8px',
						outline: 'none',
						border: ' none',
					}}
				>
					<p>Khai báo Tiền Dịch Vụ</p>
					{/* <form>
						<TextField label="Tiền điện" {...register('electric')} />
					</form> */}
					<RoomItem.Service />
				</Box>
			</Modal>
		</>
	)
}

RoomItem.Service = ({}) => {
	const [typeCal, setTypeCal] = useState('')
	const [currentService, setCurrentService] = useState<number>(0)

	const handleChange = (event: any) => setCurrentService(event.target.value)

	const handleChange2 = (event: any) => setTypeCal(event.target.value)

	const optionServices = [
		[
			{ value: 0, label: 'Miễn phí' },
			{ value: 1, label: 'Theo chỉ số nhà nước' },
			{ value: 2, label: 'Theo tháng' },
		],
		[
			{ value: 0, label: 'Miễn phí' },
			{ value: 1, label: 'Theo chỉ số' },
			{
				value: 2,
				label: 'Theo tháng',
			},
		],
		[
			{
				value: 0,
				label: 'Miễn phí',
			},
			{ value: 2, label: 'Theo tháng' },
		],
		[
			{
				value: 0,
				label: 'Miễn phí',
			},
			{ value: 2, label: 'Theo tháng' },
		],
		[
			{
				value: 0,
				label: 'Miễn phí',
			},
			{ value: 2, label: 'Theo tháng' },
		],
	]

	const services = [
		{
			label: 'Tiền Điện',
			value: 1,
		},
		{
			label: 'Tiền Nước',
			value: 2,
		},
		{
			label: 'Tiền Wifi',
			value: 3,
		},
		{
			label: 'Tiền Quản lý',
			value: 4,
		},
		{
			label: 'Tiền Rác',
			value: 5,
		},
	]

	return (
		<>
			<FormControl>
				<InputLabel id="demo-simple-select-label">Dịch vụ</InputLabel>
				<Select
					labelId="demo-simple-select-label"
					id="demo-simple-select"
					value={currentService}
					onChange={handleChange}
				>
					{services.map((serviceItem) => (
						<MenuItem value={serviceItem.value} key={randomId()}>
							{serviceItem.label}
						</MenuItem>
					))}
				</Select>
			</FormControl>
			<FormControl>
				<InputLabel id="demo-simple-select-label">Đơn Vị Tính</InputLabel>
				<Select
					labelId="demo-simple-select-label"
					id="demo-simple-select"
					value={typeCal}
					onChange={handleChange2}
				>
					{optionServices[currentService]
						? optionServices[currentService].map(function (item: any) {
								return (
									<MenuItem value={item.value} key={randomId()}>
										{item.label}
									</MenuItem>
								)
						  })
						: ''}
				</Select>
			</FormControl>

			<TextField id="standard-basic" label="Chỉ số mới " variant="outlined" />
		</>
	)
}

export default RoomItem
