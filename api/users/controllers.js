let jwt = require('jsonwebtoken')
let helpers = require('../helpers')
const { User } = require('./models')

async function register(req, res) {
	try {
		const { name, email, password } = req.body
		let _user = await User.findOne({
			email
		})
		if (_user) {
			return res.status(409).json({ message: 'user already exist with this email' })
		}

		const user = await User.create({
			name,
			email,
			password: helpers.createSaltedHash(password)
		})

		return res.status(201).json({ user })
	} catch (error) {
		console.log(error)
		return res.status(500).json({ message: 'server error' })
	}
}

async function login(req, res) {
	try {
		let { email, password } = req.body

		let user = await User.findOne({
			email,
			password: helpers.createSaltedHash(password)
		})

		if (!user) {
			return res.status(401).json({
				message: 'authentication failed'
			})
		}

		let token = jwt.sign({ email, hash: helpers.createSaltedHash(password) }, process.env.SECRET_KEY)

		return res.json({ token })
	} catch (error) {
		console.log(error)
		return res.status(500).json({ message: 'server error' })
	}
}

async function getProfile(req, res) {
	try {
		const user = res.locals.user
		user.password = undefined

		return res.json({ user })
	} catch (error) {
		console.log(error)
		return res.status(404).json({ message: 'server error' })
	}
}

module.exports = {
	login,
	register,
	getProfile
}
