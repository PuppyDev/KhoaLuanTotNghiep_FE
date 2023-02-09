import UploadImage from '@/components/common/UploadImage'
import { Box, Button, Typography } from '@mui/material'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import ImageIcon from '@mui/icons-material/Image'
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
					'api-key': 'BPvjWWHEc8t448vSTEgfpovF4fYQ1aC4',
				},
			})
			.then((response) => {
				console.log(response.data)
			})
			.catch((error) => {
				console.error(error)
			})
	})

	return (
		<Box
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				minHeight: '90vh',
				flexDirection: 'column',
			}}
		>
			<Typography variant="h5" fontWeight="bold">
				Thêm Thông Tin
			</Typography>

			<Typography align="center" style={{ color: 'red', fontWeight: 'bold', fontSize: '18px', margin: '20px 0' }}>
				Chúng tôi cần thêm thông tin về CMND/CCCD của bạn để hoàn tất đăng ký. <br /> Vui lòng thêm ảnh vào bên
				dưới
			</Typography>

			<form onSubmit={sendIDProfile}>
				<UploadImage
					addFiles={(file: any) => {
						setValue('front', file)
					}}
					content={
						<div style={{ textAlign: 'center' }}>
							<ImageIcon style={{ fontSize: '46px' }} />
							<br />
							Mặt Trước CMND/CCCD <br />
							Kéo vào đây
						</div>
					}
				/>
				<br />
				<UploadImage
					addFiles={(file: any) => {
						setValue('back', file)
					}}
					content={
						<div style={{ textAlign: 'center' }}>
							<ImageIcon style={{ fontSize: '46px' }} /> <br />
							Mặt Sau CMND/CCCD <br />
							Kéo vào đây
						</div>
					}
				/>
				<div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
					<Button
						style={{
							outline: 'none',
							border: 'none',
							alignItems: 'center',
							margin: '10px auto',
							width: '200px',
							padding: '10px 20px',
						}}
						variant="contained"
					>
						Tiếp Tục
					</Button>
				</div>
			</form>
		</Box>
	)
}

export default UpdateId
