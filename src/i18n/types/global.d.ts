import { ITranslation } from '../interfaces/translation'

declare global {
	// eslint-disable-next-line no-var
	var translations: Record<string, ITranslation>
}
