import { ICandidate } from '../interfaces/candidate'
import { faker } from '@faker-js/faker'


export const loadCandidatesService = async (quantity: number) => {
	const candidateRepo = di.candidate!.repos.candidate

	const technologies = [ 'TypeScript', 'JavaScript', 'Python', 'Express', 'Mongo', 'SQL', 'PHP', 'Amazon Web Services', 'Scikit-learn', 'XGBoost', 'PyTorch', 'TensorFlow', 'Keras', 'Apache', 'Redis', 'Azure', 'Microsoft Azure', 'AWS Lambda', 'AWS DynamoDB', 'IBM Cloud', 'Oracle', 'Terraform', 'Google cloud', 'Docker', 'Kubernetes', 'Ruby', 'Go', 'Jenkins', 'HTML', 'CSS', 'React', 'Angular', 'Vue', 'SASS', 'Bootstrap', 'Tailwind', 'Webpack', 'Git', 'Jest', 'Mocha', 'C#','PHP', 'Node', 'Express', 'Django', 'Flask', 'Laravel', 'Matplotlib' ]
	const softSkills = [ 'Communication', 'Leadership', 'Teamwork', 'Team-building'  ]
	const skills = [ 'Data analisys', 'Graphic design', 'Cybersecurity', 'Technical writing', 'Machine learning', 'SEO', 'Server management', 'Responsive design', 'POO', 'Set up network', '' ]

	const gender = [ 'Male', 'Female' ]
	const candidates: ICandidate[] = []
	for (let i = 0; i < quantity; i++) {
		const randomName = faker.name.fullName()
		const randomSkills = faker.helpers.arrayElements(skills, faker.datatype.number({ min: 4, max: 8 }))
		const randomSoftSkills = faker.helpers.arrayElements(softSkills, faker.datatype.number({ min: 4, max: 8 }))
		const randomTechnologies = faker.helpers.arrayElements(technologies, faker.datatype.number({ min: 5, max: 10 }))
		const randomGender = faker.helpers.arrayElement(gender)
	
		const candidate: ICandidate = {
			fullname: randomName,
			skills: randomSkills,
			softSkills: randomSoftSkills,
			technologies: randomTechnologies,
			gender: randomGender
		}
		candidates.push(candidate)
	}

	for (const candidate of candidates) {
		await candidateRepo.create(candidate)
	}
}
