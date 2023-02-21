import Card from '@/components/common/Card'
import RoomDetailInfo from '@/components/common/Room/RoomDetailInfo'
import { getContract, getContractTerm } from '@/utils/contract'
import { getIcon } from '@/utils/icon'
import { itemData, randomId } from '@/utils/index'
import CottageOutlinedIcon from '@mui/icons-material/CottageOutlined'
import DeckIcon from '@mui/icons-material/Deck'
import ErrorIcon from '@mui/icons-material/Error'
import PersonIcon from '@mui/icons-material/Person'
import { Box, Fade, Grid, Modal, Typography } from '@mui/material'
import { HomePageContent, WrapperBackground } from 'pages/Home/HomeStyles'
import { useEffect, useState } from 'react'
import { Autoplay, EffectCoverflow, Pagination } from 'swiper'
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
} from './styles/RoomDetail'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'

export default function RoomDetail() {
	const [isShowContract, setIsShowContract] = useState(false)

	const [showStep, setShowStep] = useState<'Term' | 'Contract' | 'Pyament'>('Term')

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])

	const [isAcceptTerm, setIsAcceptTerm] = useState(false)
	return (
		<WrapperBackground>
			<HomePageContent style={{ paddingTop: '32px' }}>
				<RoomDetailGallary>
					<RoomDetail.Carousel />
				</RoomDetailGallary>

				<HeadingRoomBlock>
					<Typography className="headingRoom">Room for rent Hoàng Hoa Thám, Quận Bình Thạnh</Typography>
					<ButtonRent onClick={() => setIsShowContract(true)}>Thuê ngay</ButtonRent>
				</HeadingRoomBlock>

				<DetailRoom container spacing="32px">
					<Grid item xs={12} md={7}>
						<Box style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
							<Card>
								<HeadingCardDetail>
									<CottageOutlinedIcon
										style={{ fontSize: '32px', color: 'rgb(247, 52, 134)', fontWeight: 'bold' }}
									/>
									Thông tin phòng
								</HeadingCardDetail>
								<RoomDetailContent container spacing="20px">
									<RoomDetailInfo
										label="Trạng Thái"
										value="Hết phòng"
										xs={4}
										md={3}
										highlight="unactive"
									/>
									<RoomDetailInfo label="GIÁ PHÒNG" value="1,500,000 đồng" xs={4} md={3} />
									<RoomDetailInfo label="DIỆN TÍCH" value="30 mét vuông" xs={4} md={3} />
									<RoomDetailInfo label="ĐẶT CỌC" value="1 tháng" xs={4} md={3} />
									<RoomDetailInfo label="SỨC CHỨA" value="8 Nam hoặc Nữ" xs={4} md={3} />
									<RoomDetailInfo label="ĐIỆN" value="500,000 đồng" xs={4} md={3} />
									<RoomDetailInfo
										label="ĐIẠ CHỈ"
										value="214B Nguyễn Trãi, Phường Nguyễn Cư Trinh, Quận 1, Hồ Chí Minh"
									/>
								</RoomDetailContent>
							</Card>

							<Card>
								<HeadingCardDetail>
									<DeckIcon
										style={{ fontSize: '32px', color: 'rgb(13, 191, 226)', fontWeight: 'bold' }}
									/>
									Tiện ích
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
									Mô tả thêm
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
					<ModalContract>
						{showStep === 'Term' && (
							<>
								<div
									dangerouslySetInnerHTML={{
										__html: getContractTerm(),
									}}
									style={{ padding: '40px 20px' }}
								/>
								<div
									style={{
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										gap: '10px',
										marginBottom: '-20px',
									}}
								>
									<input type="checkbox" id="term" onChange={() => setIsAcceptTerm((pre) => !pre)} />
									<label style={{ userSelect: 'none' }} htmlFor="term">
										Chấp nhận điều khoản
									</label>
									{isAcceptTerm && <button onClick={() => setShowStep('Contract')}>Tiếp tục</button>}
								</div>
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
										<p>Bấm vào đây để ký tên</p>
									</SignNameItem>
								</SignName>
							</>
						)}

						{showStep === 'Pyament' && <div>Payment đây nè</div>}

						{/* Button */}
					</ModalContract>
				</Fade>
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
	return (
		<Card>
			<HeadingCardDetail>
				<PersonIcon style={{ fontSize: '32px', color: 'rgb(72, 119, 248)', fontWeight: 'bold' }} />
				Thông tin chủ phòng
			</HeadingCardDetail>

			<Box style={{ marginTop: '24px', gap: '8px', display: 'flex', alignItems: 'flex-end' }}>
				<img
					style={{
						width: '60px',
						height: '60px',
						objectFit: 'cover',
						borderRadius: '30px',
					}}
					src="https://s120-ava-talk.zadn.vn/b/0/e/1/3/120/0b5ff51a67c76afa07881797aa577241.jpg"
				/>

				<div style={{ borderRight: '1px solid #CDCDCD', paddingRight: '24px' }}>
					<p>Thanh Quang</p>
					<p>
						SĐT: <span>0344333145 </span>
					</p>
				</div>

				<div
					style={{
						paddingLeft: '24px',
					}}
				>
					Ngày đăng:
					<p>10-02-2023</p>
				</div>
			</Box>
		</Card>
	)
}

RoomDetail.Carousel = () => {
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
}
