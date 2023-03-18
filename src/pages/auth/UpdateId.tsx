import UploadImage from '@/components/common/UploadImage'
import { Box, Button, Typography } from '@mui/material'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import ImageIcon from '@mui/icons-material/Image'
import { StyledButtonUpdateId, StyledMiddle, StyledWrapUpdateID } from './styles'
import { useTranslation } from 'react-i18next'
type FormValues = {
	front: any
	back: any
}

const UpdateId = () => {
	const { control, handleSubmit, setValue, register } = useForm<FormValues>({
		defaultValues: {
			front: '',
			back: '',
		},
	})

	const sendIDProfile = handleSubmit(async (values) => {
		const formData = new FormData()
		const file = values.front[0]
		formData.append('image', file)

		axios
			.post('https://api.fpt.ai/vision/idr/vnm', formData, {
				headers: {
					'api-key': import.meta.env.VITE_API_FPTAI_ID,
				},
			})
			.then((response) => {
				console.log(response.data)
			})
			.catch((error) => {
				console.error(error)
			})
	})

	const { t } = useTranslation()

	return (
		<StyledWrapUpdateID>
			<p className="heading">{t('Update_id.More_info')}</p>

			<p className="description_updateId">
				{t('Update_id.Description_info')} <br /> {t('Update_id.Description_info2')}
			</p>

			<form onSubmit={sendIDProfile}>
				<div style={{ display: 'flex', gap: '20px' }}>
					<UploadImage
						addFiles={(file: any) => setValue('front', file)}
						content={
							<div style={{ textAlign: 'center' }}>
								<ImageIcon style={{ fontSize: '46px' }} />
								<br />
								{t('Update_id.Front_of_ID')}
								<br />
								{t('Update_id.Drag_here')}
							</div>
						}
					/>
					<br />
					<UploadImage
						addFiles={(file: any) => setValue('back', file)}
						content={
							<div style={{ textAlign: 'center' }}>
								<ImageIcon style={{ fontSize: '46px' }} /> <br />
								{t('Update_id.Back_of_ID')} <br />
								{t('Update_id.Drag_here')}
							</div>
						}
					/>
				</div>

				<StyledMiddle>
					<StyledButtonUpdateId variant="contained" type="submit">
						{t('Continue')}
					</StyledButtonUpdateId>
				</StyledMiddle>
			</form>
		</StyledWrapUpdateID>
	)
}

export default UpdateId
