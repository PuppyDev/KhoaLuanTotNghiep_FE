import { Grid, Box, Select, MenuItem, TextField, ListItemIcon, Checkbox, ListItemText } from '@mui/material'
import Typography from '@mui/material/Typography/Typography'
import { HomePageContent, WrapperBackground } from 'pages/Home/HomeStyles'
import { PropsWithChildren, useCallback, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useDropzone } from 'react-dropzone'
import { DisplayResultImages, FileManager, GroupButton } from './styles/AddRoomStyle'
import { yupResolver } from '@hookform/resolvers/yup'
import { schemaFormCreateRoom } from '@/schemas/form'
import EditorBase from '@/components/common/Input/Editor'
import { getContract } from '@/utils/contract'
import { typeGender, typeOfRoom } from '@/constants/room'
import { randomId } from '@/utils/index'

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

	const onDrop = useCallback((acceptedFiles: any) => {
		console.log('🚀 ~ file: AddRoom.tsx:27 ~ onDrop ~ acceptedFiles', acceptedFiles)
		setValue('images', acceptedFiles)
		// Do something with the files
	}, [])
	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

	const handleAddNewRoom = (values: any) => {
		console.log('🚀 ~ file: AddRoom.tsx:14 ~ handleAddNewRoom ~ values', values)
	}

	return (
		<WrapperBackground style={{ minHeight: '92vh' }}>
			<HomePageContent>
				<Typography
					style={{
						textAlign: 'center',
						fontSize: '40px',
						fontWeight: 'bold',
						padding: '40px 0',
					}}
				>
					Tạo phòng cho căn hộ
				</Typography>

				<form onSubmit={handleSubmit(handleAddNewRoom)}>
					<Grid container spacing={2}>
						<Grid item xs={12} container spacing={2}>
							<AddRoom.InputFeild
								label="Tiêu đề phòng"
								name="name"
								control={control}
								error={errors.name?.message || null}
							/>
							<AddRoom.InputFeild
								label="Diện tích phòng"
								name="acreage"
								control={control}
								error={errors.acreage?.message || null}
							/>
							<AddRoom.InputFeild
								label="Giá phòng"
								name="basePrice"
								control={control}
								error={errors.basePrice?.message || null}
							/>
							<AddRoom.InputFeild
								label="Tiền đặt cọc (VND)"
								name="deposit"
								control={control}
								error={errors.deposit?.message || null}
							/>
						</Grid>

						<Grid item xs={12} container spacing={2}>
							<AddRoom.InputFeild
								label="Tiền Điện"
								name="roomElectric"
								control={control}
								error={errors.roomElectric?.message || null}
								md={4}
							/>

							<AddRoom.InputFeild
								label="Tiền nước"
								name="waterPrice"
								control={control}
								// error={errors.address?.message || null}
								md={4}
							/>

							<AddRoom.SelectList
								control={control}
								defaultValue="1"
								name="period"
								label="Kì hạn thuê (Tháng)"
								md={4}
							>
								{[...Array(24).keys()].map((item, index) => {
									return (
										<MenuItem value={item + 1} key={randomId()}>
											{item + 1}
										</MenuItem>
									)
								})}
							</AddRoom.SelectList>
						</Grid>

						<AddRoom.SelectList
							control={control}
							defaultValue="1"
							name="totalNbPeople"
							label="Số người/Phòng"
							md={4}
						>
							{[...Array(10).keys()].map((item, index) => {
								return (
									<MenuItem value={item + 1} key={randomId()}>
										{item + 1}
									</MenuItem>
								)
							})}
						</AddRoom.SelectList>

						<AddRoom.SelectList
							control={control}
							defaultValue="1"
							name="nbCurrentPeople"
							label="Số người hiện đang ở trong phòng"
							md={4}
						>
							{[...Array(10).keys()].map((item, index) => {
								return (
									<MenuItem value={item + 1} key={randomId()}>
										{item + 1}
									</MenuItem>
								)
							})}
						</AddRoom.SelectList>

						<AddRoom.MultipleSelect
							control={control}
							defaultValue="1"
							name="amentilities"
							label="Tiện ích"
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
							label="Thành phố"
						>
							<MenuItem value="Hồ Chí Minh">Hồ Chí Minh</MenuItem>
						</AddRoom.SelectList>

						<AddRoom.SelectList control={control} defaultValue="0" name="ditrictName" label="Quận">
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

						<AddRoom.InputFeild label="Số nhà" name="addressDetail" control={control} md={4} />

						{/* Sex  */}
						<AddRoom.SelectList
							control={control}
							defaultValue={typeGender[0].value}
							name="gender"
							label="Giới tính"
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
							label="Kiểu phòng"
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
							<AddRoom.FilesMange label="Thêm Ảnh" name="images" md={6} xs={12} control={control}>
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
										<p>Thả hình ngay đây ...</p>
									) : (
										<>
											<p>Kéo hình vô đây hoặc click vào để chọn nhiều hình</p>
											{getValues('images')?.length > 0 && (
												<p> Đã chọn {getValues('images')?.length} tấm hình </p>
											)}
										</>
									)}
								</FileManager>
							</AddRoom.FilesMange>

							<AddRoom.TextArea
								label="Mô tả chi tiết"
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

					<EditorBase control={control} name="contract" />

					<GroupButton>
						<button type="submit">Tạo phòng</button>
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
