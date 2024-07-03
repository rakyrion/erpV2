export const frontendConfigSchema = {
	baseUrl: {
		doc: 'The frontend base URL to be used in order to generate URLs.',
		format: String,
		default: '',
		env: 'FRONT_BASEURL',
		arg: 'frontBaseUrl'
	}
}
