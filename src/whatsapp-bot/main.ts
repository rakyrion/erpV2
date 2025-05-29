import { generate } from 'qrcode-terminal'


events.subscribe('diReady', () => {
	const botClient = di.whatsappBot!.client

	botClient.initialize().then(() => {
		console.log('initialized')
	}).catch(e => {
		console.log(e)
	})
	
	botClient.on('ready', () => {
		console.log('bot is ready')
	})

	botClient.on('qr', qr => {
		generate(qr, { small: true })
		console.log('QR RECEIVED', qr)
	})
})

