
export interface InvoiceDTO {
	company: string,
	userId?: string,
	number: string,
	date: Date,
	concept: string,
	price: {
		unit: string,
		amount: number
	},
	users: number,
	pdf_url?: string,
	invoice_url?: string,
	invoiceType: string,
	partnerCommission: number
}
