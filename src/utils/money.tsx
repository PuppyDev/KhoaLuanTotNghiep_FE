export function formatVietNamDong(amount: number): string {
	if (amount >= 1000000) {
		const amountInTrillion: number = Math.floor(amount / 1000000)
		const amountInBillion: number = Math.floor((amount % 1000000) / 1000)
		const formattedAmount: string = `${amountInTrillion}tr${amountInBillion !== 0 ? `${amountInBillion}` : ''} vnđ`
		return formattedAmount
	} else {
		const formattedAmount: string = `${amount.toLocaleString()} vnđ`
		return formattedAmount
	}
}

export function convertToDoLa(amountInUSD: number) {
	const exchangeRate = 23577
	const amountInVND = amountInUSD * exchangeRate
	const formattedAmount = `${amountInVND.toFixed(0)} vnđ`
	return formattedAmount
}
