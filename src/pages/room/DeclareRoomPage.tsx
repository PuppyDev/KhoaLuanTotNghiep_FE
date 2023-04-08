import { invoiceApi } from '@/api/invoiceApi'
import { serviceApi } from '@/api/serviceApi'
import RoomItem from '@/components/common/Room/RoomItem'
import {
	StyledButtonService,
	StyledModalForm,
	StyledWrapServices,
} from '@/components/common/Room/styles/RoomItemStyles'
import { IServiceRes } from '@/models/services'
import ShowNostis from '@/utils/show-noti'
import { getCurrentDate } from '@/utils/time'
import { CircularProgress } from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

const DeclareRoomPage = () => {
	const { t } = useTranslation()
	const { idRoom } = useParams()
	const [numberOfService, setNumberOfService] = useState<IServiceRes[]>([])

	const { register, getValues } = useForm()

	const { data: dataServices, isLoading: loadingServices } = useQuery({
		queryKey: ['getServiceRemand', idRoom],
		queryFn: () => {
			if (idRoom) return serviceApi.getListServiceDemand(idRoom)

			return null
		},
		keepPreviousData: true,
		staleTime: Infinity,
	})

	const { mutate: createInvoiceMutate, isLoading: invoiceLoading } = useMutation({
		mutationKey: ['CreateInvoice'],
		mutationFn: invoiceApi.createInvoice,
		onSuccess: (data) => {
			console.log('🚀 ~ file: DeclareRoomPage.tsx:42 ~ DeclareRoomPage ~ data:', data)
			ShowNostis.success('success')
		},
		onError: (err) => {
			ShowNostis.error('Something went wrong')
			console.log('🚀 ~ file: DeclareRoomPage.tsx:49 ~ DeclareRoomPage ~ err:', err)
		},
	})

	const {
		mutate: updateServiceMutate,
		isLoading,
		isError,
	} = useMutation({
		mutationKey: ['UpdateServiceDemand'],
		mutationFn: serviceApi.updateServiceDemand,
		onSuccess: (data) => {
			createInvoiceMutate({
				contractId: idRoom || '',
				invoiceInfo: {
					listServiceDemands: data.data.listDemand,
				},
			})
		},
		onError: (err) => {
			console.log('🚀 ~ file: DeclareRoomPage.tsx:50 ~ DeclareRoomPage ~ err:', err)
		},
	})

	useEffect(() => {
		if (dataServices) setNumberOfService(dataServices?.data)
	}, [dataServices])

	const handleUpdateService = () => {
		if (invoiceLoading || isLoading || !idRoom || !dataServices || !dataServices.data) return

		updateServiceMutate({
			roomId: idRoom,
			demandInfo: {
				atMonth: getCurrentDate().month,
				demands: dataServices?.data.map((item) => {
					const isQuality = item.type === 0
					const data = getValues(item.service.name.split(' ').join('_'))
					return {
						serviceId: item._id,
						newIndicator: !isQuality ? data : 0,
						quality: !isQuality ? 0 : data,
					}
				}),
			},
		})
	}

	return (
		<StyledModalForm>
			<p className="headerForm">
				{t('Room.service_declaration')} <br />
			</p>
			<p className="descriptionForm">{t('Room.Notice')}</p>

			{numberOfService &&
				numberOfService.map((item) => (
					<RoomItem.Service key={item._id} register={register} serviceData={item} loading={loadingServices} />
				))}

			<StyledWrapServices>
				<StyledButtonService onClick={handleUpdateService}>
					{isLoading || invoiceLoading ? <CircularProgress size={14} /> : t('Room.confirm_service')}
				</StyledButtonService>
			</StyledWrapServices>
		</StyledModalForm>
	)
}

DeclareRoomPage.Service = () => {}

export default DeclareRoomPage
