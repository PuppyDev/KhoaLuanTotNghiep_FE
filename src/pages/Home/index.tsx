import RoomItem from '@/components/common/Room/RoomItem'
import { randomId } from '@/utils/index'
import { encode } from '@/utils/super-function'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser'
import { Grid } from '@mui/material'
import Typography from '@mui/material/Typography'
import { Box } from '@mui/system'
import { debounce } from 'lodash'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import {
	ContentBanner,
	HeadingBanner,
	HomeBanner,
	HomePageContent,
	ListRoom,
	NewRoom,
	RoomItemHeading,
	RoomSection,
	SearchBanner,
	SearchFeature,
	SearchLocation,
	SearchResult,
	SearchResultItem,
	SearchResultNoData,
	TrendingHeader,
	TrendingItem,
	TrendingList,
	TrendingSearch,
	VerifiAccount,
	WrapperBackground,
	WrapperBanner,
} from './HomeStyles'

const Home = () => {
	const [searchKeyWord, setSearchKeyWord] = useState('')
	const [resultSearch, setResultSearch] = useState<string[]>([])

	useEffect(() => {
		if (searchKeyWord.trim().length === 0) setResultSearch([])
		else {
			// call API here
			// setResultSearch(['binhthanh'])
		}
	}, [searchKeyWord])

	const { t } = useTranslation()

	return (
		<>
			<HomeBanner>
				<WrapperBanner>
					<ContentBanner>
						<HeadingBanner>{t('Home.solgan')}</HeadingBanner>

						<SearchBanner>
							<SearchLocation>
								<LocationOnIcon style={{ color: 'rgb(247, 52, 134)' }} />
								<span style={{ fontSize: '18px', fontWeight: '600' }}>HCM</span>
							</SearchLocation>

							<SearchFeature
								placeholder={
									t('Home.search_placeholder') || 'Tìm kiếm theo địa điểm, quận, tên đường,...'
								}
								onChange={debounce((e) => {
									setSearchKeyWord(e.target.value)
								}, 500)}
							/>

							<SearchResult>
								{resultSearch.length > 0 &&
									resultSearch.map((item) => (
										<SearchResultItem key={randomId()} to={encode(item)}>
											Quận 1
										</SearchResultItem>
									))}
								{resultSearch.length === 0 && searchKeyWord.trim().length > 0 && (
									<SearchResultNoData>{t('Home.search_result')}</SearchResultNoData>
								)}
							</SearchResult>
						</SearchBanner>
					</ContentBanner>
				</WrapperBanner>
			</HomeBanner>

			<WrapperBackground>
				<HomePageContent>
					<TrendingSearch>
						<TrendingHeader>{t('Home.search_trends')}</TrendingHeader>
						<TrendingList>
							<TrendingItem>
								<Link to={'/search/' + encode('binhthanh')}>Bình Thạnh</Link>
							</TrendingItem>
							<TrendingItem>
								<Link to={'/search/' + encode('quan10')}>Quận 10</Link>
							</TrendingItem>
							<TrendingItem>
								<Link to={'/search/' + encode('quan1')}>Quận 1</Link>
							</TrendingItem>
							<TrendingItem>
								<Link to={'/search/' + encode('quan7')}>Quận 7</Link>
							</TrendingItem>
							<TrendingItem>
								<Link to={'/search/' + encode('thuduc')}>Thủ Đức</Link>
							</TrendingItem>
							<TrendingItem>
								<Link to={'/search/' + encode('quan3')}>Quận 3</Link>
							</TrendingItem>
						</TrendingList>
					</TrendingSearch>

					<RoomSection container spacing="40px">
						<Grid item xs={12} md={8}>
							<NewRoom>
								<Typography className="heading">{t('Home.new_room')}</Typography>

								<ListRoom>
									<RoomItem to="/room/1"></RoomItem>
									<RoomItem to="/room/12"></RoomItem>
									<RoomItem to="/room/13"></RoomItem>
								</ListRoom>

								<Box
									style={{
										textAlign: 'center',
										paddingTop: '24px',
									}}
								>
									<Link
										to="/"
										style={{
											color: '#4877f8',
											lineHeight: '24px',
											textDecoration: 'unset',
											fontWeight: '600',
										}}
									>
										{t('Home.see_all')}
									</Link>
								</Box>
							</NewRoom>
						</Grid>

						<Grid item xs={12} md={4}>
							<VerifiAccount>
								<div className="heading">
									<VerifiedUserIcon style={{ fontSize: '32px', color: 'rgb(72, 119, 248)' }} />
									{t('Home.verified')}
								</div>

								<Box className="verifiContent">
									<img
										src="https://bayleaf.s3.ap-southeast-1.amazonaws.com/property-images/fa7d4c8e-692e-4cc7-bf85-0fcad740b16c/2b271aa2-779e-4bb3-b9dc-0a730084fc22-46325561_1975119655915194_6045991570992267264_n.jpg"
										style={{
											width: '100%',
											maxHeight: '180px',
											objectFit: 'cover',
											borderRadius: '8px',
										}}
									/>
									<RoomItemHeading>Ký túc xá quận Thủ Đức</RoomItemHeading>

									<Box
										style={{
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'space-between',
											marginTop: '30px',
										}}
									>
										<span>Quận thủ đức</span>

										<span style={{ fontSize: '16px', color: '#F73486' }}>1,5 tr/{t('person')}</span>
									</Box>
								</Box>
							</VerifiAccount>
						</Grid>
					</RoomSection>
				</HomePageContent>
			</WrapperBackground>
		</>
	)
}

export default Home
