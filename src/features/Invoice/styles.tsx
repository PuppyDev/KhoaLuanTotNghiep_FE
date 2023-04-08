import styled from '@emotion/styled'

export const StytledWrapContent = styled.div`
	margin: 0 auto;
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 20px;
`

export const StyledInvoiceItem = styled.div`
	border: 1px solid #ccc;
	padding: 20px;
	border-radius: 4px;
	cursor: pointer;
	transition: all 0.4s;

	&.active {
		&:hover {
			background: #f6f5f5;
		}
	}
`

export const StyledWrapTop = styled.div`
	display: flex;
	align-items: center;
	gap: 20px;

	& .invoice-content {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	& .invoice-icon {
		padding: 0 20px;

		svg {
			font-size: 50px;
			color: rgb(247, 52, 134);
		}
	}

	& .invoice-content {
		&__heading {
			font-size: 18px;
			font-weight: bold;
		}

		&__sub {
		}
	}

	& .invoice-estimate {
	}
`

export const StyledWrapBottom = styled.div`
	display: flex;
	justify-content: flex-end;
	gap: 10px;

	button {
		text-transform: unset;
	}
`

export const StyledNothing = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`
