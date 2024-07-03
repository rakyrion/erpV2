import { Application } from 'express'

const run = (app: Application) => {
	const env = config.get('core.env')
	const port = config.get('app.port') || 3000

	const server = app.listen(port, () => {
		log.http(`App running in ${env} mode on :${port}...`, 'app')
	})

	void events.publish('serverReady', server)
}

events.subscribe('expressReady', app => run(app as Application))
