import { UserRepository } from '../repositories/user'

const diMerge = () => {
	di.user = {
		repos: {
			user: new UserRepository()
		}
	}
}

events.subscribe('diSetup', diMerge)
