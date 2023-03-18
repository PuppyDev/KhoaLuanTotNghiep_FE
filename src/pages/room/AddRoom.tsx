import EditorBase from '@/components/common/Input/Editor'
import { typeGender, typeOfRoom } from '@/constants/room'
import { getContract } from '@/utils/contract'
import { getPathNameAfterSlah, randomId } from '@/utils/index'
import ShowNostis from '@/utils/show-noti'
import { decode } from '@/utils/super-function'
import { Box, Checkbox, Grid, ListItemIcon, ListItemText, MenuItem, Select, TextField } from '@mui/material'
import Typography from '@mui/material/Typography/Typography'
import { Editor } from '@tinymce/tinymce-react'
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
}

const AddRoom = () => {
	const {
		handleSubmit,
		control,
		setValue,
		getValues,
		formState: { errors },
	} = useForm<FormValues>({
		defaultValues: {
			totalNbPeople: 1,
			period: 1,
			amentilities: [],
			contract: getContract({}),
		},
		// resolver: yupResolver(schemaFormCreateRoom),
	})
	const [isEdit, setIsEdit] = useState(false)
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

	const onDrop = useCallback((acceptedFiles: any) => {
		setValue('images', acceptedFiles)
		// Do something with the files
	}, [])
	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

	const handelSubmitRoom = (values: any) => {}

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
								md={4}
							/>

							<AddRoom.InputFeild
								label={t('Room.water_money')}
								name="waterPrice"
								control={control}
								error={errors.waterPrice?.message || null}
								md={4}
							/>

							<AddRoom.SelectList
								control={control}
								defaultValue="1"
								name="period"
								label={t('Room.Period')}
								md={4}
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
							defaultValue="1"
							name="nbCurrentPeople"
							label={t('Room.Current_people')}
							md={4}
						>
							{[...Array(10).keys()].map((item) => (
								<MenuItem value={item + 1} key={randomId()}>
									{item + 1}
								</MenuItem>
							))}
						</AddRoom.SelectList>

						<AddRoom.MultipleSelect
							control={control}
							defaultValue="1"
							name="amentilities"
							label={t('Room.Amentilities')}
							md={4}
							setValue={(amentilitieValue: string[]) => {
								setValue('amentilities', amentilitieValue)
							}}
						/>

						{/* Address Street */}
						<AddRoom.SelectList
							control={control}
							defaultValue="Hồ Chí Minh"
							name="cityName"
							label={t('USER.City')}
						>
							<MenuItem value="Hồ Chí Minh">Hồ Chí Minh</MenuItem>
						</AddRoom.SelectList>

						<AddRoom.SelectList
							control={control}
							defaultValue="0"
							name="ditrictName"
							label={t('Room.Distric')}
						>
							{['Tất cả', 'Nam', 'Nữ'].map((item, index) => {
								return (
									<MenuItem value={index} key={randomId()}>
										{item}
									</MenuItem>
								)
							})}
						</AddRoom.SelectList>

						<AddRoom.SelectList control={control} defaultValue="0" name="wardName" label="Phường/ Ấp">
							{['Tất cả', 'Nam', 'Nữ'].map((item, index) => {
								return (
									<MenuItem value={index} key={randomId()}>
										{item}
									</MenuItem>
								)
							})}
						</AddRoom.SelectList>

						<AddRoom.SelectList control={control} defaultValue="0" name="streetName" label="Tên đường">
							{['Tất cả', 'Nam', 'Nữ'].map((item, index) => {
								return (
									<MenuItem value={index} key={randomId()}>
										{item}
									</MenuItem>
								)
							})}
						</AddRoom.SelectList>

						<AddRoom.InputFeild
							label={t('Room.apartment_number')}
							name="addressDetail"
							control={control}
							md={4}
						/>

						{/* Sex  */}
						<AddRoom.SelectList
							control={control}
							defaultValue={typeGender[0].value}
							name="gender"
							label={t('USER.Gender')}
							md={4}
						>
							{typeGender.map((item) => (
								<MenuItem value={item.value} key={randomId()}>
									{item.label}
								</MenuItem>
							))}
						</AddRoom.SelectList>

						{/* Type Of Room   */}
						<AddRoom.SelectList
							control={control}
							defaultValue="ROOM_FOR_RENT"
							name="typeRoom"
							label={t('Room.TypeRoom')}
							md={4}
						>
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
						<button type="submit"> {isEdit ? t('Room.update_room') : t('Room.create_room')}</button>
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
				render={({ field: { onChange, onBlur } }) => (
					<Select
						onChange={onChange}
						onBlur={onBlur}
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
