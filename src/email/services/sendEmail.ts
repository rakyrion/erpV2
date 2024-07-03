import { createTransport, SendMailOptions, Transporter } from 'nodemailer'
import { Options, SentMessageInfo } from 'nodemailer/lib/smtp-transport'
import { convert } from 'html-to-text'
import isEmail from 'validator/lib/isEmail'
import { templateToHTML } from '../utils/templateToHTML'
import { EmailError } from '../errors/email'

let transport: Transporter<SentMessageInfo>
let sender: string

const getTransport = (): Transporter<SentMessageInfo> => {
	if (!transport) {
		const transportOptions: Options = config.get('email.smtp')
		if (!transportOptions.auth?.user) transportOptions.auth = undefined
		transport = createTransport(transportOptions)
	}

	return transport
}

const getSender = (): string => {
	if (!sender) {
		const { name, email } = config.get('email.sender')
		sender = name ? `${name} <${email}>` : email
	}

	return sender
}

export const sendEmailService = async (
	options: SendMailOptions,
	templates: string | string[],
	locals: object = {}
): Promise<void> => {
	if (options.from) {
		const emailAddress = typeof options.from === 'string' ? options.from : options.from.address
		if (!isEmail(emailAddress, { allow_display_name: true })) {
			throw new EmailError(`'${emailAddress}' is not a valid email address.`)
		}
	} else {
		options.from = getSender()
	}
	options.html = await templateToHTML(templates, locals)
	options.text = convert(options.html)
	await getTransport().sendMail(options)
}
