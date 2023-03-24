import { addressApi } from '@/api/addressApi'
import { commonApi } from '@/api/index'
import { roomApi } from '@/api/roomApi'
import EditorBase from '@/components/common/Input/Editor'
import { typeGender, typeOfRoom } from '@/constants/room'
import { schemaFormCreateRoom } from '@/schemas/form'
import { getContract } from '@/utils/contract'
import { getPathNameAfterSlah, randomId } from '@/utils/index'
import ShowNostis from '@/utils/show-noti'
import { decode } from '@/utils/super-function'
import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import { Box, Button, Checkbox, Grid, ListItemIcon, ListItemText, MenuItem, Select, TextField } from '@mui/material'
import Typography from '@mui/material/Typography/Typography'
import { useQuery } from '@tanstack/react-query'
import { Editor } from '@tinymce/tinymce-react'
import axios, { AxiosResponse } from 'axios'
import { HomePageContent, WrapperBackground } from 'pages/Home/HomeStyles'
import { PropsWithChildren, useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useLocation, useSearchParams } from 'react-router-dom'
import { DisplayResultImages, FileManager, GroupButton } from './styles/AddRoomStyle'

export type FormValues = {
	name?: string
	acreage?: number
	basePrice?: number
	deposit?: number
	images?: any
	roomElectric?: number
	totalNbPeople?: number
	period?: number
	amentilities?: string[]
	address?: string
	contract?: string
	waterPrice?: number
	gender?: string
	nbCurrentPeople?: number
	plusContract?: string
	ditrictName?: string
	cityName?: string
	typeRoom: string
	addressDetail: string
	internetCost: string
	wardName: string
	streetName: string
	roomAttachment?: {
		url: string
	}
}

