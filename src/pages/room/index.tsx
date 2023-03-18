import Card from '@/components/common/Card'
import RoomDetailInfo from '@/components/common/Room/RoomDetailInfo'
import { StyledInfoOfOwner } from '@/components/common/Room/styles/RoomItemStyles'
import { getContract, getContractTerm } from '@/utils/contract'
import { getIcon } from '@/utils/icon'
import { itemData, randomId } from '@/utils/index'
import CottageOutlinedIcon from '@mui/icons-material/CottageOutlined'
import DeckIcon from '@mui/icons-material/Deck'
import ErrorIcon from '@mui/icons-material/Error'
import PersonIcon from '@mui/icons-material/Person'
import { Box, Button, Fade, Grid, Modal, TextField, Typography } from '@mui/material'
import { HomePageContent, WrapperBackground } from 'pages/Home/HomeStyles'
import { memo, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
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
	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])

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
	return (
		<WrapperBackground>
			<HomePageContent style={{ paddingTop: '32px' }}>
				<RoomDetailGallary>
					<RoomDetail.Carousel itemData={itemData || []} />
				</RoomDetailGallary>

				<HeadingRoomBlock>
					<Typography className="headingRoom">Room for rent Hoàng Hoa Thám, Quận Bình Thạnh</Typography>
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
									<RoomDetailInfo label={t('Room.room_rates')} value="1,500,000 đồng" xs={4} md={3} />
									<RoomDetailInfo label={t('Room.acreage')} value="30 mét vuông" xs={4} md={3} />
									<RoomDetailInfo label={t('Room.deposit')} value="1 tháng" xs={4} md={3} />
									<RoomDetailInfo label={t('Room.capacity')} value="8 Nam hoặc Nữ" xs={4} md={3} />
									<RoomDetailInfo label={t('Room.electricity')} value="500,000 đồng" xs={4} md={3} />
									<RoomDetailInfo
										label={t('Room.address')}
										value="214B Nguyễn Trãi, Phường Nguyễn Cư Trinh, Quận 1, Hồ Chí Minh"
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
									<RoomDetail.Utiliti label="Máy lạnh" icon={getIcon('Máy lạnh')} />
									<RoomDetail.Utiliti label="Chỗ để xe" icon={getIcon('Chỗ để xe')} />
									<RoomDetail.Utiliti label="Wifi" icon={getIcon('Wifi')} />
									<RoomDetail.Utiliti label="Tự do" icon={getIcon('Tự do')} />
									<RoomDetail.Utiliti label="Chủ riêng" icon={getIcon('Chủ riêng')} />
									<RoomDetail.Utiliti label="Tủ lạnh" icon={getIcon('Tủ lạnh')} />
								</RoomDetailContent>
							</Card>

							<Card>
								<HeadingCardDetail>
									<ErrorIcon
										style={{ fontSize: '32px', color: 'rgb(139, 87, 42)', fontWeight: 'bold' }}
									/>
									{t('Room.More_description')}
								</HeadingCardDetail>
								<p style={{ paddingTop: '10px' }}>
									Chính chủ cho thuê phòng dịch vụ đường Hoàng Hoa Thám kv Bình Thạnh. Giá 3,5tr - 5tr
									Tiện nghi: Có máy giặt, máy lạnh, máy nước nóng lạnh, tủ, bếp từ, giường niệm, bàn
									ghế làm việc, tủ lạnh, bồn tắm rất sạch sẽ. Phòng có cửa sổ rất thoáng mát. Thuận
									tiện: gần hàng xanh, trường đại học Hurtech, Hồng Bàng, bv Ung Bướu, gia định.. xung
									quanh có nhiều quán cf, quán ăn, Trung tâm thể dục, công viên, cty.... Đi ra Quận 1,
									gò Vấp, Phú Nhuận chỉ 5 phút. Hình thật.
								</p>
							</Card>
						</Box>
					</Grid>

					<Grid item xs={12} md={5}>
						<RoomDetail.InfoOfMaster />
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
										__html: getContract({ dataRoom: { basePrice: 100000000, deposit: 1000000 } }),
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

						{showStep === 'Pyament' && <div>Payment đây nè</div>}

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

RoomDetail.InfoOfMaster = () => {
	const { t } = useTranslation()

	return (
		<Card>
			<HeadingCardDetail>
				<PersonIcon style={{ fontSize: '32px', color: 'rgb(72, 119, 248)', fontWeight: 'bold' }} />
				{t('Room.room_owner_information')}
			</HeadingCardDetail>

			<StyledInfoOfOwner>
				<img src="https://s120-ava-talk.zadn.vn/b/0/e/1/3/120/0b5ff51a67c76afa07881797aa577241.jpg" />

				<div className="main-content">
					<p>Thanh Quang</p>
					<p>
						{t('Room.Phone')}: <span>0344333145 </span>
					</p>
				</div>

				<div
					style={{
						paddingLeft: '24px',
					}}
				>
					{t('Room.Date_post')}:<p>10-02-2023</p>
				</div>
			</StyledInfoOfOwner>
		</Card>
	)
}

RoomDetail.Carousel = memo(({ itemData }: { itemData: { img: string; title: string }[] }) => {
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
					<img src={item.img} alt={item.title} />
				</SwiperSlide>
			))}
		</Swiper>
	)
})
