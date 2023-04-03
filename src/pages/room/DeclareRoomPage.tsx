import { invoiceApi } from '@/api/invoiceApi'
import { serviceApi } from '@/api/serviceApi'
import RoomItem from '@/components/common/Room/RoomItem'
import {
	StyledButtonService,
	StyledModalForm,
	StyledWrapServices,
} from '@/components/common/Room/styles/RoomItemStyles'
import { IServiceRes } from '@/models/services'
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
			if (idRoom) {
				return serviceApi.getListServiceDemand(idRoom)
			}
			return null
		},
		keepPreviousData: true,
		staleTime: Infinity,
	})

	const { mutate: createInvoiceMutate, isLoading: invoiceLoading } = useMutation({
		mutationKey: ['CreateInvoice'],
		mutationFn: invoiceApi.createInvoice,
		onSuccess: () => {},
		onError: () => {},
	})

	const {
		mutate: updateServiceMutate,
		isLoading,
		isError,
	} = useMutation({
		mutationKey: ['UpdateServiceDemand'],
		mutationFn: serviceApi.updateServiceDemand,
		onSuccess: (data) => {
			console.log('🚀 ~ file: DeclareRoomPage.tsx:48 ~ DeclareRoomPage ~ data:', data)
			// createInvoiceMutate({contractId: "", invoiceInfo: {}})
		},
		onError: (err) => {
			console.log('🚀 ~ file: DeclareRoomPage.tsx:50 ~ DeclareRoomPage ~ err:', err)
		},
	})

	useEffect(() => {
		if (dataServices) setNumberOfService(dataServices?.data)
	}, [dataServices])

	const handleUpdateService = () => {
		if (invoiceLoading || isLoading) return

		if (!idRoom || !dataServices || !dataServices.data) return
		const { electricity_cost, internet_cost, water_cost } = getValues()
		updateServiceMutate({
			roomId: idRoom,
			demandInfo: {
				atMonth: getCurrentDate().month,
				demands: dataServices?.data.map((item) => {
					const isElectric = item.service.name.trim() === 'electricity cost'
					const isInternet = item.service.name.trim() === 'internet cost'
					return {
						serviceId: item._id,
						newIndicator: isElectric ? electricity_cost : 0,
						quality: isElectric ? 0 : isInternet ? internet_cost : water_cost,
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
