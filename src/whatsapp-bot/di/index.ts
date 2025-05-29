import { Client, LocalAuth } from 'whatsapp-web.js'

const diMerge = () => {
	di.whatsappBot = {
		client: new Client({
			authStrategy: new LocalAuth()
		})
	}
}

events.subscribe('diSetup', diMerge)
