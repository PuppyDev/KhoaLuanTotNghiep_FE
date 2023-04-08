import HeadingTitle from '@/components/common/Heading/HeadingTitle'
import { useTranslation } from 'react-i18next'

import InvoiceContainer from '@/features/Invoice/InvoiceContainer'

const InvoicePage = () => {
	const { t } = useTranslation()

	return (
		<>
			<HeadingTitle>{t('ROOM_RENTED')}</HeadingTitle>
			<InvoiceContainer />
		</>
	)
}

export default InvoicePage