const AddRoom = () => {
	const {
		handleSubmit,
		control,
		setValue,
		getValues,
		formState: { errors, isValid },
	} = useForm<FormValues>({
		defaultValues: {
			totalNbPeople: 1,
			period: 1,
			amentilities: [],
			contract: getContract({}),
			ditrictName: 'Quận 1',
			cityName: 'Hồ Chí Minh',
			gender: 'All',
			typeRoom: 'ROOM_FOR_RENT',
			nbCurrentPeople: 0,
			wardName: '',
			streetName: '',
		},
		resolver: yupResolver(schemaFormCreateRoom),
	})
	const [isEdit, setIsEdit] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const location = useLocation()
	const [searchParams] = useSearchParams()
	const { t } = useTranslation()

	useEffect(() => {
		// Edit Room handle here
		if (location.pathname !== '/room/addroom') {
			const keySearch = decode(getPathNameAfterSlah(location.pathname))
			setIsEdit(true)
			getInfoOfRoom()
		}
	}, [location])

	const getInfoOfRoom = async () => {
		try {
			console.log('dang fetch data .... ')
		} catch (error) {
			ShowNostis.error('Có lỗi gì đó gòi bạn êy')
		}
	}

	const { data: dataDistric } = useQuery({
		queryKey: ['getAllDistrics'],
		queryFn: () => addressApi.getAllDistrics(),
		staleTime: Infinity,
	})

	const [districtName, setDistrictName] = useState(getValues('ditrictName') || 'Quận 1')
	const { data: dataWards } = useQuery({
		queryKey: ['getAllWards', districtName],
		queryFn: () => addressApi.getAllWards(districtName || 'Quận 1'),
		staleTime: Infinity,
	})
	const { data: dataNameDistricts } = useQuery({
		queryKey: ['getAllNameDistricts', districtName],
		queryFn: () => addressApi.getAllStreets(districtName || 'Quận 1'),
		staleTime: Infinity,
	})

	const onDrop = useCallback((acceptedFiles: any) => {
		setValue('images', acceptedFiles)
		// Do something with the files
	}, [])
	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

	const handelSubmitRoom = async (values: any) => {
		setIsLoading(true)
		try {
			const { images } = values

			const formData = new FormData()
			for (let i = 0; i < images?.length; i++) {
				formData.append('images', images[i])
			}

			if (images && images?.length > 0) {
				const response = await axios.post('http://localhost:8000/bh/images/upload', formData)
				handleCreateRoom(values, response)
			} else {
				handleCreateRoom(values, { data: { imageLinks: [''] } })
			}
		} catch (error) {
			console.log(error)
			setIsLoading(false)
		}
	}

	const handleCreateRoom = async (values: any, response: any) => {
		values.roomAttachment = { url: response?.data.imageLinks }
		values.contract = ''
		values.services = [
			{
				name: 'internet cost',
				description: 'internet, wifi cost per month',
				basePrice: values.internetCost,
				unitName: 'person(s)/month',
			},
			{
				name: 'electricity cost',
				description: 'power cost per month',
				basePrice: values.roomElectric,
				unitName: 'kWh',
			},
			{
				name: 'water cost',
				description: 'water cost per month',
				basePrice: values.waterPrice,
				unitName: 'person(s)/month',
			},
		]

		try {
			const response = await roomApi.createRoom(values)
			console.log('🚀 ~ file: AddRoom.tsx:139 ~ handleCreateRoom ~ response:', response)

			ShowNostis.success('Create a room successfully!!!')

			setIsLoading(false)
		} catch (error) {
			console.log(error)
			setIsLoading(false)
		}
	}

	return (
		<WrapperBackground className="min__height90">
			<HomePageContent>
				<p className="heading__homepage">{isEdit ? t('Room.Upadate_info') : t('Room.Create_room')}</p>

				<form onSubmit={handleSubmit(handelSubmitRoom)}>
					<Grid container spacing={2}>
						<Grid item xs={12} container spacing={2}>
							<AddRoom.InputFeild
								label={t('Room.Title_room')}
								name="name"
								control={control}
								error={errors.name?.message || null}
							/>
							<AddRoom.InputFeild
								label={t('Room.Acreage')}
								name="acreage"
								control={control}
								error={errors.acreage?.message || null}
							/>
							<AddRoom.InputFeild
								label={t('Room.Room_price')}
								name="basePrice"
								control={control}
								error={errors.basePrice?.message || null}
							/>
							<AddRoom.InputFeild
								label={t('Room.Deposit')}
								name="deposit"
								control={control}
								error={errors.deposit?.message || null}
							/>
						</Grid>

						<Grid item xs={12} container spacing={2}>
							<AddRoom.InputFeild
								label={t('Room.electricity_bill')}
								name="roomElectric"
								control={control}
								error={errors.roomElectric?.message || null}
							/>

							<AddRoom.InputFeild
								label={t('Room.internetCost')}
								name="internetCost"
								control={control}
								error={errors.roomElectric?.message || null}
							/>

							<AddRoom.InputFeild
								label={t('Room.water_money')}
								name="waterPrice"
								control={control}
								error={errors.waterPrice?.message || null}
							/>

							<AddRoom.SelectList
								control={control}
								defaultValue="1"
								name="period"
								label={t('Room.Period')}
							>
								{[...Array(24).keys()].map((item) => (
									<MenuItem value={item + 1} key={randomId()}>
										{item + 1}
									</MenuItem>
								))}
							</AddRoom.SelectList>
						</Grid>

						<AddRoom.SelectList
							control={control}
							defaultValue="1"
							name="totalNbPeople"
							label={t('Room.Total_people')}
							md={4}
						>
							{[...Array(10).keys()].map((item) => (
								<MenuItem value={item + 1} key={randomId()}>
									{item + 1}
								</MenuItem>
							))}
						</AddRoom.SelectList>

						<AddRoom.SelectList
							control={control}
							name="nbCurrentPeople"
							label={t('Room.Current_people')}
							md={4}
						>
							{[...Array(10).keys()].map((item) => (
								<MenuItem value={item} key={randomId()}>
									{item}
								</MenuItem>
							))}
						</AddRoom.SelectList>

						<AddRoom.MultipleSelect
							control={control}
							name="amentilities"
							label={t('Room.Amentilities')}
							md={4}
							setValue={(amentilitieValue: string[]) => {
								setValue('amentilities', amentilitieValue)
							}}
						/>

						{/* Address Street */}
						<AddRoom.SelectList control={control} name="cityName" label={t('USER.City')}>
							<MenuItem value="Hồ Chí Minh">Hồ Chí Minh</MenuItem>
						</AddRoom.SelectList>

						<AddRoom.SelectList control={control} name="ditrictName" label={t('Room.Distric')}>
							{dataDistric &&
							dataDistric.data &&
							dataDistric.data.listDitrict &&
							dataDistric.data.listDitrict.length > 0 ? (
								dataDistric?.data.listDitrict.map((item) => (
									<MenuItem value={item} key={randomId()} onClick={() => setDistrictName(item)}>
										{item}
									</MenuItem>
								))
							) : (
								<MenuItem value={'Quận 1'} key={randomId()}>
									Quận 1
								</MenuItem>
							)}
						</AddRoom.SelectList>

						<AddRoom.SelectList control={control} name="wardName" label="Phường/ Ấp">
							{dataWards && dataWards.data && dataWards.data.wards && dataWards.data.wards.length > 0 ? (
								dataWards?.data.wards.map((item) => (
									<MenuItem value={item} key={randomId()}>
										{item}
									</MenuItem>
								))
							) : (
								<MenuItem value={'Phường 1'} key={randomId()}>
									Phường 1
								</MenuItem>
							)}
						</AddRoom.SelectList>

						<AddRoom.SelectList control={control} name="streetName" label="Tên đường">
							{dataNameDistricts &&
							dataNameDistricts.data &&
							dataNameDistricts.data.streets &&
							dataNameDistricts.data.streets.length > 0 ? (
								dataNameDistricts?.data.streets.map((item) => (
									<MenuItem value={item} key={randomId()}>
										{item}
									</MenuItem>
								))
							) : (
								<MenuItem value={'Phường 1'} key={randomId()}>
									Phường 1
								</MenuItem>
							)}
						</AddRoom.SelectList>

						<AddRoom.InputFeild
							label={t('Room.apartment_number')}
							name="addressDetail"
							control={control}
							md={4}
							error={errors.addressDetail?.message || null}
						/>

						{/* Sex  */}
						<AddRoom.SelectList control={control} name="gender" label={t('USER.Gender')} md={4}>
							{typeGender.map((item) => (
								<MenuItem value={item.value} key={randomId()}>
									{item.label}
								</MenuItem>
							))}
						</AddRoom.SelectList>

						{/* Type Of Room   */}
						<AddRoom.SelectList control={control} name="typeRoom" label={t('Room.TypeRoom')} md={4}>
							{typeOfRoom.map((room) => (
								<MenuItem value={room.value} key={randomId()}>
									{room.label}
								</MenuItem>
							))}
						</AddRoom.SelectList>

						{/* Image Room  */}
						<Grid item xs={12} container spacing={2}>
							<AddRoom.FilesMange
								label={t('Room.add_images')}
								name="images"
								md={6}
								xs={12}
								control={control}
							>
								<FileManager className={`${isDragActive && 'active'}`} {...getRootProps()}>
									<input
										type="file"
										accept="image/png, image/gif, image/jpeg"
										multiple
										hidden
										id="images"
										{...getInputProps()}
									/>

									{isDragActive ? (
										<p>{t('Room.post_images')}</p>
									) : (
										<>
											<p>{t('Room.drag_click_images')}</p>
											{getValues('images')?.length > 0 && (
												<p>
													{t('Room.selected')} {getValues('images')?.length}{' '}
													{t('Room.images')}{' '}
												</p>
											)}
										</>
									)}
								</FileManager>
							</AddRoom.FilesMange>

							<AddRoom.TextArea
								label={t('Room.details_description')}
								name="description"
								md={6}
								xs={12}
								control={control}
							/>

							<DisplayResultImages item xs={6}>
								{getValues('images')?.length > 0 &&
									getValues('images').map((item: any) => <span key={item.path}>{item.name}</span>)}
							</DisplayResultImages>
						</Grid>
					</Grid>

					<EditorBase disabled control={control} name="contract" />

					<Editor
						id={randomId()}
						initialValue="Thêm Điều Khoản"
						onEditorChange={(values) => setValue('plusContract', values)}
						disabled={!!searchParams.get('isRented')}
						apiKey={import.meta.env.VITE_TINY_API}
					/>

					<GroupButton>
						<LoadingButton loading={isLoading} disabled={isLoading} variant="contained" type="submit">
							{isEdit ? t('Room.update_room') : t('Room.create_room')}
						</LoadingButton>
					</GroupButton>
				</form>
			</HomePageContent>
		</WrapperBackground>
	)
}

