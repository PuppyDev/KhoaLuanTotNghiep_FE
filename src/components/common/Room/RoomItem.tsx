import { serviceApi } from '@/api/serviceApi'
import { typeOfRoom } from '@/constants/room'
import { IResponseRented, room } from '@/models/room'
import { IServiceRes } from '@/models/services'
import { getContract } from '@/utils/contract'
import { convertMoneyToVndText } from '@/utils/money'
import CottageOutlinedIcon from '@mui/icons-material/CottageOutlined'
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import StraightenOutlinedIcon from '@mui/icons-material/StraightenOutlined'
import { Button, Drawer, Skeleton, TextField } from '@mui/material'
import { Box } from '@mui/system'
import { useQuery } from '@tanstack/react-query'
import { Fragment, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import {
	CardRoomItem,
	CardRoomSkeleton,
	RoomItemHeading,
	RoomPreviewItem,
	RoomPreviews,
	RoomPrice,
	StyledButtonOwner,
	StyledCloseButton,
	StyledContractDrawer,
	StyledOwner,
	StyledStatus,
	StyledText,
	StyledWrapInfo,
	StyledWrapMoreService,
} from './styles/RoomItemStyles'

interface IProps {
	to: string
	isRented?: boolean
	isOwner?: boolean
	roomItem: room | undefined
	rentAndLessorInfo?: IResponseRented | undefined
}

const RoomItem = (props: IProps) => {
	const { to, isRented, isOwner, roomItem, rentAndLessorInfo } = props
	const { register, setValue } = useForm({})
	const { t } = useTranslation()

	const navigation = useNavigate()
	const [numberOfService, setNumberOfService] = useState<IServiceRes[]>([])
	const [isOpenContract, setIsOpenContract] = useState(false)

	const [idRoomSelected, setIdRoomSelected] = useState('')
	const { data: dataServices, isLoading: loadingServices } = useQuery({
		queryKey: ['getServiceRemand', idRoomSelected, isOwner],
		queryFn: () => {
			if (idRoomSelected && isOwner) {
				return serviceApi.getListServiceDemand(idRoomSelected)
			}
			return null
		},
		keepPreviousData: true,
		staleTime: Infinity,
	})

	useEffect(() => {
		if (dataServices) setNumberOfService(dataServices?.data)
	}, [dataServices])

	const handleWatchContract = (e: any) => {
		e.preventDefault()
		setIsOpenContract(true)
	}

	const handleOpenService = (e: any) => {
		e.preventDefault()
		navigation('/room/myRooms/' + roomItem?._id)
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
		const newDataService = numberOfService.filter((item) => item._id != id)
		setNumberOfService(newDataService)
	}

	return (
		<Fragment>
			<CardRoomItem to={to}>
				<Box className="roomItemImage">
					<img
						src={
							roomItem?.roomAttachment?.url[0] ||
							'https://bayleaf.s3.ap-southeast-1.amazonaws.com/property-images/fa7d4c8e-692e-4cc7-bf85-0fcad740b16c/2b271aa2-779e-4bb3-b9dc-0a730084fc22-46325561_1975119655915194_6045991570992267264_n.jpg'
						}
						alt="banner image room"
					/>
				</Box>

				<Box className="roomItemContent">
					<RoomItemHeading>{roomItem?.name || 'Name room error'}</RoomItemHeading>

					<RoomPreviews>
						<RoomPreviewItem>
							<CottageOutlinedIcon style={{ fontSize: '24px' }} />
							{typeOfRoom.find((type) => type.value === roomItem?.typeRoom)?.label || 'Phòng cho thuê'}
						</RoomPreviewItem>
						<RoomPreviewItem>
							<PersonOutlineOutlinedIcon style={{ fontSize: '24px' }} />
							<div>{roomItem?.gender === 'All' ? t('Room.gender') : t(`Room.${roomItem?.gender}`)}</div>
							<StraightenOutlinedIcon style={{ fontSize: '24px' }} />
							{roomItem?.acreage}m2
						</RoomPreviewItem>
						<RoomPreviewItem>
							<FmdGoodOutlinedIcon style={{ fontSize: '24px' }} />
							{roomItem?.address?.fullText || 'Updating...'}
						</RoomPreviewItem>
					</RoomPreviews>
				</Box>

				{isOwner && (
					<StyledOwner>
						{roomItem?.status === 'already-rent' && (
							<>
								<StyledStatus className="green">{t('Room.currently_being_rented')}</StyledStatus>
								<StyledButtonOwner onClick={handleOpenService}>
									{t('Room.service_declaration')}
								</StyledButtonOwner>
								<StyledButtonOwner onClick={handleWatchContract}>
									{t('Room.view_contract')}
								</StyledButtonOwner>
							</>
						)}

						{roomItem?.status === 'available' && (
							<StyledStatus className="info">{t('Room.not_yet_hired')}</StyledStatus>
						)}

						{roomItem?.status === 'not-available' && (
							<StyledStatus className="red">{t('Room.unsuitable')}</StyledStatus>
						)}
					</StyledOwner>
				)}

				{isRented && (
					<StyledOwner>
						<StyledButtonOwner onClick={handleWatchContract}>{t('Room.view_contract')}</StyledButtonOwner>
					</StyledOwner>
				)}

				<RoomPrice>
					<span> {convertMoneyToVndText(roomItem?.basePrice)}</span>
					vnđ / {t('Room.person')}
				</RoomPrice>
			</CardRoomItem>

			{(isOwner || isRented) && (
				<Drawer anchor={'left'} open={isOpenContract} onClose={() => setIsOpenContract(false)}>
					<StyledContractDrawer>
						<StyledCloseButton onClick={() => setIsOpenContract(false)}>X</StyledCloseButton>
						<div
							dangerouslySetInnerHTML={{
								__html: getContract(
									rentAndLessorInfo || {
										lessor: undefined,
										renter: undefined,
										room: undefined,
										_id: undefined,
										dateRent: undefined,
									}
								),
							}}
						/>

						<Button onClick={handleCancelContract}>{t('Room.cancel_contract')}</Button>
					</StyledContractDrawer>
				</Drawer>
			)}
		</Fragment>
	)
}

RoomItem.Service = ({
	setValue,
	serviceData,
	loading,
	register,
}: {
	setValue?: any
	serviceData?: IServiceRes
	loading?: boolean
	register: any
}) => {
	const { t } = useTranslation()

	const services = [
		{
			label: t('Room.electricity_bill'),
			value: 'electricity cost',
		},
		{
			label: t('Room.water_money'),
			value: 'water cost',
		},
		{
			label: t('Room.wifi_money'),
			value: 'internet cost',
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

	const [newIndicator, setnewIndicator] = useState(0)

	const serviceName = services.find((item) => item.value === serviceData?.service.name)?.label
	const isElectric = serviceName?.trim() === 'electricity cost' || serviceName?.trim() === 'Tiền điện'

	return (
		<StyledWrapMoreService>
			<StyledWrapInfo>
				<TextField className="text" variant="filled" disabled={true} value={serviceName} />
				<TextField className="text" variant="filled" disabled={true} value={serviceData?.service.description} />
				<TextField
					className="text"
					variant="outlined"
					label={isElectric ? 'Chỉ số mới' : 'Số người '}
					onChange={(e) => {
						if (e && e.target.value && +e.target.value > (serviceData?.oldIndicator || 0))
							setnewIndicator(Number(e.target.value))
					}}
					{...register(serviceData?.service.name.trim().replace(/ /g, '_') || 'name')}
				/>
			</StyledWrapInfo>

			<StyledWrapInfo>
				<div>Đơn giá cho {serviceName} </div>

				{isElectric ? (
					<div className="right">
						<StyledText>Chỉ số cũ : {serviceData?.oldIndicator}</StyledText>
						<StyledText>Chỉ số mới : {newIndicator}</StyledText>
					</div>
				) : (
					<div className="right">
						<StyledText>Tiền dịch vụ {serviceData?.service?.basePrice}</StyledText>
					</div>
				)}
			</StyledWrapInfo>
		</StyledWrapMoreService>
	)
}

RoomItem.Skeleton = () => {
	return (
		<CardRoomSkeleton>
			<Box className="roomItemImage">
				<Skeleton variant="rectangular" width="100%" height="100%" />
			</Box>

			<Box className="roomItemContent">
				<Skeleton variant="text" sx={{ fontSize: '1rem', width: '60%' }} />

				<RoomPreviews>
					<Skeleton variant="rectangular" sx={{ width: '100%' }} />
					<Skeleton variant="rectangular" sx={{ width: '100%' }} />
					<Skeleton variant="rectangular" sx={{ width: '100%' }} />
				</RoomPreviews>
			</Box>

			<RoomPrice>
				<Skeleton variant="rectangular" width={80} height={60} />
				<Skeleton variant="text" sx={{ fontSize: '12px', width: '100%' }} />
			</RoomPrice>
		</CardRoomSkeleton>
	)
}

export default RoomItem
