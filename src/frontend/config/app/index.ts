const merge = () => {
	appConfig.frontend = {
		baseUrl: config.get('frontend.baseUrl')
	}
}

events.subscribe('appStaticConfig', merge)

export {}