interface IProps extends PropsWithChildren {
	name: string
	defaultValue?: string
	control: any
	label: string
	error?: string | null
	xs?: number
	md?: number
	setValue?: any
}

AddRoom.InputFeild = (props: IProps) => {
	const { name, defaultValue = '', control, label, error, xs = 12, md = 3 } = props
	const {} = useForm
	return (
		<Grid item md={md} xs={xs} sx={{ width: '100%' }}>
			<Typography variant="body1" color={`${error ? '#DB1E1E' : '#84878B'}`} fontWeight="bold">
				{label} <span style={{ color: '#DB1E1E' }}>*</span>
			</Typography>

			<Controller
				control={control}
				name={name}
				render={({ field: { onChange, onBlur, value } }) => (
					<Box
						style={{
							width: '100%',
							border: '1px solid ',
							borderRadius: 10,
							overflow: 'hidden',
							marginTop: '5px',
							borderColor: error ? '#DB1E1E' : '#DEDFE1',
						}}
					>
						<input
							type="text"
							style={{
								outline: 'none',
								fontSize: 14,
								border: 'none',
								padding: '15px',
								width: '100%',
								flex: '1 1 0',
							}}
							defaultValue={defaultValue}
							onChange={onChange}
							onBlur={onBlur}
						/>
					</Box>
				)}
			/>

			{error && <i style={{ fontSize: '14px', color: '#DB1E1E', fontWeight: '600' }}>{error}</i>}
		</Grid>
	)
}

