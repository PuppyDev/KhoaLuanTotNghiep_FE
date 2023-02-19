import React from 'react'
import Lottie from 'react-lottie-player'
import loadingJson from '@/common/Json/36395-lonely-404.json'

const PageNotFound = () => {
	return (
		<div
			style={{
				width: '100%',
				height: '80vh',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				flexDirection: 'column',
				textAlign: 'center',
				fontSize: '18px',
				fontWeight: '500',
				fontFamily: 'Nunito',
			}}
		>
			<Lottie loop animationData={loadingJson} play style={{ width: '30vw' }} />
			<p>
				Có vẻ như trang bạn đang tìm kiếm đã được thay thế <br />
				hoặc ở đâu đó chúng tôi không thể tìm thấy.
			</p>
		</div>
	)
}

export default PageNotFound
