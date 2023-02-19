import * as yup from 'yup'

export const schemaFormCreateRoom = yup
	.object({
		roomTitle: yup.string().required('Vui lòng nhập tên phòng '),
		roomArea: yup.number().min(1).max(500).required('Vui lòng nhập vào diện tích phòng'),
		roomPrice: yup.number().min(10000).max(1000000000).required('Vui lòng nhập vào số tiền trọ / tháng'),
		roomDeposits: yup.number().lessThan(yup.ref('roomPrice')).required('Vui lòng nhập vào tiền đặt cọc'),
		roomElectric: yup.number().required('Vui lòng nhập vào tiền điện / tháng hoặc /kw'),
		amountPeople: yup
			.number()
			.min(1)
			.max(24, 'Vui lòng nhập lại số lượng người < 24')
			.required('Vui lòng nhập vào số người 1 phòng'),
		leaseTerm: yup.number().required('Vui lòng chọn kì hạn'),
		// address: yup.string().required('Vui lòng nhập địa chỉ'),
	})
	.required()