AddRoom.SelectList = (props: IProps) => {
	const { name, control, label, xs = 12, md = 3, children, defaultValue } = props

	return (
		<Grid item md={md} xs={xs} sx={{ width: '100%' }}>
			<Typography variant="body1" color="#84878B" fontWeight="bold">
				{label}
			</Typography>
			<Controller
				control={control}
				name={name}
				render={({ field }) => (
					<Select
						{...field}
						sx={{
							width: '100%',
							height: '50px',
							outline: 'none',
							background: '#fff',
						}}
						defaultValue={defaultValue}
					>
						{children}
					</Select>
				)}
			/>
		</Grid>
	)
}

AddRoom.OptionItem = ({ value }: { value: string }) => {
	return <MenuItem value={value}>{value}</MenuItem>
}

AddRoom.TextArea = (props: IProps) => {
	const { name, control, label, xs = 12, md = 3 } = props
	return (
		<Grid item md={md} xs={xs} sx={{ width: '100%' }}>
			<Typography variant="body1" color="#84878B" fontWeight="bold">
				{label}
			</Typography>
			<Controller
				control={control}
				name={name}
				render={({ field: { onChange, onBlur } }) => (
					<TextField
						multiline
						rows={6}
						sx={{ width: '100%', background: '#fff' }}
						name={name}
						onChange={onChange}
						onBlur={onBlur}
					/>
				)}
			/>
		</Grid>
	)
}

AddRoom.FilesMange = (props: IProps) => {
	const { name, control, label, xs = 12, md = 3, children } = props

	return (
		<Grid item md={md} xs={xs} sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
			<Typography variant="body1" color="#84878B" fontWeight="bold">
				{label}
			</Typography>
			{children}
		</Grid>
	)
}

export const options = [
	'WC riêng',
	'Chỗ để xe',
	'Cửa sổ',
	'An ninh',
	'Wifi',
	'Tự do',
	'Chủ riêng',
	'Máy lạnh',
	'Máy nước nóng',
	'Nhà bếp',
	'Tủ lạnh',
	'Máy giặt',
	'Gác lửng',
	'Giường',
	'Tủ đồ',
	'Tivi',
	'Thú cưng',
]

AddRoom.MultipleSelect = (props: IProps) => {
	const { name, control, label, xs = 12, md = 3, setValue } = props
	// const classes = useStyles();
	const [selected, setSelected] = useState([])
	const isAllSelected = options.length > 0 && selected.length === options.length

	const handleChange = (event: any) => {
		const value = event.target.value
		if (value[value.length - 1] === 'all') {
			setSelected(selected.length === options.length ? [] : (options as []))
			setValue(selected.length === options.length ? [] : (options as []))
			return
		}
		setSelected(value)
	}

	return (
		<Grid item md={md} xs={xs} sx={{ width: '100%' }}>
			<Typography variant="body1" color="#84878B" fontWeight="bold">
				{label}
			</Typography>
			<Controller
				control={control}
				name={name}
				render={({ field }) => (
					<Select
						{...field}
						onChange={(e) => {
							field.onChange(e)
							handleChange(e)
						}}
						defaultValue={[]}
						renderValue={(selected) => selected.join(', ')}
						multiple
						style={{ minWidth: '100%', maxWidth: '100%', background: '#fff', height: '46px' }}
					>
						<MenuItem value="all">
							<ListItemIcon>
								<Checkbox
									checked={isAllSelected}
									indeterminate={selected.length > 0 && selected.length < options.length}
								/>
							</ListItemIcon>
							<ListItemText primary="Chọn tất cả" />
						</MenuItem>
						{options.map((option) => (
							<MenuItem key={option} value={option}>
								<ListItemIcon>
									<Checkbox checked={selected.indexOf(option as never) > -1} />
								</ListItemIcon>
								<ListItemText primary={option} />
							</MenuItem>
						))}
					</Select>
				)}
			/>
		</Grid>
	)
}

export default AddRoom
