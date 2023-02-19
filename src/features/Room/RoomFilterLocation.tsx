import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Box, Checkbox, FormControlLabel, Icon, Slider, Typography } from '@mui/material'
import { pink } from '@mui/material/colors'
import { options } from 'pages/room/AddRoom'
import React, { MouseEventHandler, PropsWithChildren } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { ButtonFilter, FilterItem, ListFilters } from './styles/RoomFilterLocationStyle'

interface IProps {
	onApply: (dataSearchFilter: any) => void
}

const optionTypeRoom = [
	{
		label: 'Phòng cho thuê',
		value: 1,
	},
	{
		label: 'Phòng ở ghép',
		value: 2,
	},
	{
		label: 'Kí túc xá',
		value: 3,
	},
	{
		label: 'Nhà nguyên căn',
		value: 4,
	},
	{
		label: 'Căn hộ',
		value: 5,
	},
]

const optionSex = [
	{
		label: 'Nam',
		value: 1,
	},
	{
		label: 'Nữ',
		value: 0,
	},
]
type FormValues = {
	prices: number[]
}

const RoomFilterLocation = ({ onApply }: IProps) => {
	const [expanded, setExpanded] = React.useState<string | null>(null)

	const { handleSubmit, control, setValue } = useForm<FormValues>({
		defaultValues: {
			prices: [0, 9000000],
		},
	})

	const handleChange = (panel: string) => {
		setExpanded(panel === expanded ? null : panel)
	}

	const filterRoom = (values: any) => {
		console.log('🚀 ~ file: RoomFilterLocation.tsx:60 ~ filterRoom ~ values', values)
	}

	return (
		<Box>
			<Typography style={{ margin: 0, fontSize: '24px', color: '#333333', fontWeight: 'bold', padding: '32px' }}>
				Bộ Lọc
			</Typography>

			<ListFilters onSubmit={handleSubmit(filterRoom)}>
				<RoomFilterLocation.FilterItem
					panel="panel1"
					activeTab={expanded}
					label="Giá"
					onClick={() => handleChange('panel1')}
				>
					<Controller
						control={control}
						name="prices"
						render={({ field }) => (
							<Slider
								// @ts-ignore
								onChange={(_, values) => setValue('prices', values)}
								min={0}
								step={10000}
								max={9000000}
								valueLabelFormat={(number) => number.toLocaleString()}
								defaultValue={field.value}
								disableSwap
								valueLabelDisplay="on"
							/>
						)}
					/>
				</RoomFilterLocation.FilterItem>

				<RoomFilterLocation.FilterItem
					panel="panel2"
					activeTab={expanded}
					label="Tiện ích"
					onClick={() => handleChange('panel2')}
				>
					{options.map((item) => (
						<FormControlLabel
							style={{ width: '100%', paddingLeft: '20px' }}
							control={
								<Checkbox
									sx={{
										color: pink[300],
										'&.Mui-checked': {
											color: pink[600],
										},
									}}
									value={item}
								/>
							}
							key={Date.now() + Math.random() * 10000}
							label={item}
						/>
					))}
				</RoomFilterLocation.FilterItem>

				<RoomFilterLocation.FilterItem
					panel="panel3"
					activeTab={expanded}
					label="Loại phòng"
					onClick={() => handleChange('panel3')}
				>
					{optionTypeRoom.map((item) => (
						<FormControlLabel
							style={{ width: '100%', paddingLeft: '20px' }}
							control={
								<Checkbox
									sx={{
										color: pink[300],
										'&.Mui-checked': {
											color: pink[600],
										},
									}}
									value={item.value}
								/>
							}
							key={Date.now() + Math.random() * 10000}
							label={item.label}
						/>
					))}
				</RoomFilterLocation.FilterItem>

				<RoomFilterLocation.FilterItem
					panel="panel4"
					activeTab={expanded}
					label="Giới tính"
					onClick={() => handleChange('panel4')}
				>
					{optionSex.map((item) => (
						<FormControlLabel
							style={{ width: '100%', paddingLeft: '20px' }}
							control={
								<Checkbox
									sx={{
										color: pink[300],
										'&.Mui-checked': {
											color: pink[600],
										},
									}}
									value={item.value}
								/>
							}
							key={Date.now() + Math.random() * 10000}
							label={item.label}
						/>
					))}
				</RoomFilterLocation.FilterItem>
				<ButtonFilter type="submit" onClick={() => onApply(123)}>
					Áp dụng
				</ButtonFilter>
			</ListFilters>
		</Box>
	)
}

export default RoomFilterLocation

interface IPropLocation extends PropsWithChildren {
	onClick: MouseEventHandler
	activeTab: string | null
	label: string
	panel: string
}
RoomFilterLocation.FilterItem = (props: IPropLocation) => {
	const { onClick, activeTab, label, children, panel } = props

	return (
		<FilterItem>
			<Box className="cc_title_item" onClick={onClick}>
				{label}
				<Icon className={`cc_icon ${activeTab === panel && 'active'}`}>
					<ExpandMoreIcon />
				</Icon>
			</Box>
			{activeTab === panel && <div style={{ padding: '16px 32px', transition: 'height 0.5s' }}>{children}</div>}
		</FilterItem>
	)
}
