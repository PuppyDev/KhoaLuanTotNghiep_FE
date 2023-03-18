import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Box, Checkbox, FormControlLabel, Icon, Slider, Typography } from '@mui/material'
import { pink } from '@mui/material/colors'
import { options } from 'pages/room/AddRoom'
import React, { memo, MouseEventHandler, PropsWithChildren } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { ButtonFilter, FilterItem, ListFilters } from './styles/RoomFilterLocationStyle'

interface IProps {
	onApply: (dataSearchFilter: any) => void
}

const optionTypeRoom = [
	{
		label: 'Phòng cho thuê',
		value: 'Phòng cho thuê',
	},
	{
		label: 'Phòng ở ghép',
		value: 'Phòng ở ghép',
	},
	{
		label: 'Kí túc xá',
		value: 'Kí túc xá',
	},
	{
		label: 'Nhà nguyên căn',
		value: 'Nhà nguyên căn',
	},
	{
		label: 'Căn hộ',
		value: 'Căn hộ',
	},
]

const optionSex = [
	{
		label: 'Nam',
		value: 'Nam',
	},
	{
		label: 'Nữ',
		value: 'Nữ',
	},
]
type FormValues = {
	prices: number[]
	utilities: string[]
	typeRoom: string[]
	gender: string[]
}

const RoomFilterLocation = ({ onApply }: IProps) => {
	const [expanded, setExpanded] = React.useState<string | null>(null)

	const { t } = useTranslation()

	const { handleSubmit, control, setValue, register, getValues } = useForm<FormValues>({
		defaultValues: {
			prices: [0, 9000000],
			utilities: [],
			typeRoom: [],
			gender: [],
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
				{t('Room.Filters')}
			</Typography>

			<ListFilters onSubmit={handleSubmit(filterRoom)}>
				<RoomFilterLocation.FilterItem
					panel="panel1"
					activeTab={expanded}
					label={t('Room.Prices')}
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
					label={t('Room.utilities')}
					onClick={() => handleChange('panel2')}
				>
					{options.map((item) => {
						console.log('🚀 ~ file: RoomFilterLocation.tsx:115 ~ {options.map ~ item:', item)

						return (
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
										{...register('utilities')}
										defaultChecked={
											getValues('utilities').findIndex((itemCheck) => itemCheck === item) !== -1
										}
									/>
								}
								key={Date.now() + Math.random() * 10000}
								label={item}
							/>
						)
					})}
				</RoomFilterLocation.FilterItem>

				<RoomFilterLocation.FilterItem
					panel="panel3"
					activeTab={expanded}
					label={t('Room.TypeRoom')}
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
							{...register('typeRoom')}
						/>
					))}
				</RoomFilterLocation.FilterItem>

				<RoomFilterLocation.FilterItem
					panel="panel4"
					activeTab={expanded}
					label={t('Room.Sex')}
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
							{...register('gender')}
						/>
					))}
				</RoomFilterLocation.FilterItem>
				<ButtonFilter type="submit" onClick={() => onApply(123)}>
					{t('Room.Apply')}
				</ButtonFilter>
			</ListFilters>
		</Box>
	)
}

export default memo(RoomFilterLocation)

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
