import { getContract } from '@/utils/contract'
import { randomId } from '@/utils/index'
import CottageOutlinedIcon from '@mui/icons-material/CottageOutlined'
import DeleteIcon from '@mui/icons-material/Delete'
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import StraightenOutlinedIcon from '@mui/icons-material/StraightenOutlined'
import { Button, Drawer, FormControl, InputLabel, MenuItem, Modal, Select, TextField } from '@mui/material'
import { Box } from '@mui/system'
import classNames from 'classnames'
import { Fragment, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import Swal from 'sweetalert2'
import {
	CardRoomItem,
	RoomItemHeading,
	RoomPreviewItem,
	RoomPreviews,
	RoomPrice,
	StyledButtonOwner,
	StyledButtonService,
	StyledCloseButton,
	StyledContractDrawer,
	StyledModalForm,
	StyledOwner,
	StyledStatus,
	StyledWrapMoreService,
	StyledWrapServices,
} from './styles/RoomItemStyles'

const RoomItem = ({ to, isRented, isOwner }: { to: string; isRented?: boolean; isOwner?: boolean }) => {
	const { register, setValue } = useForm({})
	const { t } = useTranslation()

	const [isOpenService, setIsOpenService] = useState(false)
	const [numberOfService, setNumberOfService] = useState<{ id: string | number }[]>([{ id: 1 }])
	const [isOpenContract, setIsOpenContract] = useState(false)

	const handleSetDataService = (values: string) => {
		console.log(values)
	}

	const handleWatchContract = (e: any) => {
		e.preventDefault()
		setIsOpenContract(true)
	}

	const handleOpenService = (e: any) => {
		e.preventDefault()
		setIsOpenService(true)
	}

	const handleCancelContract = () => {
		setIsOpenContract(false)

		Swal.fire({
			title: t('Room.cancel_contract') || 'Huỷ hợp đồng',
			icon: 'error',
			showCancelButton: true,
			confirmButtonColor: '#f73486',
			cancelButtonColor: '#ef5a5a',
			confirmButtonText: t('Room.confirm') || 'Huỷ hợp đồng',
			cancelButtonText: t('Room.cancel') || 'Huỷ hợp đồng',
			html: `<div><p>Bạn có muốn chấm dứt hợp đông này không ?</p><p style="color: red; font-size: 14px; font-style: italic">Hợp đồng chưa hết kỳ hạn. nếu huỷ bạn sẽ ${
				isOwner ? 'phải chịu 1 khoản phạt ' : 'mất tiền cọc . <br/>'
			}. Hợp đồng của bạn kết thúc vào ngày : 12/2/2023</p> </div>`,
		}).then((result) => {
			if (result.isConfirmed) {
				Swal.fire(
					t('Room.canceled_successfully') || 'Huỷ thành công !',
					t('Room.date_cancel_contract') || 'Bạn đã huỷ hợp đồng và hợp đồng sẽ hết hiệu lực vào ngày ....',
					'success'
				)
			}
		})
	}

	const handleDeleteService = (id: number | string) => {
		const newDataService = numberOfService.filter((item) => item.id != id)
		setNumberOfService(newDataService)
	}

	return (
		<Fragment>
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
							<div>{t('Room.gender')}</div>
							<StraightenOutlinedIcon style={{ fontSize: '24px' }} />
							30m2
						</RoomPreviewItem>
						<RoomPreviewItem>
							<FmdGoodOutlinedIcon style={{ fontSize: '24px' }} />
							10 Đường sô 4, Phường Hiệp Bình
						</RoomPreviewItem>
					</RoomPreviews>
				</Box>

				{isOwner && (
					<StyledOwner>
						<StyledButtonOwner onClick={handleOpenService}>
							{t('Room.service_declaration')}
						</StyledButtonOwner>

						<StyledButtonOwner onClick={handleWatchContract}>{t('Room.view_contract')}</StyledButtonOwner>

						<StyledStatus className="green">{t('Room.currently_being_rented')}</StyledStatus>
					</StyledOwner>
				)}

				{isRented && (
					<StyledOwner>
						<StyledButtonOwner onClick={handleWatchContract}>{t('Room.view_contract')}</StyledButtonOwner>
					</StyledOwner>
				)}

				<RoomPrice>
					<span>1,5</span>
					tr/{t('Room.person')}
				</RoomPrice>
			</CardRoomItem>

			{(isOwner || isRented) && (
				<Drawer anchor={'left'} open={isOpenContract} onClose={() => setIsOpenContract(false)}>
					<StyledContractDrawer>
						<StyledCloseButton onClick={() => setIsOpenContract(false)}>X</StyledCloseButton>
						<div
							dangerouslySetInnerHTML={{
								__html: getContract({ dataRoom: { basePrice: 100000000, deposit: 1000000 } }),
							}}
						/>

						<Button onClick={handleCancelContract}>{t('Room.cancel_contract')}</Button>
					</StyledContractDrawer>
				</Drawer>
			)}

			{isOwner && (
				<Modal
					open={isOpenService}
					onClose={() => {
						setIsOpenService(false)
					}}
				>
					<StyledModalForm>
						<p className="headerForm">
							{t('Room.service_declaration')} <br />
							<span className="descriptionForm">
								Lưu ý : Nếu không khai báo chỉ số thì hệ thống sẽ tự động lấy chỉ số của tháng trước (
								Miễn Phí / Theo Tháng) trường hợp tính theo chỉ số thì sẽ được tính = 0
							</span>
						</p>

						{numberOfService &&
							numberOfService.map((item) => (
								<RoomItem.Service
									isDelete={numberOfService.length === 1}
									key={item.id}
									handleDelete={() => handleDeleteService(item.id)}
								/>
							))}

						<StyledWrapServices>
							<StyledButtonService
								onClick={() => setNumberOfService((pre) => [...pre, { id: randomId() }])}
								className={classNames({ disabled: numberOfService.length >= 5 })}
							>
								{t('Room.more_services')}
							</StyledButtonService>

							<StyledButtonService onClick={() => console.log('Khai bao dich vụ các kiểu')}>
								{t('Room.confirm_service')}
							</StyledButtonService>
						</StyledWrapServices>
					</StyledModalForm>
				</Modal>
			)}
		</Fragment>
	)
}

RoomItem.Service = ({
	setValue,
	handleDelete,
	isDelete,
}: {
	setValue?: any
	handleDelete: () => void
	isDelete?: boolean
}) => {
	const [typeCal, setTypeCal] = useState(0)
	const [currentService, setCurrentService] = useState<number>(1)
	const { t } = useTranslation()

	const handleChange = (event: any) => {
		setCurrentService(event.target.value)
		setTypeCal(0)
	}

	const handleChange2 = (event: any) => setTypeCal(event.target.value)

	const optionServices = [
		[
			{ value: 0, label: t('Room.free') },
			{ value: 1, label: t('Room.from_state_index') },
			{ value: 2, label: t('Room.monthly') },
		],
		[
			{ value: 0, label: t('Room.free') },
			{ value: 1, label: t('Room.from_state_index') },
			{ value: 2, label: t('Room.monthly') },
		],
		[
			{ value: 0, label: t('Room.free') },
			{ value: 2, label: t('Room.monthly') },
		],
		[
			{ value: 0, label: t('Room.free') },
			{ value: 2, label: t('Room.monthly') },
		],
		[
			{ value: 0, label: t('Room.free') },
			{ value: 2, label: t('Room.monthly') },
		],
	]

	const services = [
		{
			label: t('Room.electricity_bill'),
			value: 1,
		},
		{
			label: t('Room.water_money'),
			value: 2,
		},
		{
			label: t('Room.wifi_money'),
			value: 3,
		},
		{
			label: t('Room.money_management'),
			value: 4,
		},
		{
			label: t('Room.garbage_money'),
			value: 5,
		},
	]

	return (
		<StyledWrapMoreService>
			<FormControl>
				<InputLabel id="demo-simple-select-label">{t('Room.services')}</InputLabel>
				<Select
					labelId="demo-simple-select-label"
					id="demo-simple-select"
					value={currentService}
					onChange={handleChange}
					style={{ minWidth: 200 }}
					label={t('Room.new_index')}
					variant="standard"
				>
					{services.map((serviceItem) => (
						<MenuItem value={serviceItem.value} key={randomId()}>
							{serviceItem.label}
						</MenuItem>
					))}
				</Select>
			</FormControl>
			<FormControl>
				<InputLabel id="demo-simple-select-label">{t('Room.unit')}</InputLabel>
				<Select
					labelId="demo-simple-select-label"
					id="demo-simple-select"
					value={typeCal}
					onChange={handleChange2}
					style={{ minWidth: 200 }}
					label={t('Room.unit')}
					variant="standard"
				>
					{optionServices[currentService - 1].map((item: any) => (
						<MenuItem value={item?.value} key={randomId()}>
							{item?.label}
						</MenuItem>
					))}
				</Select>
			</FormControl>

			{typeCal !== 0 && (
				<TextField
					id="standard-basic"
					label={typeCal === 1 ? `Chỉ số ${services[currentService - 1].label} mới` : 'Tiền / tháng'}
					style={{ minWidth: 200 }}
					variant="standard"
				/>
			)}
			{!isDelete && (
				<Box onClick={handleDelete} style={{ color: 'red', cursor: 'pointer' }}>
					<DeleteIcon />
				</Box>
			)}
		</StyledWrapMoreService>
	)
}

export default RoomItem
