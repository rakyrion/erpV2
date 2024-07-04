

export enum EInvoiceType {
	PROGRAM = 'PROGRAM',
	REPORT = 'REPORT'
}


events.subscribe('appStaticConfig', () => {
	appConfig.enumerations.invoiceType = Object.keys(EInvoiceType)
})
