import { roomApi } from '@/api/roomApi'
import Card from '@/components/common/Card'
import RoomDetailInfo from '@/components/common/Room/RoomDetailInfo'
import { StyledInfoOfOwner } from '@/components/common/Room/styles/RoomItemStyles'
import { typeOfRoom } from '@/constants/room'
import { IpropsRoomMaster } from '@/models/room'
import { IOwnerInfo } from '@/models/user'
import { getContract, getContractTerm } from '@/utils/contract'
import { getIcon } from '@/utils/icon'
import { randomId } from '@/utils/index'
import CottageOutlinedIcon from '@mui/icons-material/CottageOutlined'
import DeckIcon from '@mui/icons-material/Deck'
import ErrorIcon from '@mui/icons-material/Error'
import PersonIcon from '@mui/icons-material/Person'
import { Box, Button, Fade, Grid, Modal, TextField, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { HomePageContent, WrapperBackground } from 'pages/Home/HomeStyles'
import { memo, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { Autoplay, EffectCoverflow, Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'
import { Swiper, SwiperSlide } from 'swiper/react'
import {
	ButtonRent,
	DetailRoom,
	HeadingCardDetail,
	HeadingRoomBlock,
	ModalContract,
	RoomDetailContent,
	RoomDetailGallary,
	RoomUtiliti,
	SignName,
	SignNameItem,
	StyledAcceptTerm,
	StyledButtonAcceptTerm,
	StyledCheckBox,
	StyledHeadingPayment,
	StyledItemListPayment,
	StyledLabelAcceptTerm,
	StyledListPayment,
	StyledModalPayment,
} from './styles/RoomDetail'

export default function RoomDetail() {
	const [isShowContract, setIsShowContract] = useState(false)

	const [showStep, setShowStep] = useState<'Term' | 'Contract' | 'Pyament'>('Term')
	const { t } = useTranslation()
	const [isSign, setIsSign] = useState(false)
	const [showModalOTP, setShowModalOTP] = useState(false)
	const { roomid } = useParams()

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])

	// i will add loading after
	const { data: RoomData, isLoading } = useQuery({
		queryKey: ['getDetailsRoom', roomid],
		queryFn: () => {
			if (roomid) return roomApi.getDetailRoom(roomid)
			return
		},
		staleTime: Infinity,
	})

	const handleComfirmOTP = async () => {
		try {
			setShowModalOTP(false)
			setIsSign(true)
			setShowStep('Pyament')
			setIsShowContract(false)
		} catch (error) {}
	}

	const handleClosePayment = () => {
		setShowStep('Term')
	}

	const [isAcceptTerm, setIsAcceptTerm] = useState(false)

	// const roomStatus = RoomData?.data.

	return (
		<WrapperBackground>
			<HomePageContent style={{ paddingTop: '32px' }}>
				<RoomDetailGallary>
					<RoomDetail.Carousel itemData={RoomData?.data?.roomAttachment?.url || []} />
				</RoomDetailGallary>

				<HeadingRoomBlock>
					<Typography className="headingRoom">{RoomData?.data?.name || 'tên đang cập nhập'}</Typography>
					<ButtonRent onClick={() => setIsShowContract(true)}>{t('Room.Rent')}</ButtonRent>
				</HeadingRoomBlock>

				<DetailRoom container spacing="32px">
					<Grid item xs={12} md={7}>
						<Box style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
							<Card>
								<HeadingCardDetail>
									<CottageOutlinedIcon
										style={{ fontSize: '32px', color: 'rgb(247, 52, 134)', fontWeight: 'bold' }}
									/>
									{t('Room.room_info')}
								</HeadingCardDetail>
								<RoomDetailContent container spacing="20px">
									<RoomDetailInfo
										label={t('Room.status')}
										value="Hết phòng"
										xs={4}
										md={3}
										highlight="unactive"
									/>
									<RoomDetailInfo
										label={t('Room.room_rates')}
										value={RoomData?.data?.basePrice.toLocaleString() + ' đồng'}
										xs={4}
										md={3}
									/>
									<RoomDetailInfo
										label={t('Room.acreage')}
										value={RoomData?.data?.acreage + ' mét vuông'}
										xs={4}
										md={3}
									/>
									<RoomDetailInfo
										label={t('Room.deposit')}
										value={RoomData?.data?.deposit.toLocaleString() + ' đồng' || 'Đang cập nhập'}
										xs={4}
										md={3}
									/>
									<RoomDetailInfo
										label={t('Room.capacity')}
										value={
											RoomData?.data.totalNbPeople +
											' ' +
											(RoomData?.data?.gender === 'All' ? ' Nam hoặc Nữ' : RoomData?.data?.gender)
										}
										xs={4}
										md={3}
									/>
									<RoomDetailInfo label={t('Room.electricity')} value="500,000 đồng" xs={4} md={3} />
									<RoomDetailInfo
										label={t('Room.electricity')}
										value={
											typeOfRoom.find((item) => item?.value === RoomData?.data?.typeRoom)
												?.label || 'Phòng cho thuê'
										}
										xs={4}
										md={3}
									/>
									<RoomDetailInfo
										label={t('Room.address')}
										value={RoomData?.data?.address?.fullText || 'Upadating...'}
									/>
								</RoomDetailContent>
							</Card>

							<Card>
								<HeadingCardDetail>
									<DeckIcon
										style={{ fontSize: '32px', color: 'rgb(13, 191, 226)', fontWeight: 'bold' }}
									/>
									{t('Room.utilities')}
								</HeadingCardDetail>

								<RoomDetailContent
									container
									style={{ fontSize: '16px', color: '#333333', fontWeight: 'normal' }}
									spacing="24px"
								>
									{RoomData?.data?.amentilities.map((item) => (
										<RoomDetail.Utiliti key={item} label={item} icon={getIcon(item)} />
									))}
								</RoomDetailContent>
							</Card>

							<Card>
								<HeadingCardDetail>
									<ErrorIcon
										style={{ fontSize: '32px', color: 'rgb(139, 87, 42)', fontWeight: 'bold' }}
									/>
									{t('Room.More_description')}
								</HeadingCardDetail>
								<p
									style={{ paddingTop: '10px' }}
									dangerouslySetInnerHTML={{
										__html: RoomData?.data?.description || 'Không có mô tả',
									}}
								/>
							</Card>
						</Box>
					</Grid>

					<Grid item xs={12} md={5}>
						<RoomDetail.InfoOfMaster
							dataOwner={RoomData?.data?.owner}
							postDate={RoomData?.data?.createdAt}
						/>
					</Grid>
				</DetailRoom>
			</HomePageContent>

			<Modal
				style={{ overflow: 'hidden', boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' }}
				open={isShowContract}
				onClose={() => setIsShowContract(false)}
				closeAfterTransition
			>
				<Fade in={isShowContract}>
					<ModalContract className="parent">
						{showStep === 'Term' && (
							<>
								<div
									dangerouslySetInnerHTML={{
										__html: getContractTerm(),
									}}
									style={{ padding: '40px 20px' }}
								/>
								<StyledAcceptTerm>
									<StyledCheckBox
										type="checkbox"
										id="term"
										checked={isAcceptTerm}
										onChange={() => setIsAcceptTerm((pre) => !pre)}
									/>
									<StyledLabelAcceptTerm htmlFor="term">
										{t('Room.Accept_terms')}
									</StyledLabelAcceptTerm>

									{isAcceptTerm && (
										<StyledButtonAcceptTerm
											variant="contained"
											onClick={() => setShowStep('Contract')}
										>
											{t('Room.Continue')}
										</StyledButtonAcceptTerm>
									)}
								</StyledAcceptTerm>
							</>
						)}

						{showStep === 'Contract' && (
							<>
								<div
									dangerouslySetInnerHTML={{
										__html: getContract({}),
									}}
								/>

								<SignName container>
									<SignNameItem item xs={6}>
										<Box className="headingSign">
											<h6 style={{ fontSize: '20px' }}>BÊN CHO THUÊ</h6>
											(Ký và ghi rõ họ tên)
										</Box>
										<Box className="signContent">
											<p>Bảo</p>
											<p>Đoàn Ngọc Quốc Bảo</p>
										</Box>
									</SignNameItem>

									<SignNameItem item xs={6}>
										<Box className="headingSign">
											<h6 style={{ fontSize: '20px' }}>BÊN THUÊ</h6>
											(Ký và ghi rõ họ tên)
										</Box>
										<Box className="signContent">
											{isSign ? (
												<>
													<p>Bảo</p>
													<p>Đoàn Ngọc Quốc Bảo</p>
												</>
											) : (
												<button onClick={() => setShowModalOTP(true)}>
													Bấm vào đây để ký tên
												</button>
											)}
										</Box>
									</SignNameItem>
								</SignName>
							</>
						)}

						<Modal open={showModalOTP} onClose={() => setShowModalOTP(false)}>
							<ModalContract
								style={{
									width: 400,
									background: 'white',
									textAlign: 'center',
									height: 'auto',
									paddingBottom: 20,
								}}
							>
								<h3>Xác thực OTP!</h3>
								<p style={{ fontSize: 14 }}> Chúng tôi đã gửi 1 mã OTP đến mail của bạn !!! </p>
								<TextField style={{ width: '100%', margin: '20px 0' }} label="Mã OTP" />
								<Button variant="outlined" style={{ marginRight: 10 }}>
									Gửi lại OTP
								</Button>
								<Button variant="outlined" onClick={handleComfirmOTP}>
									Xác nhận
								</Button>
							</ModalContract>
						</Modal>
					</ModalContract>
				</Fade>
			</Modal>

			<Modal open={showStep === 'Pyament'} onClose={handleClosePayment}>
				<StyledModalPayment>
					<StyledHeadingPayment>Chọn phương thức thanh toán</StyledHeadingPayment>

					<StyledListPayment>
						<StyledItemListPayment>
							<span className="item-left">
								<img
									src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Icon-VNPAY-QR.png"
									alt="logo vnpay"
								/>
								Ví Bughouse
							</span>
						</StyledItemListPayment>
						<StyledItemListPayment>
							<span className="item-left">
								<img
									src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Icon-VNPAY-QR.png"
									alt="logo vnpay"
								/>
								VNPay
							</span>
						</StyledItemListPayment>
					</StyledListPayment>

					<Button>Thanh toán</Button>
				</StyledModalPayment>
			</Modal>
		</WrapperBackground>
	)
}

interface IProps {
	label: string
	xs?: number
	md?: number
	icon: React.ReactNode
}

RoomDetail.Utiliti = ({ label, xs = 4, md = 3, icon }: IProps) => {
	return (
		<RoomUtiliti item xs={xs} md={md}>
			{icon}
			<span>{label}</span>
		</RoomUtiliti>
	)
}

RoomDetail.InfoOfMaster = ({ dataOwner, postDate }: IpropsRoomMaster) => {
	const { t } = useTranslation()

	return (
		<Card>
			<HeadingCardDetail>
				<PersonIcon style={{ fontSize: '32px', color: 'rgb(72, 119, 248)', fontWeight: 'bold' }} />
				{t('Room.room_owner_information')}
			</HeadingCardDetail>

			<StyledInfoOfOwner>
				<div className="img">
					<img src={`https://api.multiavatar.com/${randomId()}.png`} />
				</div>
				<div className="main-content">
					<p>{dataOwner?.name || 'Đang cập nhập'}</p>
					<p>
						<span> {dataOwner?.phone || '+84911336236'} </span>
					</p>
				</div>
				<div
					style={{
						paddingLeft: '24px',
					}}
				>
					{t('Room.Date_post')}:<p>{new Date(postDate || '')?.toLocaleDateString() || ''}</p>
				</div>
			</StyledInfoOfOwner>
		</Card>
	)
}

RoomDetail.Carousel = memo(({ itemData }: { itemData: string[] }) => {
	return (
		<Swiper
			modules={[Autoplay, Pagination, EffectCoverflow]}
			spaceBetween={50}
			effect="coverflow"
			slidesPerView={1}
			scrollbar={{ draggable: true }}
			loop
			autoplay={{
				delay: 3500,
				disableOnInteraction: false,
			}}
			pagination={{ clickable: true }}
			className="cc_swiper_wrapper"
		>
			{itemData.map((item) => (
				<SwiperSlide
					key={randomId()}
					style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
				>
					<img src={item} alt={item} />
				</SwiperSlide>
			))}
		</Swiper>
	)
})
