import Stripe from 'stripe'
import { BaseDtoMapper } from '../../../core/mappers/dto/base'
import { InvoiceDTO } from '../../interfaces/dto/res/invoice'

class InvoiceDtoMapper extends BaseDtoMapper<Stripe.Invoice, InvoiceDTO> {
	protected _toDTO(entity: Stripe.Invoice): InvoiceDTO {
		return {
			company: entity.customer_name || '',
			userId: entity.metadata?.userId,
			number: entity.number!,
			date: new Date(entity.created * 1000),
			concept: entity.description || '',
			price: {
				unit: entity.currency,
				amount: entity.amount_due
			},
			users: entity.lines.data.reduce((total, lineItem) => total + (lineItem.quantity || 1), 0),
			pdf_url: entity.invoice_pdf !== null ? entity.invoice_pdf : undefined,
			invoice_url: entity.hosted_invoice_url !== null ? entity.hosted_invoice_url : undefined,
			invoiceType: entity.metadata?.invoiceType || '',
			partnerCommission: Number(entity.metadata?.partnerCommission) || 0
		}
	}
}

export const InvoiceDtoMap = new InvoiceDtoMapper()
