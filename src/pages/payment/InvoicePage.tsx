import HeadingTitle from '@/components/common/Heading/HeadingTitle'
import { useTranslation } from 'react-i18next'

import InvoiceContainer from '@/features/Invoice/InvoiceContainer'
import SEO from '@/components/seo'

const InvoicePage = () => {
	const { t } = useTranslation()

	return (
		<>
			<SEO title="Bughoue 🤡 - Your invoices" />

			<HeadingTitle>{t('ROOM_RENTED')}</HeadingTitle>
			<InvoiceContainer />
		</>
	)
}

export default InvoicePage
